'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, Copy, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import contactLogo from '@/assets/contact.avif'; 

export default function ContactPanel() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    try {
      // Netlify Forms submission via fetch
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formData,
        }).toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    alert(`${type} kopiert til utklippstavlen`);
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-blue-50 via-white to-slate-100 relative">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            Trenger du hjelp? Ta kontakt!
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">
            Kontakt oss
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Klar for å ta kontroll over økonomien? Vi hjelper deg gjerne!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side: Contact Info & Map */}
          <div className="space-y-8 order-2 lg:order-1">
            <Card className="bg-white shadow-xl border-slate-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Kom i kontakt</h3>
                
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-1">Ring oss direkte</p>
                      <div className="flex items-center gap-2">
                        <a href="tel:+4790767993" className="text-blue-600 hover:underline">+47 907 67 993</a>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard('+4790767993', 'Telefon')} aria-label="Kopier telefonnummer">
                          <Copy className="h-3 w-3" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-1">Send e-post</p>
                      <div className="flex items-center gap-2">
                        <a href="mailto:post@averdi.no" className="text-blue-600 hover:underline">post@averdi.no</a>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard('post@averdi.no', 'E-post')} aria-label="Kopier e-postadresse">
                          <Copy className="h-3 w-3" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-2">Vårt kontor</p>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span>Juhána Rásttoš geaidnu 2, 9730 Karasjok</span>
                        <Button variant="ghost" size="icon" className="h-4 w-4" onClick={() => copyToClipboard('Juhána Rásttoš geaidnu 2, 9730 Karasjok', 'Adresse')} aria-label="Kopier adresse">
                          <Copy className="h-3 w-3" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="overflow-hidden shadow-xl border-slate-200">
               <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1676.8622876657922!2d25.5092!3d69.4719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjnCsDI4JzE4LjgiTiAyNcKwMzAnNDEuMCJF!5e0!3m2!1sno!2sno!4v1620000000000!5m2!1sno!2sno"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Averdi Karasjok Office Location"
                />
            </Card>
          </div>

          {/* Right Side: Form */}
          <Card className="bg-white shadow-xl border-slate-200 order-1 lg:order-2">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 relative">
                   <Image src={contactLogo} alt="Contact Icon" fill sizes="48px" className="object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Send oss en melding</h3>
              </div>
              
              {submitStatus === 'success' ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Takk for din henvendelse!</h4>
                  <p className="text-slate-600 mb-6">Vi kontakter deg så snart som mulig.</p>
                  <Button
                    onClick={() => setSubmitStatus('idle')}
                    variant="outline"
                    className="border-[#E86C1F] text-[#E86C1F] hover:bg-[#E86C1F]/10"
                  >
                    Send ny melding
                  </Button>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Hidden fields for Netlify Forms */}
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Don&apos;t fill this out: <input name="bot-field" />
                    </label>
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-sm font-medium">Navn *</label>
                      <Input
                        id="contact-name"
                        name="name"
                        required
                        aria-required="true"
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-company" className="text-sm font-medium">Bedrift</label>
                      <Input
                        id="contact-company"
                        name="company"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-sm font-medium">E-post *</label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-phone" className="text-sm font-medium">Telefon</label>
                    <Input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-sm font-medium">Melding *</label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      required
                      aria-required="true"
                      className="h-32"
                      placeholder="Hvordan kan vi hjelpe deg?"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      Noe gikk galt. Prøv igjen, eller send oss en e-post direkte.
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-[#E86C1F] hover:bg-[#d65f18] text-white"
                    disabled={submitStatus === 'submitting'}
                  >
                    {submitStatus === 'submitting' ? 'Sender...' : 'Send melding'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
