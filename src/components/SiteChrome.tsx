import Link from "next/link";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "/", label: "Reform" },
  { href: "/reality", label: "Reality" },
  { href: "/ruth", label: "Ruth" },
  { href: "/join", label: "Act" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ash bg-blank/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 md:px-8">
        <Link
          href="/"
          className="font-display text-lg font-extrabold tracking-tight text-press md:text-xl"
        >
          {siteConfig.name}
        </Link>
        <nav
          aria-label="Primary"
          className="flex items-center gap-4 text-sm font-medium text-press md:gap-6"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-opacity hover:opacity-60"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href={siteConfig.podcast.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-steel transition-colors hover:text-press"
          >
            Podcast
          </Link>
          <Link href="/join" className="btn-primary !py-2.5 !px-4 text-sm">
            Take action
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-press text-fog">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-20 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-display text-3xl font-extrabold tracking-tight text-balance md:text-4xl">
            Build what children deserve.
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate">
            {siteConfig.name} — classroom-led public education reform with{" "}
            {siteConfig.founder.name}.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">
            Navigate
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:opacity-70">
                Education Reform
              </Link>
            </li>
            <li>
              <Link href="/reality" className="hover:opacity-70">
                Classroom Reality
              </Link>
            </li>
            <li>
              <Link href="/ruth" className="hover:opacity-70">
                Meet Ruth
              </Link>
            </li>
            <li>
              <Link href="/#the-plan" className="hover:opacity-70">
                The Plan
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:opacity-70">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/join" className="hover:opacity-70">
                Take the Wheel
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">
            Listen
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={siteConfig.podcast.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70"
              >
                {siteConfig.podcast.name} on Spotify
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-5 py-6 text-xs text-slate md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Truth from the
            classroom.
          </p>
          <p>Hosted by {siteConfig.founder.name}.</p>
        </div>
      </div>
    </footer>
  );
}
