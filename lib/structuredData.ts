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
    jobTitle: "Electrical Engineering Student",
    description: site.description,
    knowsAbout: [
      "Electrical engineering",
      "PCB design",
      "Altium Designer",
      "Schematic capture",
      "Design rule checks",
      "I2C",
      "USB",
      "Telemetry",
      "Embedded systems",
      "Web development",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ottawa",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "University of Ottawa",
      sameAs: "https://www.uottawa.ca/",
    },
    memberOf: {
      "@type": "Organization",
      name: "uOttawa Supermileage",
      description: "Student team building a high-efficiency vehicle",
    },
    seeks: {
      "@type": "Demand",
      name: "Hardware internship, summer 2027 (4 months)",
    },
    sameAs: [site.linkedin, site.github, site.instagram],
    image: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#profile-photo`,
      url: absoluteUrl(site.profileImage),
      contentUrl: absoluteUrl(site.profileImage),
      caption: site.profileImageAlt,
      representativeOfPage: true,
    },
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: `${site.name}: ${site.tagline}`,
    alternateName: [
      site.name,
      "Rayann Sagnon Portfolio",
      "Rayann Sagnon Engineering Portfolio",
      site.portfolioHost,
    ],
    url: SITE_URL,
    description: site.description,
    about: { "@id": PERSON_ID },
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
    name: `${site.name}: About`,
    mainEntity: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    primaryImageOfPage: { "@id": `${SITE_URL}/#profile-photo` },
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

/** Home > section > page, so search results show where a page sits. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
