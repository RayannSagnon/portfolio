import { site } from "@/content/site";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    givenName: "Rayann",
    familyName: "Sagnon",
    url: SITE_URL,
    email: `mailto:${site.email}`,
    jobTitle: "Electrical Engineering & Computing Technology Student",
    description: site.description,
    knowsAbout: [
      "Embedded systems",
      "Artificial intelligence",
      "Human-machine interaction",
      "Software engineering",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ottawa",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Ottawa",
      sameAs: "https://www.uottawa.ca/",
    },
    sameAs: [site.linkedin, site.github, site.instagram],
    image: absoluteUrl(site.profileImage),
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: `${site.name} — ${site.tagline}`,
    alternateName: site.name,
    url: SITE_URL,
    description: site.description,
    publisher: { "@id": PERSON_ID },
    inLanguage: ["en-CA", "fr-CA"],
  };
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${absoluteUrl("/about")}#profile`,
    url: absoluteUrl("/about"),
    name: `${site.name} — About`,
    mainEntity: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function siteGraphJsonLd() {
  const person = personJsonLd();
  const website = webSiteJsonLd();
  const { "@context": _personCtx, ...personNode } = person;
  const { "@context": _siteCtx, ...websiteNode } = website;

  return {
    "@context": "https://schema.org",
    "@graph": [personNode, websiteNode],
  };
}
