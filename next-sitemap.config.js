/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.averdi.no',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/team-demo', // Internal demo page
    '/kunnskapsbank/artikler/sosiookonomiske-forskjeller_Long', // Alternative version
    '/admin',
    '/admin/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/team-demo', '/api/', '/admin/'],
      },
    ],
    additionalSitemaps: [],
  },
  transform: async (config, path) => {
    // Custom priority for different page types
    let priority = config.priority;
    let changefreq = config.changefreq;

    // Homepage gets highest priority
    if (path === '/') {
      priority = 1.0;
      changefreq = 'weekly';
    }
    // Hub pages get high priority
    else if (path === '/kunnskapsbank' || 
             path === '/kunnskapsbank/sametinget' || 
             path === '/kunnskapsbank/bedrifter' ||
             path === '/kunnskapsbank/organisasjoner') {
      priority = 0.9;
      changefreq = 'weekly';
    }
    // Article and subpages
    else if (path.startsWith('/kunnskapsbank/')) {
      priority = 0.8;
      changefreq = 'monthly';
    }
    // Service pages
    else if (path.startsWith('/tjenester/')) {
      priority = 0.8;
      changefreq = 'monthly';
    }
    // About page
    else if (path === '/om-oss') {
      priority = 0.8;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
