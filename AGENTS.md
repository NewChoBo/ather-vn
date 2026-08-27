# Aether Signal VN authoring contract

## Source of truth

- Product design: Notion page `🎮 Aether Signal — Webgame 설계실` and its numbered child pages.
- Canon and manuscript source: `E:/work/vscode/project/awesome-novel-studio/novels/aether-signal`.
- Display title: `AETHER SIGNAL`; `ather-vn` is the existing repository identifier.

## Public repository boundary

- This repository is public. Never commit credentials, private Notion exports, unpublished manuscript prose, internal review artifacts, or source-repository operational metadata.
- Canon prose remains in Notion and `NewChoBo/awesome-novel-studio`; this repository owns only the game projection and runtime assets.
- A public asset must have confirmed publication rights and must not embed private source material in metadata.

## Ownership boundaries

- `engine/`: generated from pinned `@monogatari/core`; do not hand-edit it.
- `js/`, `style/`, `scenes/`, `characters/`, `state/`, and `assets/manifest.*`: Aether-owned authoring surfaces.
- `assets/`: engine icons plus project media. Reference project media by stable asset ID.
- Aether-specific evidence, classification, authority, audit, and console behavior stays project-local until repeated cross-project use proves a generic engine need.
- Engine changes require a separate work item and evidence that official Monogatari actions, components, configuration, and project-local extensions cannot satisfy the requirement.

## Authoring rules

- Prefer official Monogatari actions, components, configuration, and save system.
- Check local official engine files and Monogatari documentation before adding custom runtime behavior.
- A scene change should normally touch one scene file, optional character/state or asset manifest entries, and its test.
- Do not add a state axis until an authored scene needs it.
- Choices record evidence, responsibility, cost, and memory; do not label them as good or bad.
- Do not turn unknown canon facts such as signal intent or hidden identities into a truth meter.
- Placeholder assets must keep every authored route playable.

## Asset IDs

- Background: `bg.<location>.<variant>`
- Character: `char.<character>.<outfit>.<pose>.<expression>`
- Event image: `event.<scene-or-beat>`
- Evidence or console visual: `evidence.<record-or-signal>` or `ui.<panel-or-control>`
- Audio: `bgm.<cue>` or `sfx.<cue>`

## Commands

- Install and sync engine: `npm install`
- Create missing official template files: `npm run bootstrap`
- Run locally: `npm run dev`
- Unit checks: `npm test`
- Build the public Pages artifact: `npm run build:pages`
- Browser checks: Playwright CLI against `npm run dev`
- Full validation: `npm run validate`
