import { site } from "@/content/site";
import { pagesEn } from "@/lib/i18n/pages.en";
import { siteEn } from "@/lib/i18n/site.en";
import { absoluteUrl } from "@/lib/seo";

/**
 * A plain-text summary for AI assistants and answer engines (llmstxt.org), built from the same copy as the pages
 * so it never drifts from what the site says.
 */
export function GET() {
  const t = pagesEn.stories.telemetry;
  const exp = pagesEn.experience;
  const line = (s: string) => s.replace(/\s+/g, " ").trim();
  const roles = exp.orgs.flatMap((org) =>
    org.roles.map((r) => `- ${r.title}, ${"org" in r && r.org ? r.org : org.org} (${r.when}, ${r.where}): ${line(r.body.join(" "))}`),
  );
  const projects = siteEn.projectList.map((p) => `- [${p.name}](${absoluteUrl(p.href)}): ${p.type}. ${p.status}.`);

  const body = `# ${site.name}

> Electrical Engineering student at the University of Ottawa (Ottawa, Canada). Designs PCBs in Altium Designer for uOttawa Supermileage, the university's high-efficiency vehicle team. Looking for a hardware internship for summer 2027 (4 months).

## Key facts

- Studies: ${exp.school.title}. ${line(exp.school.body)}
- Team: electrical team member (telemetry) at uOttawa Supermileage since September 2026.
- Main project: the Telemetry V2 Sensor Board. ${line(pagesEn.home.proofLine)}
- Status of the boards: designed, not fabricated or tested yet. No test results are claimed.
- Tools: Altium Designer, Altium 365, soldering, oscilloscope, Arduino.
- Languages: English and French (the site is bilingual).
- Contact: ${site.email}, ${site.linkedin}

## Projects

${projects.join("\n")}

## Telemetry V2 Sensor Board, in numbers

${t.numbers.map(([k, v]) => `- ${k}: ${v}`).join("\n")}

## Experience

${roles.join("\n")}

## Award

- ${exp.award.title}: ${exp.award.meta}.

## Pages

- [Home](${absoluteUrl("/")}): the telemetry board, every project, contact.
- [Experience](${absoluteUrl("/experience")}): jobs, hands-on skills, school, CV.
- [About](${absoluteUrl("/about")}): background, from Ouagadougou to Ottawa, and why electrical engineering.
- [CV (PDF, English)](${absoluteUrl("/documents/rayann-sagnon-cv-en.pdf")})
- [CV (PDF, French)](${absoluteUrl("/documents/rayann-sagnon-cv-fr.pdf")})
- [Telemetry V2 schematic (PDF)](${absoluteUrl("/documents/telemetry-v2-schematic.pdf")})
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
