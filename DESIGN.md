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
---

# Design System: Rayann Sagnon

## Overview

**Creative North Star: "The Scrutineered Side Panel"**

The site is the side panel of a student race car on inspection day. The name is the livery, painted huge in heavy condensed italic caps across a raked garnet stripe. The work is the scrutineering stickers stuck to the shell: white stock, thick black border, each carrying one stamped status from a closed vocabulary. Nothing is a card in a grid; everything is a decal, a plate or a stamp applied to a white gel-coat surface.

The system is one font (Archivo, variable on the width axis) pushed from 62% to 85% width, four inks with one law each, and a small kit of physical artifacts: stripe, pinstripe, roundel, sticker, stamp, plate, pit-board. Density is low and loud: few elements, very large type, generous air between sections, each section break a raked ink pinstripe.

Honesty is visual here, not just verbal. A status is shown by the form of its mark (dashed, solid, outlined), so the page cannot imply progress it has not made.

This world currently covers the homepage only (`app/page.tsx`, `components/livery/`). The other routes (`/about`, `/projects/standout`, not-found) still run on the legacy dark theme in `styles/tokens.css` and `app/globals.css`. That theme is legacy, pending migration into this world, and is not part of this system. Do not extend it.

**Key Characteristics:**
- White gel-coat shell ground, black fact ink, garnet for livery and action, grey for pending.
- Archivo only, width axis as the expressive dial: heavy italic condensed caps for livery, upright medium widths for body.
- Rotation as material: stripe and pinstripes raked at -1.5deg to -4deg, stickers set slightly off square.
- Statuses from a closed stamp vocabulary, encoded by border style rather than hue.
- One action, the pit-board, repeated in the hero and the close.

## Colors

A white race shell with black fact ink and one saturated garnet that is reserved for the livery and for action.

### Primary
- **uOttawa Garnet** (garnet): the livery stripe behind the second word of the name, the closing stripe, the pit-board's arrow edge, focus rings, highlighted-sticker outlines, the underline of text links, and text selection. It marks livery and action, never status or decoration.
- **Garnet Deep** (garnet-deep): hover state of the pit-board's arrow edge only.

### Neutral
- **Fact Ink** (ink): headings, the name, sticker and plate borders, pinstripes, the pit-board panel, the delivered stamp fill, the active language toggle.
- **Soft Ink** (ink-soft): body paragraphs, the top-bar team line, kit detail text.
- **Pending Grey** (pending): anything not yet reached: pending stamps (dashed), unreached inspection stations, spec-plate labels, the reserved image slot, inactive language. Set at #55585a for legibility on the shell (about 6.6:1); the direction contract's lighter #9a9c9e failed AA and was not shipped.
- **Gel-coat Shell** (shell): page ground.
- **Gel-coat Highlight** (shell-hi): sticker, plate, roundel and stamp stock; the hero's radial sheen (`radial-gradient(90% 80% at 28% 10%, shell-hi, shell 70%)`).
- **Hairline Rule** (rule): internal dividers inside plates (spec rows, station columns) and the stamp key's plate border.

### Named Rules
**The One Color One Law Rule.** Garnet means livery or action, ink means fact, grey means pending. A color never borrows another's job: no garnet status, no grey heading.

**The Garnet Reserve Rule.** Garnet appears as two stripes (hero, close) and on interactive affordances. Section breaks are ink, not garnet.

## Typography

**Display Font:** Archivo (variable, `wdth` axis), loaded via next/font as `--font-archivo`, fallback system-ui, sans-serif
**Body Font:** Archivo at default width
**Label Font:** Archivo at 75% to 85% width

**Character:** One family carries everything. Width is the voice: compressed to 62% and slanted for livery that reads like paint on a body panel, opened back up for plain, readable facts. The build sets width with `font-stretch` percentages; the token `fontVariation` mirrors those values.

