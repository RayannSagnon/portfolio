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
Eight scenes, each with its own composition: home (portrait and index), tachometer (full-bleed photo, giant title), bench (black, live LED simulator), Standout (the studio's green, a still capture of the real site in a browser frame plus a phone capture; the recording plays only on hover or click), kits (two full-height columns), route (photo and giant place name, sideways), work (type only) and contact (portrait on the opposite side). Every route is this same page, opened at its own scene.

## Phones
One column with gentle section snapping. A translucent bottom bar replaces the top menu, projects are swipe cards, the route is swiped sideways, experience is an exclusive accordion.

## Motion
The Figma file is the reference: the home screen follows design B on computers (Geist Thin name crossing a framed portrait) and design C on phones, with design B's LinkedIn link; every other screen follows page "C. Index". With a mouse, the screens are stacked and native scrolling (no added smoothing, only the navigation jumps are animated) drives a single paused GSAP timeline (`components/site/useDeck.ts`): each screen holds for less than a wheel notch, then its passage moves one to one with the scroll (one window of scroll, linear), so the page always moves with the scrollbar; it can stop halfway and reverses going back. Passages: home lifts away like a page turning, the portrait a little faster than the name, with the first project already underneath, a sideways slide from the kits into About, then only the About column moves while the portrait stays, and Contact rises over About like the projects. The navigation slides into each screen's text column, and four LEDs beside the initials come on as the page goes by, following the tachometer's thresholds. Titles do not follow the scroll: each plays once its screen has arrived (settling while its letters come on one after another) and resets only when the visitor goes back before that screen; at load the portrait opens from a vertical slit while the name fades in letter by letter. Sizes follow the 1440 x 900 frame through `--u`. The home screen has a monochrome React Bits WebGL background (Ghost Fibers) on computers (`components/site/HomeBackground.tsx`), frozen as soon as the page starts to turn. There are no morphs: between the projects each page rises over the one before (Dashboard PCB, Standout, GoForIt's ivory room in the app's own colours, then the kits), and the last screen rises the same way, then plays on its own: the question, the three actions one by one, the portrait last. In Experience, each job comes forward in turn and a bar travels to it. As About slides in, a pile of Rayann's photos opens into the route's fan of React Bits Bounce Cards, with the three chapters readable below. The last screen lists three large actions (LinkedIn, email, CV) over React Bits' Floating Lines, with the portrait reduced to a small frame. Hands-on skills use React Bits' Magic Bento on computers, in the site's greys and square corners. Jumps across several stops cut through a short veil. A screen taller than the window spends a longer hold scrolling its own content. Curves: `--ease` for entrances, `--ease-move` for on-screen moves. Transform and opacity only. Phones, touch and reduced motion get one normal page.

## Structure since November 2026

The scroll deck is gone: every page scrolls natively. The home page (`components/site/pages/HomePage.tsx`) has four parts: Rayann (name, standing portrait fading into the Ghost Fibers background, LinkedIn and CV), the first proof (the dashboard PCB as a 3D model the visitor can turn, from Rayann's Altium STEP export converted to `public/models/dashboard-pcb.glb`, with React Bits PixelTransition turning the schematic into the board on hover), every project (React Bits FlowingMenu on computers, a swipeable row of cards on phones) and the contact section, which plays once it is on screen. Every project uses one template (`ProjectStory.tsx`): header with status, role, team and tools, a hero (3D board, the GoForIt screens on ivory, or the Standout capture with its recording on hover), chapters written in the first person, the next project and a contact strip. `/experience` follows LinkedIn's order of things (organization tile, title, organization and contract, dates, place, description, media, skills, grouped roles) in the site's own look; on phones older places fold away. `/about` is personal only. `/work` and `/contact` redirect to the home sections. Navigation: Work (home list), Experience, About, Contact. Phone layouts are designed for the thumb: full-width buttons, tap toggles in place of hover, swipe rows, the bottom bar. Legacy global `section` and `.root :where(...)` rules now have zero specificity so page classes always win.
