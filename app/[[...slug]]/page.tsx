import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { LegacyPage } from "../components/legacy-page";

const routes: Record<string, { file: string; title: string }> = {
  "": { file: "index.html", title: "El-Goshen Development Foundation - Community Development NGO" },
  about: { file: "about.html", title: "About Us" },
  contact: { file: "contact.html", title: "Contact Us" },
  donation: { file: "donation.html", title: "Our Work" },
  feature: { file: "feature.html", title: "Our Impact" },
  team: { file: "team.html", title: "Leadership" },
  testimonial: { file: "testimonial.html", title: "Stories" },
  "404": { file: "404.html", title: "Page Not Found" },
};
const documentRoot = path.join(process.cwd(), "legacy-pages");
function toRoutePath(file: string): string { return file === "index.html" ? "/" : `/${file.replace(/\.html$/, "")}`; }
function prepareMarkup(document: string): string {
  const body = document.match(/<body[^>]*>([\s\S]*?)<script[\s\S]*?<\/body>/i)?.[1] ?? "";
  return body
    .replace(/ElGoshen<span class="text-dark">Foundation<\/span>/g, 'El-Goshen<span class="text-dark"> Development Foundation</span>')
    .replace(/ElGoshen<span>Foundation<\/span>/g, "El-Goshen<span> Development Foundation</span>")
    .replace(/ElGoshenFoundation/g, "El-Goshen Development Foundation")
    .replace(/ElGoshen Development Foundation/g, "El-Goshen Development Foundation")
    .replace(/(href|src)="(index|about|contact|donation|feature|team|testimonial|404)\.html"/g, (_, attribute, page) => `${attribute}="${toRoutePath(`${page}.html`)}"`)
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
