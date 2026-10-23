---
name: Rayann Sagnon
description: Race Livery & Scrutineering. The portfolio as the side panel of a student race car.
colors:
  garnet: "#8f001a"
  garnet-deep: "#6d0014"
  ink: "#111111"
  ink-soft: "#2b2b2b"
  pending: "#55585a"
  shell: "#f5f5f2"
  shell-hi: "#ffffff"
  rule: "rgba(17, 17, 17, 0.14)"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(4.5rem, 13.5vw, 13rem)"
    fontWeight: 900
    lineHeight: 0.84
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 62"
  display-close:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(3rem, 8vw, 7.5rem)"
    fontWeight: 900
    lineHeight: 0.88
    fontVariation: "'wdth' 64"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 5.4vw, 4.75rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 66"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.65rem"
    fontWeight: 900
    lineHeight: 1
    fontVariation: "'wdth' 70"
  lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.35rem, 2vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label-stamp:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.04em"
    fontVariation: "'wdth' 75"
  label-nav:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 700
    letterSpacing: "0.04em"
    fontVariation: "'wdth' 85"
rounded:
  box: "2px"
  stamp: "3px"
  plate: "4px"
  sticker: "6px"
  roundel: "50%"
spacing:
  gutter: "clamp(16px, 4.4vw, 64px)"
  section: "clamp(48px, 7vw, 100px)"
  container: "1240px"
  sheet: "300px"
  stack-sm: "14px"
  stack-md: "24px"
  stack-lg: "36px"
  touch: "44px"
components:
  pit-board:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.shell-hi}"
    typography: "{typography.title}"
    rounded: "{rounded.plate}"
    padding: "18px 24px"
  pit-board-edge:
    backgroundColor: "{colors.garnet}"
    textColor: "{colors.shell-hi}"
    width: "64px"
  pit-board-edge-hover:
    backgroundColor: "{colors.garnet-deep}"
  sticker:
    backgroundColor: "{colors.shell-hi}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sticker}"
    padding: "14px 16px 16px"
  stamp-kit:
    backgroundColor: "{colors.shell-hi}"
    textColor: "{colors.ink}"
    typography: "{typography.label-stamp}"
    rounded: "{rounded.stamp}"
    padding: "0.12em 0.5em 0.1em"
  stamp-pending:
    backgroundColor: "{colors.shell-hi}"
    textColor: "{colors.pending}"
    typography: "{typography.label-stamp}"
    rounded: "{rounded.stamp}"
  stamp-delivered:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.shell-hi}"
    typography: "{typography.label-stamp}"
    rounded: "{rounded.stamp}"
  spec-plate:
    backgroundColor: "{colors.shell-hi}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "12px 16px"
  lang-toggle:
    backgroundColor: "{colors.shell}"
    textColor: "{colors.pending}"
    typography: "{typography.label-nav}"
    rounded: "{rounded.sticker}"
    height: "44px"
  lang-toggle-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.shell-hi}"
  text-link:
    textColor: "{colors.ink}"
    height: "44px"
  licence-card:
    backgroundColor: "{colors.shell-hi}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sticker}"
    padding: "22px"
  licence-header:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.shell-hi}"
    typography: "{typography.label-nav}"
    padding: "12px 20px"
  licence-seal:
    backgroundColor: "{colors.shell-hi}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.roundel}"
    width: "64px"
  skill-plate-row:
    backgroundColor: "{colors.shell-hi}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "14px 18px"
  course-plate:
    backgroundColor: "{colors.shell-hi}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "18px"
  route-photo:
    backgroundColor: "{colors.shell-hi}"
    rounded: "{rounded.sticker}"
  place-caption:
    backgroundColor: "{colors.shell-hi}"
    textColor: "{colors.ink}"
    rounded: "{rounded.stamp}"
    padding: "4px 8px"
  log-row:
    backgroundColor: "{colors.shell-hi}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "22px 24px"
  why-chip:
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.stamp}"
    padding: "6px 10px"
  phase-plate:
    backgroundColor: "{colors.shell-hi}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "18px 16px 20px"
  decision-row:
    backgroundColor: "{colors.shell-hi}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "18px 20px"
  pending-slot:
    backgroundColor: "{colors.shell}"
    textColor: "{colors.pending}"
    rounded: "{rounded.plate}"
    padding: "32px"
