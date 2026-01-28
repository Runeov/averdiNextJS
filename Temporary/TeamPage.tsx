import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { employees } from '../data/employees';
import { User } from 'lucide-react';

// Gjenbruk TeamCard koden her eller importer den hvis du skiller den ut i en egen fil
function TeamCard({ name, role, onViewProfile }: any) {
  // ... (Samme kode som i About.tsx for TeamCard)
  return (
    <div className="relative bg-white rounded-xl shadow-lg border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col overflow-hidden group">
        {/* ... innhold fra TeamCard ... */}
        {/* Lim inn resten av TeamCard koden her for enkelhets skyld, eller flytt den til components/TeamCard.tsx */}
        <div className="p-6 text-center flex flex-col h-full">
            {/* ... bilde, navn, rolle ... */}
            <h3 className="text-xl font-bold mb-1">{name}</h3>
            <p className="text-primary font-medium mb-4 text-sm uppercase">{role}</p>
            <div className="space-y-3 mt-auto w-full">
               <button onClick={onViewProfile} className="w-full h-10 px-4 py-2 bg-primary/5 text-primary hover:bg-primary hover:text-white rounded-md transition-colors flex items-center justify-center gap-2">
                 <User className="h-4 w-4" /> Se profil
               </button>
            </div>
        </div>
    </div>
  );
}

export function TeamPage() {
  const navigate = useNavigate();
  const allEmployees = Object.values(employees);

  return (
    <main className="pt-32 pb-24 px-4 min-h-screen bg-background">
      <Helmet>
        <title>Våre Ansatte | Regnskapsførere i Averdi</title>
        <meta 
          name="description" 
          content="Møt vårt team av statsautoriserte regnskapsførere og rådgivere. Vi har spesialkompetanse på samiske organisasjoner, handel og primærnæring." 
        />
      </Helmet>

      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">Vårt Team</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Her er menneskene som hjelper deg med å lykkes. Klikk på en profil for å se deres spesialområder.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {allEmployees.map((member) => (
            <TeamCard
              key={member.id}
              name={member.name}
              role={member.role}
              email={member.email}
              phone={member.phone}
              description={member.description}
              onViewProfile={() => {
                navigate(`/om-oss/ansatte/${member.id}`);
                window.scrollTo(0, 0);
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}