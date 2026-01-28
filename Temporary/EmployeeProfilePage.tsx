import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Mail, Phone, MapPin, Award, BookOpen, Languages, Briefcase, ArrowRight } from 'lucide-react';
import { employees } from '../data/employees';
import { Button } from '../components/ui/button';

export function EmployeeProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const employee = id ? employees[id] : undefined;

  if (!employee) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <h1 className="text-2xl font-bold mb-4">Fant ikke ansatt</h1>
        <Button onClick={() => navigate('/')}>Gå til forsiden</Button>
      </div>
    );
  }

  // Schema Markup for Person (SEO)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": employee.name,
    "jobTitle": employee.role,
    "worksFor": {
      "@type": "Organization",
      "name": "Averdi"
    },
    "telephone": employee.phone,
    "email": employee.email,
    "knowsLanguage": employee.languages
  };

  return (
    <main className="pt-32 pb-24 px-4 min-h-screen bg-background">
      <Helmet>
        <title>{`${employee.name} - ${employee.role} | Averdi Karasjok`}</title>
        <meta 
          name="description" 
          content={`Kontakt ${employee.name}, ${employee.role} hos Averdi. Spesialist på ${employee.specialties.slice(0, 3).join(', ')}. Vi hjelper samiske organisasjoner og småbedrifter i Finnmark.`} 
        />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/#about')} // Linker tilbake til Team-seksjonen på forsiden (krever at ID er satt)
          className="mb-8 pl-0 hover:bg-transparent hover:text-primary -ml-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Tilbake til oversikt
        </Button>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Venstre kolonne: Bilde og Kontakt (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg border border-primary/10 relative group">
               {employee.image ? (
                 <img src={employee.image} alt={employee.name} className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary text-7xl font-bold group-hover:scale-110 transition-transform duration-500">
                   {employee.name.charAt(0)}
                 </div>
               )}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Kontaktinfo</h3>
                  <div className="space-y-4">
                    <a href={`mailto:${employee.email}`} className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group/link">
                      <div className="p-2 bg-primary/5 rounded-lg group-hover/link:bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium break-all">{employee.email}</span>
                    </a>
                    <a href={`tel:${employee.phone}`} className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group/link">
                      <div className="p-2 bg-primary/5 rounded-lg group-hover/link:bg-primary/10">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{employee.phone}</span>
                    </a>
                    <div className="flex items-center gap-3 text-foreground">
                      <div className="p-2 bg-primary/5 rounded-lg">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium capitalize">{employee.office}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                <p className="text-xs text-muted-foreground text-center">
                  Kontortid: {employee.workingHours}
                </p>
              </div>
            </div>
          </div>

          {/* Høyre kolonne: Info og SEO-innhold (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                {employee.role}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">{employee.name}</h1>
              <div className="prose prose-lg text-muted-foreground max-w-none whitespace-pre-line leading-relaxed">
                {employee.longDescription}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Spesialområder */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-2 mb-4 text-primary">
                  <Award className="h-6 w-6" />
                  <h3 className="font-bold text-lg">Ekspertise</h3>
                </div>
                <ul className="space-y-3">
                  {employee.specialties.map((spec, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Kundetyper */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-2 mb-4 text-primary">
                  <Briefcase className="h-6 w-6" />
                  <h3 className="font-bold text-lg">Jobber med</h3>
                </div>
                <ul className="space-y-3">
                  {employee.clientTypes.map((client, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                      {client}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Språk og Utdanning - Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-full">
                <Languages className="h-4 w-4 text-gray-500" />
                {employee.languages.join(" / ")}
              </div>
              {employee.education.map((edu, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-full">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  {edu}
                </div>
              ))}
            </div>

            {/* Intern lenking til fagområder */}
            {employee.relatedHubs && employee.relatedHubs.length > 0 && (
              <div className="pt-8 border-t border-gray-100">
                <h3 className="text-lg font-bold mb-4 text-foreground">Relevante fagområder</h3>
                <div className="flex flex-wrap gap-4">
                  {employee.relatedHubs.map((hub, i) => (
                    <Link 
                      key={i} 
                      to={hub.link}
                      className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all duration-300 font-medium text-sm border border-primary/10"
                    >
                      {hub.title}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}