---

# Design System: Rayann Sagnon

## Overview

**Creative North Star: "The Scrutineered Side Panel"**

The site is the side panel of a student race car on inspection day. The name is the livery, painted huge in heavy condensed italic caps across a raked garnet stripe. The work is the scrutineering stickers stuck to the shell: white stock, thick black border, each carrying one stamped status from a closed vocabulary. Nothing is a card in a grid; everything is a decal, a plate or a stamp applied to a white gel-coat surface.

The system is one font (Archivo, variable on the width axis) pushed from 62% to 85% width, four inks with one law each, and a small kit of physical artifacts: stripe, pinstripe, roundel, sticker, stamp, plate, pit-board. Density is low and loud: few elements, very large type, generous air between sections, each section break a raked ink pinstripe.

Honesty is visual here, not just verbal. A status is shown by the form of its mark (dashed, solid, outlined), so the page cannot imply progress it has not made.

This world covers the homepage (`app/page.tsx`), `/about` and the case study `/projects/standout`, all built from `components/livery/` (shared shell in `LiveryShell.tsx`, homepage styles in `LiveryHome.module.css`, inner-page styles in `LiveryPages.module.css`). The remaining legacy routes run on the old dark theme in `styles/tokens.css` and `app/globals.css`: `/projects/signs` and `/projects/studentos` (currently redirected to the homepage, as is `/archive`) and not-found. That theme is legacy, pending migration into this world, and is not part of this system. Do not extend it.

**Key Characteristics:**
- White gel-coat shell ground, black fact ink, garnet for livery and action, grey for pending.
- Archivo only, width axis as the expressive dial: heavy italic condensed caps for livery, upright medium widths for body.
- Rotation as material: stripe and pinstripes raked at -1.5deg to -4deg, stickers set slightly off square.
- Statuses from a closed stamp vocabulary, encoded by border style rather than hue.
- One action, the pit-board, repeated in the hero and the close.

## Colors

A white race shell with black fact ink and one saturated garnet that is reserved for the livery and for action.

### Primary
- **uOttawa Garnet** (garnet): the livery stripe behind the second word of the name (homepage and case-study name), the inner-page hero stripe on /about, the closing stripe, the pit-board's arrow edge, focus rings, highlighted-sticker outlines, the underline of text links, and text selection. It marks livery and action, never status or decoration.
- **Garnet Deep** (garnet-deep): hover state of the pit-board's arrow edge only.

### Neutral
- **Fact Ink** (ink): headings, the name, sticker and plate borders, pinstripes, the pit-board panel, the delivered stamp fill, the active language toggle, the licence card's header band.
- **Soft Ink** (ink-soft): body paragraphs, the top-bar team line, kit detail text, plate-row descriptions, why chips.
- **Pending Grey** (pending): anything not yet reached: pending stamps (dashed), unreached inspection stations, spec-plate labels, the reserved image slot, inactive language. Also the plain grey labels of plates: licence field labels, skill levels, course school and status, logbook categories, phase ordinals, plate labels. Set at #55585a for legibility on the shell (about 6.6:1); the direction contract's lighter #9a9c9e failed AA and was not shipped.
- **Gel-coat Shell** (shell): page ground.
- **Gel-coat Highlight** (shell-hi): sticker, plate, roundel and stamp stock; the hero's radial sheen (`radial-gradient(90% 80% at 28% 10%, shell-hi, shell 70%)`).
- **Hairline Rule** (rule): internal dividers inside plates (spec rows, station columns, skill, log, phase and decision rows, licence fields), the stamp key's plate border, and the solid 1.5px border of why chips and document-kind tags.

