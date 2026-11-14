# History of Chess World Championship Games

A static React, TypeScript and Vite archive of the open classical FIDE World Chess Championship. It includes the FIDE line during the split, the 2006 reunification, and the unplayed 1975 title award. The separate PCA and classical matches of 1993–2004 are described as context. As of 14 November 2026, 2024 is the latest completed edition. The next match is scheduled for 22 November–12 December 2026.

## Run locally

Use Node.js 22.13+ or Node.js 24.

```sh
npm ci
npm run dev
npm run verify
npm run report
npm run build
```

Vite prints the local address. Production files are written to `dist/`. Hash routes keep edition and game URLs shareable on static hosts. Use Left/Right to step and Home/End to jump to the start/end.

## Edit the archive

- Add the event to `src/history.ts` and its crosstable to `src/data.ts`. The original pilot editions and reusable player profiles are also in `src/data.ts`.
- Store mainline game scores in `public/pgn/`. Prefer official records, reconcile discrepancies against an independent result or crosstable, and record provenance. Record a forfeit as a result with no moves and `Termination "forfeit"`. For known games lacking moves, add the documented colors and result without moves.
- Keep existing game order stable whenever possible. The viewer orders by phase, round, then file order for simultaneous games. Links use the resulting 1-based game index.
- Add a paraphrased note in `src/notes.ts` with the edition, first round component and White’s PGN surname or first tag token. The note's `ply` is 1-based. A variation's `start` gives the preceding ply and its moves are SAN. Include the analyst, publication, URL and locator.
- Opening names are matched to recorded positions using the CC0 Lichess chess-openings data. `src/openings.json` keys are the PGN filename stem and the record's zero-based ordinal within that file. If opening data is unavailable, the viewer can show the source ECO code.
- After editing, run the legality check, regenerate the per-game status report, and build. Browse the changed edition and game on desktop and at a narrow width and test each new note or variation.

## Sources and known gaps

PGN Mentor supplied the bulk game scores. Mark Weeks supplied 2023 rapid games, recorded 1999 forfeits and additional knockout entries. The 1972 import lists game 2 as a forfeit with no moves, following the results archive. The archived PGN's placeholder `1.d4` was removed. The 2006 game 5 was also forfeited.

Edition results use FIDE and historical crosstables. `npm run verify` tests legality and parses all imported games. Result and move-order discrepancies between historical collections still require editorial reconciliation, including the early knockout rounds and differences in some older match scoresheets. `public/research-gaps.txt` identifies each imported game by round, players and research status. The knockout player roster is derived from the records, so early-round player biographies, federation and qualification details remain incomplete. Commentary from the 1948 tournament book and other historical game publications still requires research. The 2024 notes mainly use GM Efstratios Grivas's European Chess Union report. The hero is an original generated image.

## Source credits

- FIDE World Champions Timeline — https://worldchesschampionship2023.fide.com/chess-champions
- Mark Weeks World Chess Championship — https://www.mark-weeks.com/chess/wcc-indx.htm
- PGN Mentor — https://www.pgnmentor.com/files.html
- Lichess chess-openings (CC0) — https://github.com/lichess-org/chess-openings

## Publish to GitHub Pages

Push the project folder contents to the main branch of a GitHub repository. In the repository, select Settings → Pages → Source → GitHub Actions. Run the “Publish chess archive to GitHub Pages” workflow from Actions. When it succeeds, copy the live URL from Settings → Pages. The repository URL is the address of its Code tab.
