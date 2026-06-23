import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/paywall/', '/api/'],
      },
    ],
    sitemap: 'https://relancepro.fr/sitemap.xml',
    host: 'https://relancepro.fr',
  };
}
