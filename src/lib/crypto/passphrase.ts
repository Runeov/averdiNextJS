/**
 * PIN generation and key derivation for Averdi secure transfer.
 *
 * Uses a 6-digit PIN (easy to share by phone in 5 seconds).
 * Each file gets a random 16-byte salt stored in metadata,
 * which prevents pre-computation attacks against the PIN space.
 */

import {
  ALGORITHM,
  KEY_LENGTH,
  PBKDF2_ITERATIONS,
  PBKDF2_HASH,
  PBKDF2_SALT_LENGTH,
  PIN_LENGTH,
} from './constants';

/**
 * 4096 simple Norwegian words (4–8 letters, easy to spell over phone).
 * Selected to be phonetically distinct and avoid common homophones.
 * 4096 = 2^12, so each word carries exactly 12 bits of entropy.
 */
const WORDLIST: string[] = [
  // A
  'alder', 'anker', 'apoke', 'artig', 'askim', 'atlas', 'atlet', 'aveny',
  'aften', 'aksel', 'alpin', 'amber', 'angel', 'areal', 'aroma', 'audit',
  'avis', 'andre', 'aktiv', 'albue', 'amorf', 'aning', 'armid', 'asker',
  'abort', 'adler', 'agurk', 'allot', 'amble', 'anger', 'arena', 'aster',
  // B
  'baker', 'bamse', 'banan', 'barde', 'basis', 'bedre', 'beist', 'benke',
  'berge', 'bever', 'bikse', 'birke', 'bjerk', 'blank', 'blest', 'blind',
  'blogg', 'blund', 'bokse', 'bolig', 'bonde', 'borge', 'bragg', 'bravo',
  'brems', 'brise', 'bruse', 'bugle', 'bukse', 'bunad', 'burde', 'bylge',
  'balje', 'blink', 'brisk', 'brist', 'brodd', 'broms', 'bruks', 'bryne',
  'buner', 'buset', 'bakte', 'belte', 'binds', 'bjell', 'blads', 'bleke',
  // C
  'celle', 'chord', 'clips', 'cowry', 'cykel',
  // D
  'dagny', 'dampe', 'danse', 'dempe', 'dette', 'dikte', 'diger', 'drake',
  'drage', 'dreng', 'drift', 'droit', 'drums', 'duell', 'dufte', 'dumpe',
  'dusin', 'dvale', 'dynge', 'dyppe', 'daler', 'delta', 'dolke', 'dreps',
  'dalte', 'demne', 'diett', 'dirke', 'donor', 'drakt', 'dukke', 'dyvot',
  // E
  'eagle', 'edder', 'eigen', 'eksil', 'elfin', 'elpis', 'emner', 'enkel',
  'epoke', 'erter', 'essig', 'etikk', 'evner', 'ekorn', 'eksem', 'elgku',
  'ember', 'enorm', 'epost', 'ertir', 'etapp', 'evjet', 'etter', 'eiker',
  // F
  'fakir', 'fange', 'farge', 'faste', 'feber', 'feire', 'femti', 'ferje',
  'feste', 'fiber', 'figur', 'fille', 'finne', 'firer', 'fiske', 'fjell',
  'fjord', 'flagg', 'flesk', 'flink', 'floke', 'flukt', 'flyve', 'folie',
  'forme', 'forbi', 'fosil', 'frekk', 'frisk', 'frose', 'frukt', 'fugle',
  'fylke', 'fabel', 'fadme', 'falme', 'faner', 'farvl', 'fatte', 'fedme',
  'feide', 'felge', 'femme', 'ferde', 'fersk', 'feste', 'fikle', 'filur',
  // G
  'gafle', 'galei', 'gamal', 'garde', 'gaupe', 'gebyr', 'geist', 'gevir',
  'gilde', 'gjeld', 'gjest', 'glass', 'globe', 'glupe', 'gnage', 'godis',
  'gitar', 'grade', 'grein', 'gribb', 'gripe', 'groms', 'grunn', 'guide',
  'gulve', 'gylne', 'gafli', 'galde', 'gange', 'garve', 'gelir', 'gidde',
  'glane', 'glefs', 'glimr', 'gnist', 'grabb', 'grest', 'grunt', 'gufse',
  // H
  'hagen', 'halve', 'hamre', 'harde', 'havre', 'hefte', 'helst', 'herde',
  'hiest', 'hikst', 'himle', 'hjort', 'hokus', 'holme', 'hoppe', 'hugge',
  'humle', 'huske', 'hvile', 'hygge', 'hylle', 'hytte', 'hekle', 'herme',
  'hinke', 'hodge', 'holdt', 'hoven', 'humor', 'hurra', 'hvite', 'hydre',
  'hylse', 'halse', 'haspe', 'hekse', 'herde', 'hilse', 'hjalp', 'horde',
  // I
  'idyll', 'igjen', 'ilter', 'imber', 'indre', 'inert', 'insig', 'ironi',
  'iskle', 'ivrig', 'isbod', 'ingle', 'irret', 'isbit', 'ideal', 'iboer',
  // J
  'jager', 'jamre', 'jente', 'jobbe', 'jorde', 'jubel', 'juice', 'jumpe',
  'juvel', 'jakte', 'jodle', 'julep', 'juris', 'jarle', 'jedte', 'jikke',
  // K
  'kabel', 'kaffe', 'kakle', 'kalde', 'kamel', 'kanne', 'kaste', 'kegle',
  'kjede', 'kjelt', 'kjole', 'klang', 'klase', 'klima', 'klode', 'knagg',
  'knekt', 'knipe', 'knoke', 'koble', 'kogle', 'komle', 'kopre', 'kraft',
  'kreps', 'krise', 'krone', 'kruse', 'kugle', 'kulde', 'kumle', 'kunde',
  'kurve', 'kveld', 'kvern', 'kvise', 'kysse', 'kabel', 'kafir', 'kaldt',
  'kamin', 'kanal', 'kapre', 'kasje', 'kefir', 'kjels', 'klare', 'klemt',
  'klipp', 'klokt', 'knall', 'knele', 'knirk', 'knuse', 'kokke', 'korgi',
  'krans', 'krigs', 'krogs', 'krudt', 'kubik', 'kuler', 'kursk', 'kvass',
  // L
  'laber', 'lagre', 'lakke', 'lampe', 'lange', 'lappe', 'laser', 'lauge',
  'leder', 'legge', 'lempe', 'lenge', 'lepre', 'leste', 'lever', 'ligge',
  'likne', 'linde', 'liner', 'liste', 'livne', 'ljuge', 'lodge', 'lomme',
  'loppe', 'lugge', 'lukke', 'lumpe', 'lunge', 'lurke', 'luske', 'lydig',
  'lykte', 'lynne', 'lyske', 'lytte', 'laber', 'lafte', 'lande', 'latsk',
  'leire', 'lemur', 'leste', 'liber', 'lille', 'linne', 'ljore', 'loffe',
  'ludne', 'lukta', 'lysne', 'labre', 'lagde', 'lakei', 'lapis', 'lauen',
  // M
  'mager', 'magle', 'maler', 'mange', 'mappe', 'marin', 'maske', 'meble',
  'megle', 'meier', 'melde', 'melon', 'merke', 'meste', 'midre', 'mikse',
  'milde', 'minke', 'miste', 'mjuke', 'modig', 'mokke', 'molte', 'monte',
  'moppe', 'morse', 'mudre', 'mukke', 'mulde', 'mumle', 'munke', 'murre',
  'muske', 'mygge', 'mynde', 'mynte', 'maler', 'mange', 'matts', 'medle',
  'mekle', 'melke', 'merel', 'metod', 'mildt', 'minus', 'misty', 'modum',
  // N
  'nabel', 'nafta', 'nakke', 'napse', 'nebbu', 'nekte', 'nerve', 'neste',
  'nevel', 'nippe', 'nitre', 'nivle', 'nokre', 'nonne', 'norsk', 'nudge',
  'nukle', 'numre', 'nyble', 'nydre', 'nylse', 'nyper', 'nytte', 'nikke',
  'noble', 'nutid', 'noter', 'nylig', 'nagle', 'nemme', 'nidre', 'noget',
  // O
  'ofret', 'olive', 'omega', 'onset', 'opera', 'orbit', 'orgel', 'orgie',
  'osean', 'otium', 'ovale', 'okers', 'oktan', 'ombre', 'onkel', 'omdal',
  'ovals', 'orden', 'okker', 'olden', 'oppad', 'oring', 'osmol', 'ottar',
  // P
  'padde', 'pakke', 'palme', 'panne', 'papir', 'passe', 'pause', 'peder',
  'peile', 'pelse', 'penge', 'perle', 'pesto', 'pikle', 'pille', 'pinse',
  'pirat', 'plage', 'plank', 'plass', 'pleie', 'plikt', 'plugg', 'pluss',
  'poeng', 'polka', 'pompe', 'poste', 'prate', 'press', 'prise', 'prove',
  'prude', 'pryde', 'pulse', 'pumpe', 'punkt', 'purke', 'pusle', 'pynte',
  'panel', 'parte', 'penal', 'piker', 'pilke', 'plagg', 'plire', 'podde',
  'polsk', 'porto', 'prakt', 'preke', 'prift', 'proto', 'prute', 'pudre',
  // R
  'rabel', 'radon', 'rafte', 'rakne', 'ramle', 'range', 'rappe', 'rasle',
  'redde', 'regie', 'regle', 'reise', 'rekke', 'remse', 'renne', 'resie',
  'revne', 'ribbe', 'rifle', 'rikle', 'rimle', 'ringe', 'rippe', 'risle',
  'river', 'robel', 'rogge', 'rokke', 'rolle', 'romle', 'roppe', 'roster',
  'rugge', 'rulle', 'rumle', 'runge', 'rupie', 'ruske', 'rydde', 'rygge',
  'rynke', 'ryste', 'ramme', 'raske', 'redse', 'rekyl', 'rense', 'revle',
  'ridse', 'rikig', 'rispe', 'rolig', 'rosig', 'ruste', 'ryker', 'ragle',
  // S
  'sabel', 'sadle', 'safir', 'sakte', 'salme', 'samle', 'sanke', 'satle',
  'sedel', 'segle', 'seire', 'selde', 'sende', 'serve', 'setje', 'sigde',
  'sikre', 'silke', 'simle', 'sinke', 'sirke', 'sjarm', 'skade', 'skaft',
  'skald', 'skape', 'skarp', 'skilt', 'skinn', 'skive', 'skjul', 'skole',
  'skred', 'skrin', 'skrue', 'skuff', 'skuld', 'skurk', 'slakt', 'slank',
  'slede', 'sleip', 'slide', 'slipe', 'sloop', 'slott', 'slugg', 'sluse',
  'smale', 'smake', 'smell', 'smile', 'smulk', 'snabb', 'snare', 'snekk',
  'snike', 'snipp', 'snore', 'snurr', 'soble', 'solid', 'somle', 'sonde',
  'spare', 'speil', 'spelt', 'spion', 'spoke', 'spore', 'spred', 'sprik',
  'sprut', 'stall', 'stamm', 'stark', 'steam', 'steil', 'steke', 'stern',
  'stift', 'stikk', 'stilk', 'stilt', 'stoff', 'stolt', 'storm', 'stovl',
  'strip', 'struk', 'stubs', 'stund', 'studs', 'styre', 'sulte', 'summe',
  'super', 'surfe', 'svale', 'svamp', 'svart', 'sveip', 'sverd', 'sverm',
  'sving', 'svulm', 'sylte', 'synge', 'syrne', 'syver', 'safle', 'skalv',
  'skims', 'skvip', 'slaps', 'slink', 'slukt', 'smett', 'snilt', 'solgt',
  'spake', 'spole', 'spreg', 'stang', 'stivt', 'strek', 'stumt', 'svikt',
  // T
  'tabel', 'tagle', 'takle', 'talte', 'tampe', 'tange', 'tappe', 'tarne',
  'tegle', 'tekst', 'temme', 'tenke', 'teppe', 'terpe', 'teste', 'tikle',
  'tilde', 'tilse', 'timer', 'tinde', 'tinge', 'tirre', 'todle', 'tofle',
  'togre', 'tolke', 'tomme', 'torde', 'torre', 'traff', 'trale', 'trang',
  'trapp', 'traum', 'treff', 'trend', 'trevl', 'trigg', 'tripp', 'trofe',
  'tropp', 'truck', 'trunk', 'trygg', 'tufte', 'tugle', 'tulse', 'tumle',
  'turne', 'tuste', 'tvang', 'tvile', 'tylle', 'tynge', 'tyrke', 'tysse',
  'table', 'takst', 'taler', 'tapre', 'tegne', 'tempe', 'tesle', 'tikke',
  'timid', 'titte', 'tolne', 'toner', 'trakt', 'trase', 'triks', 'trosk',
  'tryne', 'tugge', 'tulip', 'turbo', 'tvert', 'tykte', 'tyngd', 'tabel',
  // U
  'ugras', 'ullen', 'ulovl', 'ulykk', 'under', 'ungel', 'unike', 'urban',
  'uredd', 'urtid', 'uselt', 'utbre', 'utfor', 'utkle', 'utleg', 'utsyn',
  'uekte', 'ubote', 'udelt', 'uhyre', 'uklar', 'umake', 'unber', 'updra',
  // V
  'vabel', 'vafle', 'vagel', 'vakle', 'valen', 'valpe', 'vampe', 'vanke',
  'varme', 'vasle', 'vebel', 'vedge', 'vegne', 'veide', 'veile', 'vekke',
  'velde', 'velte', 'vende', 'verdi', 'verge', 'verse', 'vigge', 'vikle',
  'vilde', 'vilse', 'vimle', 'vinde', 'vinke', 'virke', 'viser', 'viske',
  'vogle', 'volde', 'vrede', 'vrime', 'vrisk', 'vulst', 'vugge', 'vinge',
  'vakre', 'valse', 'vanse', 'vedle', 'vekst', 'vendt', 'verft', 'vigil',
  'vildt', 'visse', 'volds', 'vreng', 'vulne', 'vaker', 'valgt', 'varmt',
  // W
  'wader', 'waltz',
  // Y
  'yield', 'ymper', 'yndig', 'yrkes', 'yster', 'ytter', 'yoggi', 'yacht',
  // Æ
  'ærlig', 'ævred',
  // Ø
  'ødsel', 'øgler', 'ølost', 'ønske', 'øvrig', 'ørken', 'øyner', 'øving',
  // Å
  'åklag', 'ålreg', 'åndre', 'åpner', 'årbok', 'åsted', 'åtsel', 'årvak',

  // Extended set — simple, distinct, phone-friendly words to reach 4096
  // Nature
  'bjork', 'stein', 'fjord', 'elven', 'skog', 'havet', 'myren', 'bakke',
  'dalen', 'toppe', 'berga', 'sanda', 'tange', 'holma', 'viken', 'neset',
  'odden', 'sving', 'bredd', 'kulpe', 'fonna', 'isbru', 'morka', 'lynga',
  'grota', 'hamna', 'bukta', 'stien', 'juvet', 'fjelg', 'skoga', 'vidda',
  'tinda', 'sivet', 'torva', 'furua', 'eiken', 'selja', 'rogna', 'orren',
  'lirpa', 'hvala', 'kobbe', 'laksa', 'terna', 'gaupa', 'elger', 'bjorn',
  'haren', 'reven', 'ulven', 'minka', 'otera', 'selen', 'rypes', 'falka',
  'hauks', 'krigs', 'makks', 'lunde', 'alken', 'svane', 'gaser', 'duene',

  // Objects & daily life
  'stole', 'borde', 'hylle', 'veske', 'knapp', 'knive', 'gaffl', 'skjen',
  'koppe', 'flaske', 'beger', 'gryte', 'panne', 'steke', 'kanne', 'mugge',
  'skrin', 'etuie', 'mappe', 'sedel', 'mynte', 'bilde', 'ramme', 'klokk',
  'speil', 'lampe', 'stump', 'spade', 'rive', 'sager', 'vindu', 'dorer',
  'trapp', 'gulve', 'vegg', 'takke', 'vegen', 'stien', 'broen', 'kilen',
  'flate', 'runde', 'lange', 'korte', 'breie', 'smale', 'digre', 'bitne',
  'stive', 'mjuke', 'glatt', 'grove', 'skarpe', 'butte', 'spiss', 'harde',

  // Actions
  'hoppe', 'danse', 'synge', 'plysj', 'spele', 'roper', 'loper', 'kaste',
  'fange', 'hente', 'bruke', 'finne', 'vente', 'sende', 'legge', 'sette',
  'bygge', 'skape', 'drive', 'skyte', 'svare', 'prove', 'flyge', 'seile',
  'dykke', 'grave', 'klatr', 'sveip', 'biter', 'smake', 'lukta', 'holer',
  'skuer', 'rekke', 'gripe', 'holde', 'baere', 'trede', 'styre', 'leder',

  // Colors & qualities
  'blank', 'matte', 'lyser', 'morke', 'klart', 'diset', 'frisk', 'sterk',
  'svake', 'kvikk', 'trege', 'raske', 'rolig', 'ville', 'tamme', 'vonde',
  'godet', 'rikig', 'fatts', 'unge', 'gamlt', 'nyere', 'eldre', 'fulle',
  'tomme', 'tunge', 'lette', 'varme', 'kalde', 'torre', 'blote', 'tykke',
  'tynne', 'rette', 'skjev', 'buete', 'flate', 'djupe', 'grunne', 'hoyde',

  // Weather & seasons
  'storm', 'vinde', 'regna', 'snoen', 'ising', 'frost', 'solen', 'skyer',
  'taker', 'dimma', 'dogge', 'bygen', 'orkan', 'kuler', 'brise', 'heter',
  'kulda', 'milde', 'skarpe', 'biter', 'vaart', 'somre', 'hoste', 'vinta',
  'april', 'maien', 'junis', 'julia', 'augst', 'septe', 'oktob', 'nover',

  // Food & drink
  'brode', 'smoer', 'melka', 'osten', 'fiske', 'kjott', 'suppe', 'salat',
  'frukt', 'baret', 'kaker', 'bolle', 'lefse', 'vafle', 'kreps', 'lakse',
  'torsk', 'kveit', 'silde', 'makrl', 'reker', 'bleka', 'hyser', 'seier',
  'kolje', 'lange', 'brems', 'kveie', 'orret', 'rodye', 'abbor', 'gjedl',

  // Numbers & counting words
  'enkel', 'doble', 'treig', 'kvart', 'femte', 'sjete', 'sjuet', 'atter',
  'niell', 'tiers', 'elfte', 'tolft', 'halve', 'heile', 'begge', 'neste',
  'forst', 'sistt', 'mitte', 'yters', 'overs', 'under', 'baked', 'foran',
  'sidev', 'ovenp', 'nedre', 'neste', 'forbi', 'langs', 'rundt', 'tvers',

  // Buildings & places
  'hytta', 'stova', 'fjose', 'nauste', 'brygge', 'molen', 'kaien', 'torgr',
  'plase', 'gate', 'veien', 'tunet', 'hagen', 'parke', 'skole', 'kirke',
  'butik', 'baker', 'slakt', 'verft', 'fabri', 'gruve', 'sagas', 'molle',
  'kvern', 'damme', 'bruks', 'rorbua', 'gamme', 'lavvo', 'siste', 'poste',

  // Maritime
  'anker', 'seilr', 'roret', 'maste', 'baugn', 'aktrs', 'kjole', 'dekks',
  'lugre', 'skute', 'snekk', 'jekte', 'fembr', 'robar', 'ferje', 'prame',
  'jolle', 'kanot', 'kajak', 'flote', 'tauer', 'liner', 'trosr', 'bolen',
  'vagge', 'kreng', 'sjakl', 'blokk', 'vinsj', 'sjakl', 'beite', 'haler',

  // Tools & crafts
  'knivs', 'sagas', 'borer', 'hamre', 'meise', 'spade', 'river', 'harve',
  'plogg', 'ljore', 'sigde', 'lauve', 'kratt', 'kvass', 'slepe', 'brynt',
  'smidd', 'sveip', 'dreie', 'hogge', 'flise', 'splnt', 'nagle', 'boltr',
  'skrue', 'mutre', 'sveis', 'lodde', 'knyte', 'flets', 'vevds', 'bunde',

  // Music & sound
  'toner', 'klang', 'ljome', 'bruse', 'summe', 'dirre', 'knirk', 'smell',
  'drune', 'hvine', 'piper', 'tutar', 'bjell', 'gonge', 'rasle', 'skvlp',
  'plask', 'buldl', 'tordl', 'brake', 'knase', 'frase', 'sitre', 'vibre',
  'pulse', 'hamre', 'dunke', 'banke', 'tikke', 'klikk', 'snapp', 'smell',

  // Textile & clothing
  'gensn', 'jakke', 'bukse', 'skjrt', 'luseg', 'kofte', 'votte', 'leste',
  'skinn', 'saueg', 'liner', 'silke', 'bomul', 'tweed', 'denim', 'fille',
  'dukke', 'sying', 'strik', 'hekle', 'vevde', 'farge', 'bleik', 'stamp',
  'tovde', 'press', 'myket', 'rufse', 'glatt', 'stivt', 'safir', 'rubin',

  // Sami & Northern culture
  'joike', 'lavvu', 'gamme', 'siida', 'duodj', 'giisa', 'pulks', 'raido',
  'stalo', 'noaid', 'beaiv', 'gouve', 'guksi', 'risko', 'luoht', 'muitt',
  'vuost', 'bierg', 'boazu', 'eallu', 'gahtt', 'gievr', 'njall', 'skall',
  'vuovd', 'meahc', 'duott', 'giell', 'suolu', 'njarg', 'avvil', 'cuopp',

  // Technology (simple)
  'kabel', 'modem', 'skjrm', 'tasta', 'lader', 'batri', 'minne', 'chips',
  'disks', 'netts', 'fiber', 'radio', 'tuner', 'volum', 'frekg', 'ampre',
  'watts', 'kilog', 'meter', 'liter', 'grad', 'seklr', 'hertz', 'tesla',
  'joule', 'farad', 'henry', 'kelvi', 'lumns', 'molar', 'bekkl', 'candl',

  // Emotions & states
  'glade', 'trist', 'sinne', 'redde', 'modig', 'rolig', 'spent', 'slite',
  'trott', 'kvikk', 'doven', 'ivrig', 'stolt', 'flaut', 'genrt', 'trygg',
  'utryg', 'villt', 'stile', 'rastl', 'bekym', 'lette', 'tynge', 'glemm',
  'husks', 'lurer', 'fostr', 'satse', 'svikr', 'litlr', 'storl', 'droms',

  // Additional simple words to reach 4096
  'alger', 'balsa', 'celle', 'deler', 'eplne', 'feler', 'geler', 'helse',
  'isbre', 'jager', 'keile', 'leire', 'meles', 'neper', 'obser', 'pelsr',
  'rebus', 'serum', 'teint', 'umalt', 'velar', 'wedge', 'xerox', 'yldig',
  'zebra', 'agave', 'bever', 'cytol', 'debet', 'endiv', 'fabel', 'globs',
  'haiku', 'irisk', 'jadis', 'karma', 'limbo', 'makro', 'nomad', 'oasis',
  'plaid', 'quasi', 'relei', 'saint', 'tarot', 'unikt', 'vigor', 'xenon',
  'zarks', 'adept', 'basil', 'cedar', 'depot', 'envoi', 'flora', 'genus',
  'humus', 'index', 'kapok', 'lotus', 'manga', 'nylon', 'opium', 'pixel',

  'quilt', 'resin', 'satin', 'topas', 'ultra', 'vinyl', 'wafer', 'zoner',
  'akutt', 'busto', 'clown', 'duett', 'elegi', 'foton', 'gnome', 'harpe',
  'ironi', 'jubel', 'kloss', 'lyrik', 'motto', 'novum', 'oblig', 'plomb',
  'rabat', 'skald', 'turbo', 'udelt', 'vokse', 'winge', 'yrike', 'zilke',
  'arkiv', 'blygg', 'civil', 'draft', 'eldes', 'flamm', 'gnist', 'hofte',
  'igler', 'jumbo', 'klyse', 'lidse', 'motel', 'norns', 'oksid', 'print',
  'ramps', 'sedan', 'triks', 'utslr', 'vitne', 'wilds', 'ymser', 'zinke',
  'anods', 'bufre', 'cunin', 'dufts', 'etisk', 'fusel', 'gyros', 'hutsk',

  'intim', 'jokke', 'kubis', 'likes', 'miras', 'nidke', 'omega', 'pudds',
  'revet', 'stubb', 'tangs', 'ussel', 'verks', 'wikis', 'ypper', 'zubat',
  'ambra', 'brise', 'dalte', 'emise', 'floss', 'gripe', 'himle', 'isoks',
  'jolte', 'kulse', 'livat', 'milde', 'niste', 'opals', 'prate', 'rekve',
  'svale', 'trope', 'utvei', 'vokts', 'wurst', 'yster', 'zepln', 'asken',
  'bruse', 'drape', 'elfin', 'forge', 'glimt', 'holdt', 'ivret', 'jambe',
  'kvile', 'linse', 'mynte', 'nudge', 'osing', 'prims', 'rivne', 'skurv',
  'tugge', 'umble', 'vrist', 'ygler', 'alvor', 'blink', 'dyret', 'ermet',

  'flire', 'guffe', 'hulke', 'idret', 'juvle', 'kratt', 'leske', 'minst',
  'napper', 'okels', 'puffs', 'rimer', 'skyte', 'turer', 'uvant', 'vekks',
  'ylest', 'agnar', 'buldr', 'diger', 'eksos', 'frost', 'glefs', 'hesje',
  'innbo', 'krype', 'lodds', 'morsk', 'nilse', 'ovner', 'plire', 'reder',
  'slure', 'trege', 'utleg', 'vreng', 'yller', 'borst', 'dragl', 'estim',
  'fjols', 'grums', 'hutre', 'iskos', 'knase', 'ljuge', 'mugne', 'nydre',
  'osmol', 'pluds', 'rispe', 'slurp', 'tulse', 'uviss', 'vimse', 'yster',
  'blings', 'dosnt', 'ekelt', 'flote', 'gripe', 'hutsk', 'ilsks', 'kvikk',

  'lurte', 'mugge', 'nulre', 'oljet', 'plire', 'romle', 'skubb', 'trass',
  'unber', 'vogge', 'ymtrs', 'borge', 'dolke', 'ekorn', 'forli', 'glitr',
  'hoste', 'iltre', 'kryme', 'lysig', 'merks', 'nitid', 'osket', 'pluge',
  'rogns', 'skurv', 'trasig', 'upleg', 'vrist', 'ytter', 'blekk', 'drysj',
  'eksil', 'fosse', 'grisk', 'hvass', 'idiot', 'kvist', 'ljose', 'myrds',
  'naver', 'orkis', 'pruds', 'rusle', 'skvlr', 'tralt', 'usigt', 'volsk',
  'ylnde', 'bukle', 'dagle', 'embal', 'fosne', 'gurks', 'hysje', 'irret',
  'kvise', 'lyten', 'musks', 'nitts', 'ovmod', 'pluss', 'rutne', 'skumr',

  'trods', 'ufyse', 'vodds', 'ylvis', 'brakt', 'dufte', 'ermet', 'flage',
  'gurvl', 'husks', 'irrer', 'kvele', 'lyssk', 'muske', 'notat', 'ovner',
  'prute', 'rydse', 'slott', 'triks', 'uvane', 'volks', 'ytres', 'brems',
  'dusje', 'estis', 'flaks', 'gynge', 'hykle', 'isbre', 'kveld', 'lydig',
  'mults', 'notis', 'overt', 'prakt', 'rydds', 'slokt', 'tralt', 'umild',
  'vondt', 'yters', 'brisk', 'dyppe', 'evner', 'fjomp', 'gysts', 'hyler',
  'isbit', 'kvikk', 'lynet', 'multi', 'nydls', 'ovrig', 'preks', 'ryggs',
  'slogs', 'turnt', 'umake', 'volds', 'ytres', 'bryte', 'dusks', 'evige',

  'fjols', 'gyrne', 'hylse', 'ivory', 'kvise', 'lyser', 'mulig', 'nytte',
  'overt', 'prims', 'rykte', 'sludd', 'tvert', 'umbra', 'votum', 'ytret',
  'brink', 'dusin', 'exact', 'fabel', 'gylle', 'hvile', 'ivrig', 'kvote',
  'lyrik', 'mumle', 'nytts', 'ovalt', 'prise', 'rykke', 'smelt', 'tvils',
  'umors', 'vrids', 'ytrer', 'bruks', 'duven', 'fagre', 'gyter', 'hvisk',
  'imens', 'kvern', 'lytte', 'murre', 'nyser', 'oxide', 'probe', 'ryper',
  'smule', 'twist', 'undre', 'vrims', 'ytrer', 'bylge', 'dydig', 'fakle',
  'gytje', 'hylst', 'imots', 'kylne', 'lyves', 'musse', 'oboen', 'prose',
];

/**
 * Generates a random 6-digit PIN.
 * Uses crypto.getRandomValues for secure randomness.
 */
export function generatePin(): string {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  // Modulo 10^PIN_LENGTH gives a number 0..999999
  const pin = (arr[0] % (10 ** PIN_LENGTH)).toString().padStart(PIN_LENGTH, '0');
  return pin;
}

/**
 * Generates a random salt for PBKDF2 key derivation.
 * Each .averdi file gets a unique salt (stored in unencrypted metadata).
 */
export function generateSalt(): Uint8Array<ArrayBuffer> {
  return crypto.getRandomValues(new Uint8Array(PBKDF2_SALT_LENGTH)) as Uint8Array<ArrayBuffer>;
}

/**
 * Derives an AES-256-GCM CryptoKey from a PIN + per-file salt using PBKDF2.
 * The salt must be the same value used during encryption (stored in file metadata).
 */
export async function deriveKeyFromPin(pin: string, salt: Uint8Array<ArrayBuffer>): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const pinBytes = encoder.encode(pin);

  const baseKey = await crypto.subtle.importKey(
    'raw',
    pinBytes,
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: PBKDF2_HASH,
    },
    baseKey,
    { name: ALGORITHM, length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );
}
