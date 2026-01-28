export interface ServiceProduct {
  id: string;
  title: string;
  shortDesc: string;
  icon: string;
  content: string;
  bullets: string[];
  link: string;
  linkText: string;
}

export interface ServiceExpert {
  name: string;
  role: string;
  quote: string;
  image: string;
  email: string;
  phone: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceHero {
  title: string;
  subtitle: string;
  theme: 'orange' | 'blue' | 'green' | 'slate';
}

export interface ServicePageConfig {
  hero: ServiceHero;
  products: ServiceProduct[];
  expert: ServiceExpert;
  faq: ServiceFaq[];
  articleTag: string;
}