### Content colours (tachometer demo only)
- **LED green #2fb24c, amber #f2a900, red #e0282e**, with lighter centres (#b8f5c4, #ffe7a6, #ffc2c4) and unlit #2b2b2b / #3a3a3a: the shift-light LEDs inside the tachometer demo. They depict the hardware's real LEDs, so they are content, not livery. They never appear outside the demo's ink dash.

### Named Rules
**The One Color One Law Rule.** Garnet means livery or action, ink means fact, grey means pending. A color never borrows another's job: no garnet status, no grey heading.

**The Garnet Reserve Rule.** Garnet appears as two stripes (hero, close) and on interactive affordances. Section breaks are ink, not garnet.

## Typography

**Display Font:** Archivo (variable, `wdth` axis), loaded via next/font as `--font-archivo`, fallback system-ui, sans-serif
**Body Font:** Archivo at default width
**Label Font:** Archivo at 75% to 85% width

**Character:** One family carries everything. Width is the voice: compressed to 62% and slanted for livery that reads like paint on a body panel, opened back up for plain, readable facts. The build sets width with `font-stretch` percentages; the token `fontVariation` mirrors those values.

### Hierarchy
- **Display** (900 italic, uppercase, 62% width, clamp(4.5rem, 13.5vw, 13rem), line-height 0.84): the name only, rotated -4deg from its left edge. Rises to 19vw at tablet and 27vw on phones. The case study's project name (Standout Studio) uses the same role and stripe treatment.
- **Display Close** (900 italic, uppercase, 64% width, clamp(3rem, 8vw, 7.5rem), line-height 0.88, max 14ch): the closing call under the second stripe.
- **Headline** (900 italic, uppercase, 66% width, clamp(2.4rem, 5.4vw, 4.75rem), line-height 0.92): section headings, balanced wrap; the quiet close's heading. The licence card's name uses this size at 62% width, line-height 0.86.
- **Title** (900 italic, uppercase, 70% width, 1.65rem, line-height 1): sticker names, the roundel's RS mark (at its own size), the pit-board label (72% width, clamp(1.3rem, 2vw, 1.8rem)), city names on the route decal. On inner pages: sub-headings, the licence seal, course names, route-step titles (68% width, line-height 0.95), logbook titles, phase titles, decision labels.
- **Lead** (700, clamp(1.35rem, 2vw, 2rem), line-height 1.25, max 30ch): the single identity line under the hero stripe. Inner-page heroes run it at line-height 1.3, max 34ch.
- **Body** (400, 1.125rem, line-height 1.6, max 62ch, ink-soft): section prose. Closing prose runs 1.2rem / 1.55 at 48ch.
- **Label** (700 to 800, uppercase, 75% to 85% width, 0.85rem to 1rem, letter-spacing 0.03em to 0.04em): stamps, nav, spec labels, station names, text links. Inner pages hold labels at 0.9rem (licence header and fields, skill levels, course school, log categories, phase ordinals, plate labels, place captions); logbook dates run 1rem with tabular numerals.

### Named Rules
**The Width Dial Rule.** Hierarchy is set by width and slant before size: livery is italic and narrow (62% to 72%), labels are upright and semi-narrow (75% to 85%), prose is upright at full width. Never italicize body copy.

**The Hand-set Brand Rule.** Brand names keep their own casing where they are set in mixed case (the top-bar team line: uOttawa, uOSupermileage). Uppercase transforms belong to livery and labels.

### Known drift
The homepage stylesheet sets several label sizes off the documented ramp (0.8rem, 0.85rem, 0.95rem, 1.05rem, 1.15rem, and similar one-offs). They are recorded as drift, not as ramp steps; new surfaces should use the label-stamp (1rem) and label-nav (0.9rem) tokens.

## Layout

A full-viewport hero laid out as a side panel: a two-column grid (fluid content, fixed 300px sheet column) with the name spanning both columns, the identity line beneath, and the pit-board pinned bottom right. The stickers sheet floats at the top right of the panel, absolutely positioned 120px from the top.

Below the hero, sections sit in a 1240px container with `gutter` side padding and `section` vertical padding. Content sections use an asymmetric two-column split (1.05fr / 0.95fr, gap clamp(32px, 5vw, 80px)): prose and spec on the left, a decal or plate on the right. Sections are separated by a raked ink pinstripe in a block clamp(56px, 7vw, 96px) tall.