### Hierarchy
- **Display** (900 italic, uppercase, 62% width, clamp(4.5rem, 13.5vw, 13rem), line-height 0.84): the name only, rotated -4deg from its left edge. Rises to 19vw at tablet and 27vw on phones.
- **Display Close** (900 italic, uppercase, 64% width, clamp(3rem, 8vw, 7.5rem), line-height 0.88, max 14ch): the closing call under the second stripe.
- **Headline** (900 italic, uppercase, 66% width, clamp(2.4rem, 5.4vw, 4.75rem), line-height 0.92): section headings, balanced wrap.
- **Title** (900 italic, uppercase, 70% width, 1.65rem, line-height 1): sticker names, the roundel's RS mark (at its own size), the pit-board label (72% width, clamp(1.3rem, 2vw, 1.8rem)), city names on the route decal.
- **Lead** (700, clamp(1.35rem, 2vw, 2rem), line-height 1.25, max 30ch): the single identity line under the hero stripe.
- **Body** (400, 1.125rem, line-height 1.6, max 62ch, ink-soft): section prose. Closing prose runs 1.2rem / 1.55 at 48ch.
- **Label** (700 to 800, uppercase, 75% to 85% width, 0.85rem to 1rem, letter-spacing 0.03em to 0.04em): stamps, nav, spec labels, station names, text links.

### Named Rules
**The Width Dial Rule.** Hierarchy is set by width and slant before size: livery is italic and narrow (62% to 72%), labels are upright and semi-narrow (75% to 85%), prose is upright at full width. Never italicize body copy.

**The Hand-set Brand Rule.** Brand names keep their own casing where they are set in mixed case (the top-bar team line: uOttawa, uOSupermileage). Uppercase transforms belong to livery and labels.

## Layout

A full-viewport hero laid out as a side panel: a two-column grid (fluid content, fixed 300px sheet column) with the name spanning both columns, the identity line beneath, and the pit-board pinned bottom right. The stickers sheet floats at the top right of the panel, absolutely positioned 120px from the top.

Below the hero, sections sit in a 1240px container with `gutter` side padding and `section` vertical padding. Content sections use an asymmetric two-column split (1.05fr / 0.95fr, gap clamp(32px, 5vw, 80px)): prose and spec on the left, a decal or plate on the right. Sections are separated by a raked ink pinstripe in a block clamp(56px, 7vw, 96px) tall.

The close runs full bleed with large top padding (clamp(150px, 18vw, 230px)) so the second garnet stripe has room above the heading.

Responsive: at 1000px and below the hero becomes a single column, the action moves before the sheet (pit-board full width, then stickers), the roundel shrinks and moves to the top right, and the team line is hidden. At 560px and below the stickers compact to single inspection lines (name and stamp inline), stations go two by two, kit stickers stack, spec rows stack, and the closing pit-board goes full width. Every interactive target is at least 44px tall. Safe-area insets pad the top bar and footer.

## Elevation & Depth

Mostly flat, with physical lift only on objects that are stuck to the shell. Stickers, the roundel and the pit-board carry a soft two-part shadow (a 1 to 2px contact edge plus a wide, low-opacity blur) so they read as applied decals. Plates (spec, stations, route, key) sit flush with no shadow. Depth also comes from the hero's radial sheen and from overlap: stickers and the roundel overlap the stripe.

### Shadow Vocabulary
- **Decal lift** (`box-shadow: 0 1px 0 rgba(0,0,0,0.08), 0 10px 22px rgba(0,0,0,0.08)`): every sticker.
- **Roundel lift** (`box-shadow: 0 2px 0 rgba(0,0,0,0.06), 0 14px 30px rgba(0,0,0,0.1)`): the number roundel.
- **Pit-board lift** (`box-shadow: 0 2px 0 rgba(0,0,0,0.1), 0 16px 34px rgba(0,0,0,0.16)`): the action panel, the most lifted object on the page.

### Named Rules
**The Stuck-On Rule.** Only things applied to the shell (stickers, roundel, pit-board) lift. Plates that belong to the panel stay flat.

## Shapes

Small, deliberate radii on thick borders: the language of vinyl decals and aluminium plates, not of UI cards. Radius steps by object: inspection box 2px, stamp 3px, plates and the pit-board 4px, stickers, the route decal, the stamp key and the language toggle 6px, the roundel a full circle.

Borders are heavy and black: stickers and the route decal 3px, plates and the language toggle 2px, stamps 2.5px, the roundel clamp(7px, 0.8vw, 12px). Internal dividers are 1px hairlines in the rule color.

