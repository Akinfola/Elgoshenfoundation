import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { LegacyPage } from "../components/legacy-page";

const canonicalRoutes: Record<string, { file: string; title: string }> = {
  "": { file: "index.html", title: "El-Goshen Development Foundation - Community Development NGO" },
  "about-us": { file: "about.html", title: "About Us | El-Goshen Foundation" },
  contact: { file: "contact.html", title: "Contact Us | El-Goshen Foundation" },
  "partner-support": { file: "donation.html", title: "Partner & Support | El-Goshen Foundation" },
  "our-programmes": { file: "feature.html", title: "Our Programmes | El-Goshen Foundation" },
  events: { file: "events.html", title: "Events | El-Goshen Foundation" },
  "videos-and-photos": { file: "media.html", title: "Videos & Photos | El-Goshen Foundation" },
  leadership: { file: "team.html", title: "Leadership & Governance | El-Goshen Foundation" },
  "outreach-blog": { file: "blog.html", title: "Outreach Blog & News | El-Goshen Foundation" },
  "community-stories": { file: "testimonial.html", title: "Community Stories | El-Goshen Foundation" },
  "not-found": { file: "404.html", title: "Page Not Found" },
};
const legacyRouteAliases: Record<string, string> = {
  about: "about-us",
  donation: "partner-support",
  feature: "our-programmes",
  media: "videos-and-photos",
  team: "leadership",
  blog: "outreach-blog",
  testimonial: "community-stories",
  "404": "not-found",
};
const routes: Record<string, { file: string; title: string }> = {
  ...canonicalRoutes,
  ...Object.fromEntries(Object.entries(legacyRouteAliases).map(([alias, canonical]) => [alias, canonicalRoutes[canonical]])),
};
const canonicalPathsByFile = Object.fromEntries(
  Object.entries(canonicalRoutes).map(([slug, route]) => [route.file, slug ? `/${slug}` : "/"]),
);
const documentRoot = process.cwd();
function toRoutePath(file: string): string { return canonicalPathsByFile[file] ?? `/${file.replace(/\.html$/, "")}`; }
function prepareMarkup(document: string): string {
  const body = document.match(/<body[^>]*>([\s\S]*?)<script[\s\S]*?<\/body>/i)?.[1] ?? "";
  return body
    .replace(/ElGoshen<span class="text-dark">Foundation<\/span>/g, 'El-Goshen<span class="text-dark"> Development Foundation</span>')
    .replace(/ElGoshen<span>Foundation<\/span>/g, "El-Goshen<span> Development Foundation</span>")
    .replace(/ElGoshenFoundation/g, "El-Goshen Development Foundation")
    .replace(/ElGoshen Development Foundation/g, "El-Goshen Development Foundation")
    .replace(/(href|src)="(index|about|contact|donation|feature|events|media|team|blog|testimonial|404)\.html([^\"]*)"/g, (_, attribute, page, suffix) => `${attribute}="${toRoutePath(`${page}.html`)}${suffix}"`)
    .replace(/(href|src)="(img|css|js|lib|data|admin)\//g, '$1="/$2/');
}
export function generateStaticParams() { return Object.keys(routes).filter(Boolean).map((route) => ({ slug: [route] })); }
export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const route = routes[(slug ?? []).join("/")];
  return { title: route?.title ?? "Page Not Found" };
}
export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const route = routes[(slug ?? []).join("/")];
  if (!route) notFound();
  const document = await readFile(path.join(documentRoot, route.file), "utf8");
  return <LegacyPage key={route.file} html={prepareMarkup(document)} />;
}
