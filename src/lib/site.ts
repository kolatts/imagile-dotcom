// Single source of truth for site-wide identity, navigation, and contact info.
// Header, Footer, RSS, and JSON-LD all read from here so nav links and copy
// can't drift out of sync as pages get added.

export const site = {
  name: 'Imagile',
  url: 'https://www.imagile.dev',
  tagline: "We're an AI consulting firm. We teach it, we build with it, and we advise the people betting on it.",
  contactEmail: 'hello@imagile.dev',
  // TODO: set once a real scheduling link exists (Cal.com/Calendly). Until then,
  // every "book a call" CTA falls back to a prefilled mailto — see Button.astro.
  bookingUrl: null as string | null,
  beyondBoringUrl: 'https://www.beyond-boring.com',
  linkedInUrl: 'https://www.linkedin.com/in/kolatts/',
  rssUrl: '/rss.xml',
};

export interface NavLink {
  label: string;
  href: string;
}

export const primaryNav: NavLink[] = [
  { label: 'Services', href: '/services' },
  { label: 'Beyond Boring', href: '/beyond-boring' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export interface FooterGroup {
  heading: string;
  links: NavLink[];
}

export const footerGroups: FooterGroup[] = [
  {
    heading: 'Company',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Program',
    links: [{ label: 'Beyond Boring', href: '/beyond-boring' }],
  },
  {
    heading: 'Writing',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'RSS', href: site.rssUrl },
    ],
  },
];