Rotation is part of the form. The hero stripe and the closing stripe rake at -4deg, section pinstripes and the route line at -1.5deg, stamps at -3deg, and stickers sit between -1.4deg and +1.2deg so they look hand-applied. The garnet stripe always carries a thin ink pinstripe below it (in the hero, a pseudo-element 0.045em tall; at the close, an ink band offset under the stripe). Stripes bleed past the viewport edge and are clipped.

The reserved image slot is a dashed pending-grey frame over a faint 45deg hatch, at 4:3: an honest placeholder for an asset that does not exist yet.

## Components

### Pit-board (the one action)
Black panel, garnet edge: the only primary action, used for Connect on LinkedIn in the hero and the close.
- **Shape:** 4px radius, overflow clipped.
- **Default:** ink panel with the label in Title style (white), then a 64px garnet edge holding a 28px SVG arrow.
- **Hover / Active:** panel lifts 2px, the edge deepens to garnet-deep, the arrow slides 4px right; active returns to rest. 220ms on the house ease-out.
- **Responsive:** full width at 1000px and below (hero) and at 560px and below (close).

### Text link (secondary action)
- **Style:** uppercase label (800, 80% width, 1.05rem, 0.03em), ink text, 2px garnet underline offset 6px, trailing SVG arrow, min height 44px.
- **Hover:** arrow slides 4px right.

### Scrutineering sticker (signature)
White stock, 3px ink border, 6px radius, decal lift, padding 14px 16px 16px, set slightly off square. Holds a Title-style name and exactly one stamp; may hold facts (kit detail, added work) between them. The Standout decal is the same sticker scaled up (24px padding, larger name). On phones the hero stickers compact to one line.

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
Flat white plate, 2px ink border, 4px radius; rows of label (grey uppercase, 75% width) and value (600, 1rem) on a 110px / 1fr grid, hairline-separated.

### Number roundel
A white circle with a heavy ink ring and the RS mark in italic livery type, linking home. It carries the RS mark because there is no real race number; do not invent one.

### Navigation
Top bar absolutely positioned over the hero: team line left (hand-set, soft ink), nav right. Nav links are uppercase labels (700, 85% width, 0.9rem) with 44px targets; hover adds a 2px underline at 6px offset. The EN/FR toggle is a 2px ink-bordered group with 6px radius; the active language is ink-filled white, inactive is grey.

### Footer
2px ink top rule, label-weight text (700, 85% width, 0.9rem), links with 44px targets and underline on hover.

### Motion
House easing `cubic-bezier(0.16, 1, 0.3, 1)`. Signature: stickers stamp on (520ms, from rotate(-9deg) scale(1.22) and transparent), staggered 120ms from 380ms; stamps below the fold land the same way as they scroll into view. State fades run 180ms. Under `prefers-reduced-motion` all animation and transitions are off and everything shows at rest.

## Do's and Don'ts

### Do:
- **Do** express every status as one stamp from the closed vocabulary, encoded by border style: dashed grey for pending, solid ink for delivered, plain outline for kit.
- **Do** keep garnet for the two livery stripes and for action affordances (pit-board edge, focus ring, highlight outline, link underline).
- **Do** set livery type in Archivo 900 italic uppercase at 62% to 72% width, and labels upright at 75% to 85% width.
- **Do** separate sections with a raked ink pinstripe (3px, -1.5deg) bleeding past the viewport.
- **Do** give every interactive element a 44px minimum target and a 3px garnet focus outline at 3px offset.
- **Do** reserve an honest dashed slot for missing assets rather than a fake render.
- **Do** build new routes in this world; treat the legacy dark tokens in `styles/tokens.css` and `app/globals.css` as pending migration.

### Don't:
- **Don't** use garnet for status, section breaks or decoration.
- **Don't** add a stamp outside the closed vocabulary, or tick a station that has not been passed.
- **Don't** add a second primary action; the pit-board is the only one.
- **Don't** put stickers in a square, evenly spaced card grid; they are applied by hand, slightly off square.
- **Don't** give flat plates a shadow, or give stickers, plates or the pit-board a hard offset shadow; the only hard offset in the system is the ink pinstripe drawn under the closing stripe.
- **Don't** introduce a second typeface for display or body.
- **Don't** extend the legacy dark theme or mix its tokens into livery surfaces.
