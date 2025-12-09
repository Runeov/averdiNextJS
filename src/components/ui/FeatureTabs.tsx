import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { FeatureTabsData } from '../../types/featureTabs';

interface FeatureTabsProps {
  data: FeatureTabsData;
  className?: string;
}

const FeatureTabs: React.FC<FeatureTabsProps> = ({ data, className = "" }) => {
  const { title, introText, features } = data;
  const [activeTab, setActiveTab] = useState(features[0]?.id || '');

  if (!features || features.length === 0) {
    return null;
  }

  return (
    <section className={`py-24 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">{title}</h2>
          <p className="text-xl text-gray-600">{introText}</p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setActiveTab(feature.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === feature.id
                  ? 'bg-[#E86C1F] text-white shadow-lg transform scale-105' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-selected={activeTab === feature.id}
              role="tab"
            >
              {feature.tabLabel}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto bg-gray-50 rounded-3xl p-8 lg:p-12 border border-gray-100">
          <AnimatePresence mode='wait'>
            {features.map((feature) => (
              activeTab === feature.id && (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid lg:grid-cols-2 gap-12 items-center"
                  role="tabpanel"
                >
                  {/* Content Side */}
                  <div>
                    <h3 className="text-3xl font-bold mb-6 text-gray-900">{feature.title}</h3>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      {feature.description}
                    </p>
                    <ul className="space-y-4 mb-8">
                      {feature.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <div className="bg-orange-100 p-1 rounded-full">
                            <Check className="w-4 h-4 text-[#E86C1F] flex-shrink-0" />
                          </div>
                          <span className="text-gray-700 font-medium">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {feature.contentLink && (
                       <Link to={feature.contentLink.url}>
                        <button className="bg-[#E86C1F] text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors font-bold shadow-md hover:shadow-lg">
                          {feature.contentLink.text}
                        </button>
                       </Link>
                    )}
                  </div>

                  {/* Image Side */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#E86C1F]/20 to-transparent rounded-2xl transform rotate-3 scale-105 transition-transform group-hover:rotate-2" />
                    <img 
                      src={feature.imageSrc} 
                      alt={feature.title}
                      className="relative z-10 rounded-2xl shadow-xl w-full h-auto object-cover border-4 border-white"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FeatureTabs;
