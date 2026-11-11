"use client";

import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { PagesCopy } from "@/lib/i18n/pages.en";
import { ContactSection, CV_FILE } from "./ContactSection";
import { PageFrame } from "./PageFrame";
import x from "./experience.module.css";

type Org = PagesCopy["experience"]["orgs"][number];
type Role = Org["roles"][number];

// Each hands-on skill gets its own picture: the real board and car, or the instrument drawn.
const TOOLS = ["altium", "solder", "scope", "arduino"] as const;

function ToolVisual({ tool }: { tool: (typeof TOOLS)[number] }) {
  if (tool === "altium" || tool === "arduino") {
    return (
      <div className={x.toolImage} aria-hidden="true">
        <Image src={tool === "altium" ? "/images/site/dashboard-pcb-layout.png" : "/images/kits/car-floor.jpg"} alt="" fill sizes="(max-width: 820px) 80vw, 50vw" quality={80} />
      </div>
    );
  }
  if (tool === "scope") {
    // An oscilloscope screen: the graticule and one clean sine.
    return (
      <svg className={x.toolDrawing} viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {Array.from({ length: 9 }, (_, k) => (
          <line key={`v${k}`} x1={k * 40} y1="0" x2={k * 40} y2="200" stroke="rgba(115,217,127,0.14)" />
        ))}
        {Array.from({ length: 6 }, (_, k) => (
          <line key={`h${k}`} x1="0" y1={k * 40} x2="320" y2={k * 40} stroke="rgba(115,217,127,0.14)" />
        ))}
        <path
          className={x.wave}
          d={`M0 100 ${Array.from({ length: 65 }, (_, k) => `L${k * 5} ${(100 - 52 * Math.sin((k * 5 * Math.PI) / 80)).toFixed(1)}`).join(" ")}`}
          fill="none"
          stroke="#73d97f"
          strokeWidth="2"
        />
      </svg>
    );
  }
  // Solder joints: four pads on green solder mask, each with its silver fillet.
  return (
    <svg className={x.toolDrawing} viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="320" height="200" fill="#123a1f" />
      <path d="M0 140 H320 M60 0 V200" stroke="#1d5a30" strokeWidth="10" fill="none" />
      {[70, 130, 190, 250].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="90" r="22" fill="#c9a24a" />
          <circle cx={cx} cy="90" r="15" fill="#d9dbde" />
          <circle cx={cx - 4} cy="85" r="5" fill="#f5f5f2" opacity="0.7" />
          <circle cx={cx} cy="90" r="3.5" fill="#6d6f73" />
        </g>
      ))}
    </svg>
  );
}

// On a phone, the two most recent places stay open; older ones open with a tap.
const OPEN_ON_PHONE = 2;

