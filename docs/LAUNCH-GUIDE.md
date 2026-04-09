# Averdi.no - Teknisk lanseringsguide

Denne guiden er for den som skal ta over og lansere averdi.no i produksjon.

---

## 1. Sette admin-passord

Admin-panelet bruker bcrypt-hashet passord lagret som miljøvariabel. Ingen passord lagres i kildekoden.

### Steg for steg

1. Velg et sterkt passord (minst 12 tegn)

2. Generer en bcrypt-hash av passordet. Kjør i terminalen fra prosjektmappen:

```bash
node -e "const bcrypt=require('bcrypt'); bcrypt.hash('DITT-NYE-PASSORD', 10).then(h=>console.log(h))"
```

Erstatt `DITT-NYE-PASSORD` med det faktiske passordet. Kopier hele resultatet (starter med `$2b$10$...`).

3. Sett miljøvariablene:

**Lokalt** (`.env.local`):
```
ADMIN_PASSWORD_HASH=$2b$10$din-genererte-hash-her
```

**I Vercel** (produksjon):
- Gå til [vercel.com](https://vercel.com) → prosjektet → Settings → Environment Variables
- Legg til/oppdater `ADMIN_PASSWORD_HASH` med hashen du genererte
- Klikk "Save"

4. Du må også sette en sikker JWT-nøkkel for produksjon:

```bash
openssl rand -base64 32
```

Legg resultatet inn som `JWT_SECRET` i Vercel Environment Variables. Bruk **ikke** utviklingsnøkkelen i produksjon.

### Logge inn

- Gå til `https://averdi.no/admin/login`
- E-post: `admin@averdi.no`
- Passord: det du valgte i steg 1

### Sesjon

- Sesjoner varer 24 timer
- Lagret som httpOnly-cookie (`averdi-admin-session`)
- Secure-flagg er aktivt i produksjon (krever HTTPS)

---

## 2. Sette opp Resend (e-posttjeneste)

Resend brukes for å sende e-post fra kontaktskjemaet og sikker filoverføring. Den nåværende API-nøkkelen tilhører utvikleren og må byttes ut.

### Opprett egen Resend-konto

1. Gå til [resend.com](https://resend.com) og opprett en konto
2. Verifiser domenet `averdi.no`:
   - Gå til Domains → Add Domain
   - Skriv inn `averdi.no`
   - Resend gir deg DNS-poster (SPF, DKIM, DMARC) som må legges inn hos domeneregistraren
   - Vent til domenet er verifisert (grønn hake)

3. Generer en API-nøkkel:
   - Gå til [resend.com/api-keys](https://resend.com/api-keys)
   - Klikk "Create API Key"
   - Gi den et navn (f.eks. "Averdi Produksjon")
   - Velg tilgang: "Sending access" er tilstrekkelig
   - Velg domene: `averdi.no`
   - Kopier nøkkelen (starter med `re_`)

4. Sett miljøvariabelen i Vercel:
   - `RESEND_API_KEY` = din nye nøkkel

### Hvor Resend brukes

| Funksjon | API-rute | Fra-adresse | Til-adresse |
|----------|----------|-------------|-------------|
| Kontaktskjema | `/api/contact` | `noreply@averdi.no` | `post@averdi.no` |
| Sikker filoverføring | `/api/secure-transfer/send` | `sikker@averdi.no` | Konfigurerbar |

### E-postvariabler

Sett disse i Vercel Environment Variables:

```
RESEND_API_KEY=re_din-nye-nøkkel
SECURE_TRANSFER_RECIPIENT=den-som-skal-motta@averdi.no
SECURE_TRANSFER_FROM=sikker@averdi.no
```

Valgfritt (kontaktskjema bruker `noreply@averdi.no` som standard):
```
CONTACT_FROM_EMAIL=noreply@averdi.no
```

### Gratis plan

Resend sin gratisplan gir 100 e-poster per dag og 3000 per måned. Det holder for en vanlig bedriftsside.

---

## 3. Alle miljøvariabler (oppsummering)

Disse må settes i Vercel under Settings → Environment Variables:

| Variabel | Påkrevd | Beskrivelse |
|----------|---------|-------------|
| `JWT_SECRET` | Ja | Minst 32 tegn. Generer med `openssl rand -base64 32` |
| `ADMIN_PASSWORD_HASH` | Ja | Bcrypt-hash av admin-passordet |
| `ADMIN_WRITE_ENABLED` | Ja | Sett til `true` for å tillate redigering i admin |
| `RESEND_API_KEY` | Ja | API-nøkkel fra resend.com |
| `SECURE_TRANSFER_RECIPIENT` | Nei | Standard mottaker for sikker overføring (default: `support@averdi.no`) |
| `SECURE_TRANSFER_FROM` | Nei | Avsenderadresse for sikker overføring (default: `sikker@averdi.no`) |
| `CONTACT_FROM_EMAIL` | Nei | Avsenderadresse for kontaktskjema (default: `noreply@averdi.no`) |
| `NEXT_PUBLIC_HOTJAR_ID` | Nei | Hotjar Site ID for brukeranalyse |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Nei | Google Analytics 4 måle-ID |
| `NEXT_PUBLIC_SITE_URL` | Ja | `https://averdi.no` |
| `SITE_URL` | Ja | `https://averdi.no` |

---

## 4. Admin-panelet og innholdsendringer

### Slik fungerer det

All innholdsdata lagres som JSON-filer i `src/data/`:

| Innholdstype | Fil |
|-------------|-----|
| Artikler | `src/data/articles.json` |
| Ansatte | `src/data/employees.json` |
| Kunnskapsbank | `src/data/kunnskapsbank.json` |
| Brukere | `src/data/users.json` |

Endringer i admin-panelet (opprett, rediger, slett) skrives direkte til disse filene med fillåsing for å hindre korrupsjon.

### Viktig om Vercel

Vercel bruker serverless functions. Det betyr at filsystemet er **read-only i produksjon** med mindre du bruker en persistent storage-løsning.

I praksis:
- Endringer via admin-panelet fungerer lokalt og i preview-deploys
- I produksjon styres skrivetilgang av `ADMIN_WRITE_ENABLED`
- Innholdsendringer som gjøres lokalt eller i utvikling må committes til git og deployes for å bli synlige i produksjon

### Anbefalt arbeidsflyt for innholdsendringer

1. Kjør prosjektet lokalt: `npm run dev`
2. Gå til `http://localhost:3000/admin/login`
3. Gjør endringene i admin-panelet
4. Endringene lagres i JSON-filene
5. Commit og push til git
6. Vercel deployer automatisk

---

## 5. Deploy-sjekkliste

Før lansering, gå gjennom dette:

- [ ] Sett alle påkrevde miljøvariabler i Vercel (se tabell over)
- [ ] Generer ny `JWT_SECRET` for produksjon (ikke bruk utviklingsnøkkelen)
- [ ] Generer nytt admin-passord og sett `ADMIN_PASSWORD_HASH`
- [ ] Opprett Resend-konto, verifiser `averdi.no`, og sett ny `RESEND_API_KEY`
- [ ] Sett `NEXT_PUBLIC_SITE_URL` og `SITE_URL` til `https://averdi.no`
- [ ] Koble domenet `averdi.no` til Vercel-prosjektet (Settings → Domains)
- [ ] Test kontaktskjemaet etter deploy
- [ ] Test admin-innlogging etter deploy
- [ ] Fjern utviklerens Resend API-nøkkel (den gamle slutter å virke når kontoen fjernes)

---

## 6. Kjøre prosjektet lokalt

```bash
# Installer avhengigheter
npm install

# Kopier miljøvariabler
cp .env.example .env.local
# Rediger .env.local med dine verdier

# Start utviklingsserver
npm run dev
```

Åpne `http://localhost:3000` i nettleseren.

---

## 7. Nyttige kommandoer

```bash
# Generere admin-passord hash
node -e "const bcrypt=require('bcrypt'); bcrypt.hash('PASSORD', 10).then(h=>console.log(h))"

# Generere JWT-hemmelighet
openssl rand -base64 32

# Bygge for produksjon lokalt
npm run build

# Starte produksjonsbygg lokalt
npm start
```