The close runs full bleed with large top padding (clamp(150px, 18vw, 230px)) so the second garnet stripe has room above the heading.

Inner pages open with a page hero: a 1320px, two-column grid (1.15fr / 0.85fr, gap clamp(32px, 5vw, 80px)) under clamp(110px, 14vh, 150px) of top padding. On /about a full-bleed garnet stripe runs behind it at 22% height and the lead object (the licence card) sits left with the lead line and actions bottom-aligned right, so the stripe passes above the copy, never behind it. On the case study the project name carries its own stripe on its second word and the delivered decal sits right. Inner sections reuse the 1240px container and the 1.05fr / 0.95fr split; narrow sections cap their content at 820px on the same left axis. Every inner section is separated by the same ink pinstripe.

Route steps sit three across; each step spans three rows of a shared subgrid (image band, title, body, 14px row gap), so every image, title and body starts on the same line regardless of text length. The process plate runs four columns.

Responsive: at 1000px and below the hero becomes a single column, the action moves before the sheet (pit-board full width, then stickers), the roundel shrinks and moves to the top right, and the team line is hidden. Inner page heroes and splits collapse to one column, phases go two by two, and decision rows stack. At 860px route steps and logbook rows stack, with the log date and category side by side. At 560px and below the stickers compact to single inspection lines (name and stamp inline), stations go two by two, kit stickers stack, spec rows stack, and the closing pit-board goes full width; the licence body stacks with its photo at 4:3, phases and pending slots go single column. Every interactive target is at least 44px tall. Safe-area insets pad the top bar and footer.

## Elevation & Depth

Mostly flat, with physical lift only on objects that are stuck to the shell. Stickers, the roundel and the pit-board carry a soft two-part shadow (a 1 to 2px contact edge plus a wide, low-opacity blur) so they read as applied decals. Plates (spec, stations, route, key) sit flush with no shadow. Depth also comes from the hero's radial sheen and from overlap: stickers and the roundel overlap the stripe. On inner pages the licence card and the route photos are stuck-on objects and lift; skill, course, log, phase and decision plates sit flush.

### Shadow Vocabulary
- **Decal lift** (`box-shadow: 0 1px 0 rgba(0,0,0,0.08), 0 10px 22px rgba(0,0,0,0.08)`): every sticker.
- **Photo lift** (`box-shadow: 0 1px 0 rgba(0,0,0,0.08), 0 12px 26px rgba(0,0,0,0.1)`): route-step photos.
- **Roundel lift** (`box-shadow: 0 2px 0 rgba(0,0,0,0.06), 0 14px 30px rgba(0,0,0,0.1)`): the number roundel.
- **Licence lift** (`box-shadow: 0 2px 0 rgba(0,0,0,0.08), 0 22px 44px rgba(0,0,0,0.14)`): the licence card on /about.
- **Pit-board lift** (`box-shadow: 0 2px 0 rgba(0,0,0,0.1), 0 16px 34px rgba(0,0,0,0.16)`): the action panel, the most lifted object on the page.

### Named Rules
**The Stuck-On Rule.** Only things applied to the shell (stickers, roundel, pit-board, licence card, route photos) lift. Plates that belong to the panel stay flat.

## Shapes

Small, deliberate radii on thick borders: the language of vinyl decals and aluminium plates, not of UI cards. Radius steps by object: inspection box 2px, stamp 3px, plates and the pit-board 4px, stickers, the route decal, the stamp key and the language toggle 6px, the roundel a full circle. On inner pages: the licence card and route photos 6px, the licence photo and every plate 4px, place captions, why chips and document-kind tags 3px, the licence seal a full circle.

Borders are heavy and black: stickers and the route decal 3px, plates and the language toggle 2px, stamps 2.5px, the roundel clamp(7px, 0.8vw, 12px). The licence card and route photos take 3px, the licence photo 2px, the seal 5px, place captions 1.5px ink. Why chips and document-kind tags take a solid 1.5px hairline in the rule color; dashed borders stay reserved for pending. Internal dividers are 1px hairlines in the rule color.

