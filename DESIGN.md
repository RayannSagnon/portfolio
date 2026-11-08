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
Desktop pages are splits of a full-height image and a text column (portrait left, column right on the homepage), with a sticky top navigation showing the active tab. The tachometer page is a mosaic. On About, the portrait stays fixed while the column scrolls.

## Phones
Thought for the thumb: a translucent bottom bar replaces the top menu, the LinkedIn action sits in the lower part of the screen, projects are swipe cards with the next one peeking, and project details are a sheet that is simply the page scrolling over sticky media. Experience is an exclusive accordion.

## Motion
Homepage only on load: the portrait reveals upward, rows arrive staggered. Hovering a project crossfades its media over the portrait and dims the other rows. Transform, opacity and clip-path only. Off under reduced motion.
