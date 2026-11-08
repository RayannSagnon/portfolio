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
The Figma file (page "C. Index") is the reference for every screen. With a mouse, the screens are stacked and scrolling (lightly smoothed) drives a single paused GSAP timeline (`components/site/useDeck.ts`): each screen holds briefly, then its passage plays with the scroll, can stop halfway and reverses going back. Passages: the two halves of the home page part, the next page rises, the kits arrive from opposite sides while the text column changes in place, a sideways slide into About, then only the About column moves while the portrait stays, and the first portrait crosses back for Contact. The navigation slides into each screen's text column. Sizes follow the 1440 x 900 frame through `--u`. Jumps across several stops cut through a short veil. A screen taller than the window spends a longer hold scrolling its own content. Curves: `--ease` for entrances, `--ease-move` for on-screen moves. Transform and opacity only. Phones, touch and reduced motion get one normal page.
