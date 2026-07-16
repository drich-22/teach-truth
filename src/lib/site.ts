export const siteConfig = {
  name: "Teach Truth",
  tagline: "Classroom-led public education reform",
  description:
    "Teach Truth is the education reform home of Ruth Lerno — a 25-year classroom teacher and host of Teacher Truth with Ruth. Teachers take the wheel so America's children get a system that finally serves them.",
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
