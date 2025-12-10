import Link from 'next/link';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  theme?: 'blue' | 'green' | 'orange';
}

const themeClasses = {
  blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
  green: 'bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white',
  orange: 'bg-orange-50 text-[#E86C1F] group-hover:bg-[#E86C1F] group-hover:text-white',
};

export function CategoryCard({ title, description, href, icon: Icon, theme = 'blue' }: CategoryCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <Card className="h-full transition-all duration-300 hover:shadow-xl border-slate-200 hover:border-transparent">
        <CardContent className="p-8 flex flex-col h-full relative overflow-hidden">
          {/* Dekorativ bakgrunn ved hover */}
          <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300", 
            theme === 'blue' ? 'bg-blue-600' : theme === 'green' ? 'bg-green-600' : 'bg-[#E86C1F]'
          )} />

          <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300", themeClasses[theme])}>
            <Icon className="w-7 h-7" />
          </div>
          
          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-900">
            {title}
          </h3>
          
          <p className="text-slate-600 mb-6 flex-1 leading-relaxed">
            {description}
          </p>

          <div className={cn("flex items-center text-sm font-bold transition-colors mt-auto", 
             theme === 'blue' ? 'text-blue-600' : theme === 'green' ? 'text-green-600' : 'text-[#E86C1F]'
          )}>
            Utforsk
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}