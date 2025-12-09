export interface FeatureTabItem {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  benefits: string[];
  imageSrc: string;
  contentLink?: {
    url: string;
    text: string;
  };
}

export interface FeatureTabsData {
  title: string;
  introText: string;
  features: FeatureTabItem[];
}
