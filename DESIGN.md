# Design System: Rayann Sagnon

Direction "Index", chosen in Figma (file 1uXkeeNoysnHV4lRw7wYzz, page "C. Index").

## Principles
Black ground, one typeface, no decorative colour: Rayann's photos and videos carry the colour. A recruiter sees who he is and what he has done on the first screen.

## Colors
- Ink `#0a0a0b`: ground.
- Paper `#f5f5f2`: text and the primary button.
- Dim `#9e9e99`: secondary text.
- Slot `#17171a`: panels and media still to come. Sheet `#131316`: phone sheets.

## Typography
Instrument Sans (400, 500, 600). Display in 500 with tight tracking (-0.04em), scaled by the smaller of viewport width and height. Body 16 to 20px, line-height 1.4.

## Shapes
Square corners everywhere. The only radius is the phone sheet's handle.

## Layout
One continuous page on every route (each URL opens at its own section). Desktop: a full-height image held still on the left, a text column travelling past it on the right, one screen per section, with a sticky navigation whose bar follows the active tab.

## Phones
One column. A translucent bottom bar replaces the top menu, the LinkedIn action sits low on the screen, projects are swipe cards with the next one peeking, each section carries its own image above its text, experience is an exclusive accordion.

## Motion
On arrival the portrait reveals upward (600ms) and rows arrive staggered 40ms. Reaching a section crossfades the stage image with a 1.03 settle (400ms); hovering a project does the same and dims the other rows. Text rises 12px once per section (500ms, 40ms stagger). The tab bar slides (250ms). Accordion 250ms. Mouse wheel is lightly smoothed; touch stays native. Transform, opacity, clip-path and the accordion's grid row only. Reduced motion: simple fades, no smoothing.
