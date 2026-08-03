import type { Metadata, Viewport } from 'next';
import { Fraunces, Archivo, DM_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import DayNight from '@/components/DayNight';
import Grain from '@/components/ui/Grain';
import { venue } from '@/content/site';

const fraunces = Fraunces({
  subsets: ['latin-ext'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['SOFT', 'WONK', 'opsz'],
});

const archivo = Archivo({
  subsets: ['latin-ext'],
  display: 'swap',
  variable: '--font-archivo',
});

const dmMono = DM_Mono({
  subsets: ['latin-ext'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-dm-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.irishpubkaraka.hr'),
  title: {
    default: `${venue.fullName} — ${venue.tagline}`,
    template: `%s · ${venue.fullName}`,
  },
  description:
    'The oldest Irish pub in Dubrovnik. Guinness on draught, every match that matters, ' +
    'and a stone lane forty steps off the Stradun. Open 09:00 — 02:00.',
  keywords: [
    'Irish pub Dubrovnik',
    'Karaka',
    'Guinness Dubrovnik',
    'Old Town pub',
    'sports bar Dubrovnik',
    'Stradun',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: venue.fullName,
    title: `${venue.fullName} — ${venue.tagline}`,
    description:
      'Guinness on draught, every match that matters, and a stone lane forty steps off the Stradun.',
    images: [{ url: '/img/hero-lantern.webp', width: 800, height: 1201 }],
  },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#ede6d8',
  colorScheme: 'light',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BarOrPub',
  name: venue.fullName,
  description: venue.tagline,
  telephone: venue.phone,
  email: venue.email,
  url: 'https://www.irishpubkaraka.hr',
  address: {
    '@type': 'PostalAddress',
    streetAddress: venue.street,
    addressLocality: 'Dubrovnik',
    postalCode: '20000',
    addressCountry: 'HR',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 42.6415, longitude: 18.1094 },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '09:00',
      closes: '02:00',
    },
  ],
  sameAs: [venue.social.instagram, venue.social.facebook],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${archivo.variable} ${dmMono.variable}`}
    >
      <body>
        <SmoothScroll />
        <DayNight />
        {children}
        <Grain />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