Rotation is part of the form. The hero stripe and the closing stripe rake at -4deg, section pinstripes and the route line at -1.5deg, stamps at -3deg, and stickers sit between -1.4deg and +1.2deg so they look hand-applied. The licence card sits at -1deg, its seal at -8deg; route photos alternate -0.8deg and +0.8deg with captions at -0.8deg. The garnet stripe always carries a thin ink pinstripe below it (in the hero and the case-study name, a pseudo-element 0.045em tall; at the close and on the /about page-hero stripe, an ink band offset under the stripe). Stripes bleed past the viewport edge and are clipped.

The reserved image slot is a dashed pending-grey frame over a faint 45deg hatch, at 4:3: an honest placeholder for an asset that does not exist yet.

## Components

### Pit-board (the one action)
Black panel, garnet edge: the only primary action, used for Connect on LinkedIn in the hero and the close, and in the /about page hero's lead actions.
- **Shape:** 4px radius, overflow clipped.
- **Default:** ink panel with the label in Title style (white), then a 64px garnet edge holding a 28px SVG arrow.
- **Hover / Active:** panel lifts 2px, the edge deepens to garnet-deep, the arrow slides 4px right; active returns to rest. 220ms on the house ease-out.
- **Responsive:** full width at 1000px and below (hero) and at 560px and below (close).

