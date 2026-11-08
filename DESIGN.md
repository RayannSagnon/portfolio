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
Eight scenes, each with its own composition: home (portrait and index), tachometer (full-bleed photo, giant title), bench (black, live LED simulator), Standout (white, in the studio's colours, video of the real site), kits (two full-height columns), route (photo and giant place name, sideways), work (type only) and contact (portrait on the opposite side). Every route is this same page, opened at its own scene.

## Phones
One column with gentle section snapping. A translucent bottom bar replaces the top menu, projects are swipe cards, the route is swiped sideways, experience is an exclusive accordion.

## Motion
With a mouse, one gesture moves one stop along a single paused GSAP timeline (`components/site/useDeck.ts`), 0.95s per passage, so going back replays the same passage in reverse. Each passage is different: image grows to full screen, photo closes upward, paper rises, columns arrive from opposite sides, a sideways slide, a type cascade, the portrait crossing over. Jumps across several stops cut through a short veil. A scene taller than the window scrolls inside itself first. Same typeface, ink and curve throughout. Transform and opacity only, except the kit columns' hover. Phones, touch and reduced motion get one normal page.
