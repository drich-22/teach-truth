export const siteConfig = {
  name: "Teach Truth",
  tagline: "Educational · Teacher-Driven · Reform",
  description:
    "Teach Truth carries Ruth Lerno’s Save USA Public Education plan — teacher-driven reform to slow down for mastery, rebuild national leadership around educators, and protect America’s children.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://teachtruth.org",
  podcast: {
    name: "Teacher Truth with Ruth",
    spotifyUrl: "https://open.spotify.com/show/09WdX699yPPAGYnx1zkF38",
    spotifyEmbed:
      "https://open.spotify.com/embed/show/09WdX699yPPAGYnx1zkF38?utm_source=generator",
  },
  founder: {
    name: "Ruth Lerno",
    role: "Teacher · Reformer · Host of Teacher Truth with Ruth",
    yearsInClassroom: 25,
    image: "/images/ruth-podcast-cover.jpg",
    sameAs: ["https://open.spotify.com/show/09WdX699yPPAGYnx1zkF38"],
  },
} as const;
