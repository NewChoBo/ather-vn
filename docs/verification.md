# Verification record

Date: 2026-08-28 (Asia/Seoul)

## Automated

- `npm run validate`: 6/6 Node tests pass.
- `@monogatari/core` is pinned to `2.8.0`, and committed `engine/core/monogatari.js` matches the installed package output.
- The bootstrap scene exposes only `Start`, ends cleanly, and contains no adapted story state.
- The project asset manifest is empty and no canon-source directory is present.

## Browser

- Desktop 1280×720: AETHER SIGNAL title and Korean main menu render correctly.
- Mobile 390×844: title and menu remain visible without horizontal clipping.
- Flow: main menu → Start → bootstrap notice → main menu.
- Console errors: 0.
- Expected first-run upstream warnings: Lit development mode, persistent-storage permission unavailable, and initial settings creation in IndexedDB.

Browser checks use Playwright CLI against a task-owned local `npm run dev` server. Screenshots and transient browser profiles are ignored rather than committed.
