# Design references for the Color Studio redesign

Snapshot: 2026-10-02, desktop 1440x900, first-viewport screenshots taken with Playwright. Every site below was loaded and its screenshot was viewed before writing. Screenshots live in `screenshots/references/`. Observations describe the first viewport only, not the full site.

## Galleries loaded

| Gallery | Loaded | Screenshot | How used |
|---|---|---|---|
| Siteinspire (siteinspire.com) | yes | `gallery-siteinspire.png` | Picked sites 1-5 from its listing |
| Awwwards Sites of the Day | yes | `gallery-awwwards-sotd.png` | Picked sites 6-7 from its listing |
| Godly (godly.website) | yes | `gallery-godly.png` | Outbound links were X/Twitter posts, not sites; nothing taken |
| Land-book | yes (cookie modal over page) | `gallery-landbook.png` | Thumbnails only; nothing taken |

Sites 8-15 were NOT found through a gallery. They came from my own search for paint, type-foundry, museum and tool-adjacent candidates, and are marked "found via search".

## Selected references (15)

### 1. This (https://this.design) - Siteinspire, outside industry (design studio)
Screenshot: `siteinspire-this-design.png`
- Headline is a huge light grotesque where single words switch to bold or italic serif ("design studio", "empathy"). Use for one emphasized word in the hero.
- Pure black ground with the work as the only color. Maps to a dark canvas where the user's swatches are the sole hue.
- Floating pill buttons (menu, About) instead of a full nav bar.

### 2. Visual Society (https://visualsociety.ch) - Siteinspire, outside industry (fashion archive)
Screenshot: `siteinspire-visualsociety.png`
- Filters are plain bracket-checkbox text: `[ ] Product  [ ] Press  [ ] .png  [ ] .jpg`. Fits an export-format picker (`[ ] CSS  [ ] Tailwind  [ ] JSON`).
- Layout pairs a small key/value metadata column on the left (Content type, Price, Year) with an oversized title on the right.
- One saturated blue as the only chrome color on a white page.

### 3. Union Boulangerie (https://unionboulangerie.com) - Siteinspire, outside industry (bakery)
Screenshot: `siteinspire-unionboulangerie.png`
- Nav items are flat rectangular color blocks (blue, orange) over full-bleed video. Color used as chrome, not decoration.
- Condensed uppercase display type with wide gaps between phrases.
- Language switch as plain text ("FR | EN"), no icon.

### 4. The Surfer's Journal Archives (https://archives.surfersjournal.com) - Siteinspire, outside industry (magazine)
Screenshot: `siteinspire-surfersjournal.png`
- Pale pink page ground that echoes the cover's accent green stripe. Idea: tint the page background from the active color.
- Old-style serif numerals set large ("2026", "35.4"). Good for showing values like `oklch(...)` or hex as typographic objects.
- One centered object with a soft shadow, minimal three-link nav.

### 5. Artemii Lebedev (https://artemiilebedev.com) - Siteinspire, outside industry (art director portfolio)
Screenshot: `siteinspire-artemiilebedev.png`
- Monospace uppercase labels for all metadata, plus a live clock. Fits color codes and contrast ratios.
- White info card with a two-column grid (label | value) over a dimmed image.
- Hover list where the active row is inverted (white box, dark text), and visible key hints ("PRESS ESC FOR EFFECTS (?)", "CLICK AND HOLD"). Use for the shortcut hints.

### 6. bleibtgleich (https://bleibtgleich.dev) - Awwwards SOTD list, designer/developer portfolio
Screenshot: `awwwards-bleibtgleich.png` (captured mid-load; the black block top-left was an unloaded element)
- Bold grotesque with tight tracking, black on white, no color at all.
- Hairline vertical rule separates a small label column from content.
- Oversized ghost-gray words in the bottom corners as quiet structure.

### 7. Boc.Studio (https://boc.studio) - Awwwards SOTD list, brand studio
Screenshot: `awwwards-boc.png`
- A single flat saturated orange-red field is the entire stage. Analogue for the user's color filling the canvas.
- Marquee strip of small text (name, coordinates "41.4120 N, 2.1580 E", city). Could carry live `oklch()` or hex readouts.
- Gray bands above and below keep the field neutral-framed.

