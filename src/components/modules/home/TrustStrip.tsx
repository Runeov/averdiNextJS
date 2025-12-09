import Image from 'next/image';

// UPDATED IMPORTS: Match your new filenames exactly
import logoRegnskapNorge from '@/assets/regnskapnorgemedledd_gra.webp';
import logoPowerOffice from '@/assets/Logo_poweroffice.jpg';
import logoFinago from '@/assets/Logo_finago.avif'; // Keep this if it works, otherwise replace it too

export default function TrustStrip() {
  const partners = [
    { name: 'Regnskap Norge', logo: logoRegnskapNorge, width: 140 },
    { name: 'PowerOffice Go', logo: logoPowerOffice, width: 140 },
    { name: 'Finago', logo: logoFinago, width: 120 },
  ];

  return (
    <section className="bg-white border-y border-slate-100 py-10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
          Vi er sertifisert partner med
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          {partners.map((partner) => (
            <div key={partner.name} className="relative h-12 w-32 lg:w-40">
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                fill
                className="object-contain"
                // You can remove 'unoptimized' now if the files are valid images
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}