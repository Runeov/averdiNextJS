'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Next.js equivalent of useNavigate
import { ArrowRight, MessageSquare, TrendingUp, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SalesPitch() {
  const router = useRouter();

  // Using the same image source, but ideally, this should be a local asset in src/assets
  // If keeping external, remember to configure next.config.js
  const imageSrc = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80";

  return (
    <section className="py-24 bg-slate-50 overflow-hidden font-sans">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E86C1F]/10 text-[#E86C1F] text-sm font-bold mb-6 border border-[#E86C1F]/20">
                <TrendingUp className="w-4 h-4" />
                <span>Din vekstpartner i Nord</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 text-slate-900 leading-tight">
                Vi gjør regnskap til ditt <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E86C1F] to-[#F4B223]">viktigste styringsverktøy</span>
              </h2>
              
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed mb-10">
                <p>
                  Skal du ansette, investere eller spare? Svaret ligger i tallene dine. 
                  Men du trenger noen som kan oversette dem til klare råd.
                </p>
                <p>
                  Vi i Averdi er ferdig med "bare bokføring". Vi gir deg innsikten og kontrollen du trenger i dag, for å ta de rette valgene for i morgen.
                </p>
                <p className="font-medium text-slate-900 border-l-4 border-[#E86C1F] pl-4">
                  Med lokal forankring i Finnmark og markedets beste sky-systemer, rigger vi din bedrift for vekst – uansett hvor i nord du holder til.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => router.push('/kontakt')}
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-[#E86C1F] rounded-full hover:bg-[#d65f18] transition-all shadow-lg hover:shadow-[#E86C1F]/40 transform hover:-translate-y-1 gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  Snakk med en rådgiver
                </button>

                <button
                  onClick={() => router.push('/om-oss')}
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 bg-white border-2 border-slate-200 rounded-full hover:border-[#E86C1F] hover:text-[#E86C1F] transition-all duration-300 group shadow-sm hover:shadow-md"
                >
                  Bli kjent med oss
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Image */}
          <div className="order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              {/* Decorative background blob */}
              <div className="absolute inset-0 bg-[#E86C1F]/10 rounded-full blur-3xl transform scale-90 translate-y-4 -z-10"></div>
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-square border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-700 ease-in-out">
                {/* NOTE: Using unoptimized=true for external images initially to avoid config errors.
                   Best practice: Download this image to public/ or src/assets/ and import it.
                */}
                <Image
                  src={imageSrc}
                  alt="Averdi rådgivning - Vi hjelper bedrifter i Finnmark å vokse"
                  fill
                  className="object-cover"
                  unoptimized 
                />
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-2 rounded-full text-green-700">
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-slate-900 font-bold text-base">Lokal tilstedeværelse</p>
                        <p className="text-slate-500 text-xs">Vi kjenner næringslivet i nord</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}