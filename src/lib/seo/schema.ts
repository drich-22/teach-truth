import { faqs, pillars } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { mission, vision } from "@/lib/vision";

type JsonLd = Record<string, unknown>;

const orgId = `${siteConfig.url}/#organization`;
const personId = `${siteConfig.url}/#ruth-lerno`;
const websiteId = `${siteConfig.url}/#website`;
const podcastId = `${siteConfig.url}/#podcast`;

export function organizationSchema(): JsonLd {
  return {
    "@type": "Organization",
    "@id": orgId,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    slogan: vision.statement,
    knowsAbout: [
      "public education reform",
      "teacher retention",
      "classroom-led reform",
      vision.title,
      mission.title,
    ],
    logo: `${siteConfig.url}${siteConfig.founder.image}`,
    founder: { "@id": personId },
    sameAs: [...siteConfig.founder.sameAs],
    missionStatement: mission.statement,
  };
}

export function personSchema(): JsonLd {
  return {
    "@type": "Person",
    "@id": personId,
    name: siteConfig.founder.name,
    jobTitle: "Teacher and Education Reform Advocate",
    description: `Ruth Lerno is a ${siteConfig.founder.yearsInClassroom}-year classroom teacher and host of ${siteConfig.podcast.name}, working to reform public education so teachers and children are put first.`,
    image: `${siteConfig.url}${siteConfig.founder.image}`,
    url: `${siteConfig.url}/ruth`,
    worksFor: { "@id": orgId },
    sameAs: [...siteConfig.founder.sameAs],
    knowsAbout: [
      "public education reform",
      "teacher retention",
      "classroom instruction",
      "standardized testing",
      "special education",
    ],
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@id": orgId },
    inLanguage: "en-US",
  };
}

export function podcastSchema(): JsonLd {
  return {
    "@type": "PodcastSeries",
    "@id": podcastId,
    name: siteConfig.podcast.name,
    url: siteConfig.podcast.spotifyUrl,
    description:
      "A platform for teachers to tell their truth and help create a new educational system for all children.",
    author: { "@id": personId },
    webFeed: siteConfig.podcast.spotifyUrl,
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function faqSchema(): JsonLd {
  return {
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function speakableSchema(path: string): JsonLd {
  return {
    "@type": "WebPage",
    "@id": `${siteConfig.url}${path}#webpage`,
    url: `${siteConfig.url}${path}`,
    name:
      path === "/"
        ? `${siteConfig.name} — Education Reform`
        : `${siteConfig.founder.name} — Meet the Visionary | ${siteConfig.name}`,
    isPartOf: { "@id": websiteId },
    about: [{ "@id": orgId }, { "@id": personId }],
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".answer-lead", ".key-takeaways", ".faq-section"],
    },
    dateModified: new Date().toISOString().slice(0, 10),
  };
}

export function howToSchema(): JsonLd {
  return {
    "@type": "HowTo",
    name: "How classroom-led education reform works",
    description:
      "Five pillars for reforming American public education with teachers at the wheel and children at the center.",
    step: pillars.map((pillar, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: pillar.title,
      text: pillar.answer,
      url: `${siteConfig.url}/#pillar-${pillar.slug}`,
    })),
  };
}

export function homeGraph(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      personSchema(),
      websiteSchema(),
      podcastSchema(),
      speakableSchema("/"),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Education Reform", path: "/" },
      ]),
      faqSchema(),
      howToSchema(),
    ],
  };
}

export function ruthGraph(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      personSchema(),
      websiteSchema(),
      podcastSchema(),
      speakableSchema("/ruth"),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Ruth Lerno", path: "/ruth" },
      ]),
      {
        "@type": "ProfilePage",
        "@id": `${siteConfig.url}/ruth#profile`,
        url: `${siteConfig.url}/ruth`,
        name: `${siteConfig.founder.name} — Meet the Visionary`,
        mainEntity: { "@id": personId },
        isPartOf: { "@id": websiteId },
      },
    ],
  };
}
