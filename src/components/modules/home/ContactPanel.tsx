'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, Copy } from 'lucide-react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to a real form handler (e.g., Netlify Forms or API route)
    alert('Takk for din henvendelse! Vi kontakter deg snart.');
    setFormData({ name: '', email: '', phone: '', company: '', message: '' });
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
          <div className="space-y-8">
            <Card className="bg-white shadow-xl border-slate-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Kom i kontakt</h3>
                
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-1">Ring oss direkte</p>
                      <div className="flex items-center gap-2">
                        <a href="tel:+4790767993" className="text-blue-600 hover:underline">+47 907 67 993</a>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard('+4790767993', 'Telefon')}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-1">Send e-post</p>
                      <div className="flex items-center gap-2">
                        <a href="mailto:post@averdi.no" className="text-blue-600 hover:underline">post@averdi.no</a>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard('post@averdi.no', 'E-post')}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-2">Vårt kontor</p>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span>Hovedgata 15, 9730 Karasjok</span>
                        <Button variant="ghost" size="icon" className="h-4 w-4" onClick={() => copyToClipboard('Hovedgata 15, 9730 Karasjok', 'Adresse')}>
                          <Copy className="h-3 w-3" />
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
          <Card className="bg-white shadow-xl border-slate-200">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 relative">
                   <Image src={contactLogo} alt="Contact Icon" fill className="object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Send oss en melding</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Navn *</label>
                    <Input 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bedrift</label>
                    <Input 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">E-post *</label>
                  <Input 
                    type="email"
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Telefon</label>
                  <Input 
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Melding *</label>
                  <Textarea 
                    required 
                    className="h-32"
                    placeholder="Hvordan kan vi hjelpe deg?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <Button type="submit" className="w-full bg-[#E86C1F] hover:bg-[#d65f18] text-white">
                  Send melding
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}