### 8. Klim Type Foundry (https://klim.co.nz) - found via search, outside industry (type foundry)
Screenshot: `klim.png`
- Thin black top bar with two links and a menu icon, light-gray page ground, one 3D product render. The neutral ground makes the orange crate the only color.
- Tiny red-orange label tag ("Die Grotesk") pinned bottom-left. Pattern for a "current color" chip.

### 9. Commercial Type (https://commercialtype.com) - found via search, outside industry (type foundry)
Screenshot: `commercialtype.png`
- Stacked full-width bands, each a different background color with the specimen name set tone-on-tone (light pink on purple, dark teal on mint). Direct model for deriving text color from a swatch.
- Small counts under each band ("4 Families, 48 Styles").
- Nav as black rectangular buttons with a hard shadow.

### 10. Grilli Type (https://www.grillitype.com) - found via search, outside industry (type foundry)
Screenshot: `grilli.png`
- Label column left, content right; hairline rule under the nav; inactive nav links in gray.
- Hero is a technical "test card" drawn in thin olive and pink lines over a pale mint wash. Candidate for the palette-preview style.
- Specimen list as text rows with underlines, plus a quiet bordered note box.

### 11. Inter (https://rsms.me/inter/) - found via search, type specimen
Screenshot: `rsms-inter.png`
- Huge tight-tracked black headline, then a three-column dense intro. No color, no imagery.
- Black pill download button as the single action. Relevant to the "export" button hierarchy.

### 12. Are.na (https://www.are.na) - found via search, outside industry (research/collection)
Screenshot: `arena.png`
- Intro written as a lettered list (a. b. c.) in plain text instead of a marketing hero.
- Deep navy as the only accent (Sign up button); slash breadcrumbs ("Are.na / Pierre Marteau / Commonplace") in the product shot.

### 13. MoMA (https://www.moma.org) - found via search, outside industry (museum)
Screenshot: `moma.png`
- Heavy bold grotesque for all hierarchy, thick black rule as the main separator, no color in the UI chrome.
- Cyan "Tickets" button is the only accent. One accent for the one primary action.

### 14. Farrow & Ball (https://www.farrow-ball.com) - found via search, outside industry (paint maker)
Screenshot: `farrowball.png` (cookie and region modals dismissed before capture)
- Header bar colored deep brown, secondary bar muted teal: chrome colors taken from the product palette.
- Outlined pill buttons over a full-bleed photograph; headline centered in a light humanist sans.
- Nav includes "Paint Samples" and "Colour Consultancy". The brand's practice of evocative color names supports naming swatches.

### 15. Linear (https://linear.app) - found via search, dev tool
Screenshot: `lineargh.png`
- Near-black ground, left-aligned large white headline, muted gray subcopy.
- Real product UI in a thin-bordered rounded frame right under the headline. Product first, no illustration.
- White pill "Sign up" as the single high-contrast action.

## Viewed or attempted, not selected

- Pantone (`pantone.png`, `pantone-coty.png`): loaded, but cookie and shipping modals could not be dismissed and a dark overlay stayed on; observations limited, not scored.
- Kremer Pigmente (`kremer.png`): **blocked**, HTTP 403.
- Pangram Pangram (`pangram.png`): loaded and viewed (full-bleed photo cards with giant white type, "Try for Free" pill); cut for the 15 limit.
- Jakobsen Copenhagen (`jakobsen.png`) and Noho (`awwwards-noho.png`): captured, not reviewed, not used.

## What the set agrees on (for the redesign)

1. **Neutral chrome, one accent.** MoMA, Boc, Klim, Are.na and Linear keep UI color near zero so one color carries meaning. For Color Studio the accent should be the user's active color, not a fixed indigo.
2. **Metadata as small type.** Monospace or small caps for values (Lebedev, Visual Society, Boc) reads as precision.
3. **Hairlines over boxes.** Grilli, bleibtgleich and MoMA structure with rules instead of cards.
4. **Tone-on-tone text from the swatch** (Commercial Type) is the most directly transferable color-tool idea.
5. **Visible keyboard hints** (Lebedev) support the existing shortcuts.