/** Jobs laid out the way LinkedIn does it, in the site's own world. */
export function ExperiencePage() {
  const { locale, ui } = useLocale();
  const e = ui.pages.experience;

  return (
    <PageFrame active="experience">
      <header className={x.head}>
        <h1 className={x.title}>{e.title}</h1>
        <div className={x.headSide}>
          <p>{e.intro}</p>
          <a className={x.cv} href={CV_FILE[locale].href} download={CV_FILE[locale].name}>
            {e.cv}
            <ArrowUpRight aria-hidden="true" strokeWidth={1.5} />
          </a>
        </div>
      </header>

      <ol className={x.orgs}>
        {e.orgs.map((org, i) => (
          <OrgEntry key={org.org + i} org={org} openOnPhone={i < OPEN_ON_PHONE} />
        ))}
      </ol>

      <section className={x.block} aria-labelledby="awards">
        <h2 id="awards" className={x.blockTitle} data-show>
          {e.awardsTitle}
        </h2>
        <div className={x.award} data-show>
          <div className={x.awardPhoto}>
            <Image src="/images/about/hackathon-winning-team.png" alt={e.award.alt} fill sizes="(max-width: 820px) 100vw, 360px" quality={85} />
          </div>
          <div>
            <h3>{e.award.title}</h3>
            <p>{e.award.meta}</p>
          </div>
        </div>
      </section>

      <section className={x.block} aria-labelledby="hands">
        <h2 id="hands" className={x.blockTitle} data-show>
          {e.handsTitle}
        </h2>
        <ul className={x.hands}>
          {e.hands.map(([skill, line, href], i) => (
            <li key={skill} className={x.tool} data-tool={TOOLS[i]} data-show>
              <ToolVisual tool={TOOLS[i]} />
              <div className={x.toolText}>
                <h3>{skill}</h3>
                <p>{line}</p>
                {href && (
                  <Link href={href}>
                    {ui.siteCopy.projectList.find((p) => p.href === href)?.name}
                    <ArrowRight aria-hidden="true" strokeWidth={1.5} />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${x.block} ${x.school}`} aria-labelledby="school">
        <h2 id="school" className={x.blockTitle} data-show>
          {e.schoolTitle}
        </h2>
        <div data-show>
          <h3>{e.school.title}</h3>
          <p>{e.school.body}</p>
        </div>
      </section>

      <section className={`${x.block} ${x.nextStep}`} aria-label={e.nextTitle}>
        <div>
          <h2>{e.nextTitle}</h2>
          <p>{e.nextMeta}</p>
        </div>
        <a className={x.cv} href={CV_FILE[locale].href} download={CV_FILE[locale].name}>
          {e.cv}
          <ArrowUpRight aria-hidden="true" strokeWidth={1.5} />
        </a>
      </section>

      <ContactSection className={x.contactBleed} />
    </PageFrame>
  );
}

function OrgEntry({ org, openOnPhone }: { org: Org; openOnPhone: boolean }) {
  const { ui } = useLocale();
  const e = ui.pages.experience;
  const [open, setOpen] = useState(openOnPhone);
  const grouped = org.roles.length > 1;
  const id = `org-${org.org.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <li className={x.org} data-show data-open={open || undefined}>
      <span className={x.tile} aria-hidden="true">
        {org.logo}
      </span>
      <div className={x.orgBody}>
        {grouped ? (
          <>
            <h2 className={x.orgName}>{org.org}</h2>
            {"meta" in org && org.meta && <p className={x.muted}>{org.meta}</p>}
          </>
        ) : null}
        <button type="button" className={x.more} aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
          {open ? e.showLess : e.showMore}
          <ChevronDown aria-hidden="true" strokeWidth={1.5} />
        </button>
        <div id={id} className={grouped ? x.group : undefined}>
          {org.roles.map((role) => (
            <RoleEntry key={role.title} role={role} grouped={grouped} />
          ))}
        </div>
      </div>
    </li>
  );
}

function RoleEntry({ role, grouped }: { role: Role; grouped: boolean }) {
  const { ui } = useLocale();
  const e = ui.pages.experience;
  const Title = grouped ? "h3" : "h2";
  return (
    <div className={x.role}>
      <Title className={x.roleTitle}>{role.title}</Title>
      {"org" in role && role.org && <p className={x.roleOrg}>{role.org}</p>}
      <p className={x.muted}>{role.when}</p>
      <p className={x.muted}>{role.where}</p>
      <div className={x.detail}>
        {role.body.length > 1 ? (
          <>
            <p>{role.body[0]}</p>
            <ul>
              {role.body.slice(1).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>{role.body[0]}</p>
        )}
        {"media" in role && role.media && (
          <div className={x.media}>
            {role.media.map((m) => (
              <Link key={m.href} href={m.href} className={x.mediaCard}>
                <span className={x.mediaThumb}>
                  <Image src={m.image} alt="" fill sizes="120px" quality={80} />
                </span>
                <span>
                  <b>{m.title}</b>
                  <span>{m.meta}</span>
                </span>
              </Link>
            ))}
          </div>
        )}
        {"skills" in role && role.skills && (
          <p className={x.skills}>
            <span>{e.skillsLabel}</span> {role.skills}
          </p>
        )}
      </div>
    </div>
  );
}