### Text link (secondary action)
- **Style:** uppercase label (800, 80% width, 1.05rem, 0.03em), ink text, 2px garnet underline offset 6px, trailing SVG arrow, min height 44px.
- **Hover:** arrow slides 4px right.
- **Back variant:** a link that returns (the case study's "Back to the work") carries the arrow leading, pointing left; the arrow is the same 2.5px square-capped stroke mirrored.

### Scrutineering sticker (signature)
White stock, 3px ink border, 6px radius, decal lift, padding 14px 16px 16px, set slightly off square. Holds a Title-style name and exactly one stamp; may hold facts (kit detail, added work) between them. The Standout decal is the same sticker scaled up (24px padding, larger name); the case study reuses it in its hero with the Delivered stamp. On phones the hero stickers compact to one line.

### Stamp (closed vocabulary)
Uppercase label in a 2.5px bordered box, 3px radius, rotated -3deg. The vocabulary is closed: In design, In fab, Testing, Delivered, Kit (FR: En conception, En fabrication, En test, Livré, Kit). State is shown by mark, not hue:
- **Pending** (design, fab, test): dashed pending-grey border, grey text.
- **Delivered:** solid ink fill, white text.
- **Kit:** plain ink outline on white.

### Stamp key
A flat plate (white, 1.5px rule border, 6px radius, 12px padding) listing only stamps in use, as toggle buttons. Hovering, focusing or pinning a stamp outlines every element carrying it in 3px garnet and dims the rest to 32% opacity (180ms).

### Inspection stations
A flat plate of four fixed stations (design, fab, test, delivered), divided by hairlines. Each has a 22px checkbox square. Unreached stations are grey; the current station gets a 3px ink box and ink name, and its stamp. The current box is outlined, never ticked.

### Spec plate
Flat white plate, 2px ink border, 4px radius; rows of label (grey uppercase, 75% width) and value (600, 1rem) on a 110px / 1fr grid, hairline-separated. The case study reuses it for "My part."

### Number roundel
A white circle with a heavy ink ring and the RS mark in italic livery type, linking home. It carries the RS mark because there is no real race number; do not invent one.

### Licence card (/about lead object)
A stuck-on card: white stock, 3px ink border, 6px radius, licence lift, rotated -1deg, overflow clipped.
- **Header band:** full-width ink band (12px 20px) with the card title left and the team line right in white labels (800, 80% width, 0.9rem); the team line keeps its own casing.
- **Body:** 22px padding, photo column (min 150px, 0.8fr) beside the facts (1.2fr), gap 24px. The photo sits in a 2px ink, 4px radius frame, cropped to cover.
- **Facts:** the name in two stacked lines (Headline size, 62% width), then a field list of grey label (96px column) and value (650, 1rem) rows separated by hairlines.
- **Seal:** a 64px white circle with a 5px ink ring and RS in Title type, rotated -8deg, top right of the body. No lift; it is printed on the card.
- **Phone:** body stacks, photo becomes 4:3, seal shrinks to 56px.

### Skill plate
Flat plate (2px ink, 4px radius), one row per skill on a 1fr / auto grid, 14px 18px padding, hairline-separated. Skill name (800, 1.125rem) left; an honest level (Hands-on, Projects, Learning, Work experience) as a plain grey label right-aligned; where it was used on a full-width line below in soft ink. The level is a label, not a stamp.

### Course plate
Flat plate (2px ink, 4px radius, 18px padding) per course: name in Title type, then school and status on one grey label line ("University of Ottawa · In progress, fall 2026"), then topics in soft ink. Course status is a plain label, outside the stamp vocabulary.

### Route steps
Three steps across, each spanning a shared subgrid so the image band, title and body align. The image band is a 4:3 photo in a 3px ink, 6px radius frame with photo lift, rotated ±0.8deg. The place rides on the image as a caption strip (white, 1.5px ink border, 3px radius, 4px 8px, 0.9rem ink label, -0.8deg) at bottom left, moved to the top where the photo carries its own mark at the bottom. The place never sits above the heading. Title in Title type at 68% width, body in Body.

### Logbook plate
One flat ruled plate (2px ink, 4px radius); each entry is a row on a 150px / 1fr grid, 22px 24px padding, hairline-separated.
- **When column:** the date (800, 80% width, 1rem, tabular numerals) over a plain grey category label (Work, Volunteer, Leadership, Student). The category is a label, not a stamp: stamps belong to the closed status vocabulary.
- **Main column:** title in Title type, organization (700), summary (soft ink, 68ch), skills as a grey dotted list, then document links as text links with a small solid-hairline kind tag (PDF, Image).
- **Also row:** the last row folds the remaining entries: grey "Also" label in the when column, then a list of bold title, organization and grey date label.
- **Narrow:** at 860px the row stacks, date and category side by side.

### Why chips
A flat plate (2px ink, 4px radius, 22px padding) headed by a grey plate label, holding a wrap of chips: 6px 10px, solid 1.5px rule-colored border, 3px radius, 700 at 85% width, soft ink. Solid hairline, never dashed: they are facts, not pending items.

### Process phase plate
A flat four-column plate (2px ink, 4px radius), hairline-separated, one phase per column: a grey ordinal (01 to 04, 800, 75% width, tabular), the phase title in Title type, then a short soft-ink body. It records a delivered project's process, so it carries no inspection boxes and no stamps. Two by two at 1000px, single column at 560px.

### Decision plate
Decisions hold no status, so they are plate rows, not stickers: a flat plate (2px ink, 4px radius) with rows on a minmax(200px, 0.6fr) / 1.4fr grid, 18px 20px padding, hairline-separated; the decision in Title type left, its reasoning in soft ink right. Rows stack at 1000px.

### Pending slot
The reserved image slot used as a labelled placeholder: dashed 2px pending-grey frame over the 45deg hatch, 4:3, 4px radius, 32px padding, with a centered grey caption naming exactly what is missing ("Client 1: name and screenshot pending"). Set two across, single column on phones.

### Close
Every livery page ends on `LiveryClose`: heading, body, then the pit-board, optional extra links, and the email text link. Three uses:
- **Full close (homepage):** the garnet stripe returns full bleed above a Display Close heading.
- **Availability close (/about):** the same full close with the stripe, its heading and body stating availability, and the CV link among the actions.
- **Quiet close (case studies):** no returning stripe; a section pinstripe precedes it, it sits in the 1240px container, and the heading drops to Headline size. Actions are the pit-board, a back link with a left arrow to the work, and email.

### Tachometer demo (homepage bench)
A live plate (2px ink, 4px radius, white) between the inspection stations and the pending slot: label and an `n / 5` readout, an ink dash holding the board's 5 LEDs (3 green, 1 amber, 1 red) that light left to right with engine speed, a range control (ink track filled to the value, garnet thumb, 44px hit height, `aria-valuetext` "n of 5 LEDs lit"), and a grey note saying it illustrates the intended behaviour, not the board. On first view it sweeps once to redline and settles at 35%, unless the visitor has already touched it or prefers reduced motion. Lit LEDs are flat fills with a lighter centre: no glow halos.

### Navigation
Top bar fixed to the viewport: transparent over the hero, it hides while the visitor reads downward and returns on scroll up as a solid shell plate with a 2px ink bottom rule (260ms translate, house ease-out); it never hides while it holds keyboard focus, and anchored sections carry an 80px scroll margin. Layout: team line left (hand-set, soft ink), nav right. Nav links are uppercase labels (700, 85% width, 0.9rem) with 44px targets; hover adds a 2px underline at 6px offset. The EN/FR toggle is a 2px ink-bordered group with 6px radius; the active language is ink-filled white, inactive is grey. On inner pages the team line links home and the current page's nav item carries `aria-current`.

### Footer
2px ink top rule, label-weight text (700, 85% width, 0.9rem), links with 44px targets and underline on hover.

### Motion
House easing `cubic-bezier(0.16, 1, 0.3, 1)`. Signature: stickers stamp on (520ms, from rotate(-9deg) scale(1.22) and transparent), staggered 120ms from 380ms; stamps below the fold land the same way as they scroll into view. State fades run 180ms. Hero stickers are links (whole sticker is the hit area) and peel up on hover: translate 0 -3px, rotate 0.6deg, deeper shadow, 220ms. Key stamps press in on click (scale 0.96, 1px down). Navigation between livery pages runs in a view transition: the new page wipes in along a raked clip-path (560ms, `cubic-bezier(0.22, 1, 0.36, 1)`), started only from links inside the livery shell. The homepage entrance is reserved for a later, separate direction. Under `prefers-reduced-motion` all animation and transitions are off and everything shows at rest.

## Do's and Don'ts

### Do:
- **Do** express every status as one stamp from the closed vocabulary, encoded by border style: dashed grey for pending, solid ink for delivered, plain outline for kit.
- **Do** keep garnet for the two livery stripes and for action affordances (pit-board edge, focus ring, highlight outline, link underline).
- **Do** set livery type in Archivo 900 italic uppercase at 62% to 72% width, and labels upright at 75% to 85% width.
- **Do** separate sections with a raked ink pinstripe (3px, -1.5deg) bleeding past the viewport.
- **Do** give every interactive element a 44px minimum target and a 3px garnet focus outline at 3px offset.
- **Do** reserve an honest dashed slot for missing assets rather than a fake render, labelled with what is missing.
- **Do** build new routes in this world; treat the legacy dark tokens in `styles/tokens.css` and `app/globals.css` as pending migration.
- **Do** show categories, levels and course status as plain grey labels; only status on the inspection path earns a stamp.
- **Do** end case studies on the quiet close, preceded by a pinstripe, with a left-arrow back link to the work.

### Don't:
- **Don't** use garnet for status, section breaks or decoration.
- **Don't** add a stamp outside the closed vocabulary, or tick a station that has not been passed.
- **Don't** add a second primary action; the pit-board is the only one.
- **Don't** put stickers in a square, evenly spaced card grid; they are applied by hand, slightly off square.
- **Don't** give flat plates a shadow, or give stickers, plates or the pit-board a hard offset shadow; the only hard offset in the system is the ink pinstripe drawn under a garnet stripe (the closing stripe and the /about page-hero stripe).
- **Don't** introduce a second typeface for display or body.
- **Don't** extend the legacy dark theme or mix its tokens into livery surfaces.
- **Don't** put inspection boxes or stamps on a delivered project's process, or render items without a status (decisions) as stickers.
- **Don't** dash a border that is not pending: chips and tags are solid hairlines.
