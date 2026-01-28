'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Mail, Phone, ArrowRight } from 'lucide-react';
import type { ServicePageConfig } from '@/types/service';

interface ServicePageLayoutProps {
  config: ServicePageConfig;
}

export function ServicePageLayout({ config }: ServicePageLayoutProps) {
  const { hero, products, expert, faq } = config;
  const [activeProduct, setActiveProduct] = useState(products[0]?.id || '');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const themeColors = {
    orange: {
      gradient: 'from-orange-600 to-amber-500',
      accent: 'bg-orange-500',
      accentHover: 'hover:bg-orange-600',
      text: 'text-orange-600',
      border: 'border-orange-500',
      light: 'bg-orange-50',
    },
    blue: {
      gradient: 'from-blue-600 to-cyan-500',
      accent: 'bg-blue-500',
      accentHover: 'hover:bg-blue-600',
      text: 'text-blue-600',
      border: 'border-blue-500',
      light: 'bg-blue-50',
    },
    green: {
      gradient: 'from-green-600 to-emerald-500',
      accent: 'bg-green-500',
      accentHover: 'hover:bg-green-600',
      text: 'text-green-600',
      border: 'border-green-500',
      light: 'bg-green-50',
    },
    slate: {
      gradient: 'from-slate-700 to-slate-500',
      accent: 'bg-slate-600',
      accentHover: 'hover:bg-slate-700',
      text: 'text-slate-600',
      border: 'border-slate-500',
      light: 'bg-slate-50',
    },
  };

  const colors = themeColors[hero.theme];
  const activeProductData = products.find((p) => p.id === activeProduct);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className={`relative py-24 lg:py-32 bg-gradient-to-br ${colors.gradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              {hero.subtitle}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Product Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setActiveProduct(product.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeProduct === product.id
                      ? `${colors.accent} text-white shadow-lg scale-105`
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {product.title}
                </button>
              ))}
            </div>

            {/* Active Product Content */}
            {activeProductData && (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${colors.light} ${colors.text} mb-4`}>
                    {activeProductData.shortDesc}
                  </span>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">
                    {activeProductData.title}
                  </h2>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    {activeProductData.content}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {activeProductData.bullets.map((bullet, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className={`w-2 h-2 rounded-full ${colors.accent} mt-2 flex-shrink-0`} />
                        <span className="text-slate-700">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={activeProductData.link}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg ${colors.accent} ${colors.accentHover} text-white font-medium transition-all duration-300 hover:shadow-lg`}
                  >
                    {activeProductData.linkText}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={activeProductData.icon}
                      alt={activeProductData.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Expert Section */}
      <section className={`py-20 ${colors.light}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-square md:aspect-auto">
                  <Image
                    src={expert.image}
                    alt={expert.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <blockquote className="text-xl text-slate-700 italic mb-6 leading-relaxed">
                    &ldquo;{expert.quote}&rdquo;
                  </blockquote>
                  <div className="mb-6">
                    <p className="font-bold text-slate-900 text-lg">{expert.name}</p>
                    <p className={`${colors.text} font-medium`}>{expert.role}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={`mailto:${expert.email}`}
                      className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      {expert.email}
                    </a>
                    <a
                      href={`tel:${expert.phone}`}
                      className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      {expert.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
              Ofte stilte spørsmål
            </h2>
            <div className="space-y-4">
              {faq.map((item, index) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-medium text-slate-900 pr-4">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <p className="px-6 pb-5 text-slate-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 bg-gradient-to-br ${colors.gradient}`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Klar til å komme i gang?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Ta kontakt for en uforpliktende prat om hvordan vi kan hjelpe din bedrift.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Kontakt oss
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
