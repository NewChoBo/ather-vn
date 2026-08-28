# AETHER SIGNAL — Web VN

`AETHER SIGNAL`을 웹 비주얼 노벨로 전환하기 위한 공개 Monogatari 프로젝트입니다. 현재 저장소는 엔진과 저작 경계, 개발 명령, 빈 실행 장면만 갖춘 초기 스캐폴드이며 소설 본문은 포함하지 않습니다.

- 공개 사이트: <https://newchobo.github.io/ather-vn/>

## 시작하기

```powershell
npm install
npm run bootstrap
npm run dev
```

브라우저에서 `http://127.0.0.1:5173`을 엽니다.

기본 `npm run dev`는 `package-lock.json`에 고정된 `@newchobo/vn-components`를 사용합니다. 공통 키트 저장소를 동시에 개발할 때만 `npm run dev -- --components ../vn-component-kit`으로 로컬 소스를 연결합니다. 현재 Monogatari 정적 로딩 구조에는 Vite 번들 단계가 필요하지 않습니다.

## 정본과 공개 경계

- 게임 설계 정본: Notion `🎮 Aether Signal — Webgame 설계실`
- 소설 Canon/원고 정본: `NewChoBo/awesome-novel-studio/novels/aether-signal`
- 이 공개 저장소는 게임 projection과 공개 가능한 런타임 자산만 소유합니다.
- Notion 원문, 소설 본문, 내부 검수 자료는 이 저장소에 복제하지 않습니다.

## 구조

- `engine/`: `@monogatari/core@2.8.0`에서 생성되는 upstream-managed 영역
- `js/`: Monogatari 설정, 저장소 초기값, 프로젝트 등록 코드
- `scenes/`: 승인된 게임 장면
- `characters/`: 프로젝트 캐릭터 등록
- `assets/manifest.json`: 공개 런타임 자산과 안정 ID의 목록
- `style/`: Aether 전용 화면 스타일
- `@newchobo/vn-components`: 여러 VN이 공유하는 엔진 비의존 Web Component 계약
- `tests/`: 프로젝트 경계와 실행 가능성 검증

Evidence, classification, authority, audit, operator-console 기능은 첫 플레이어블 장면이 실제로 요구할 때 project-local 확장으로 추가합니다. 공용 엔진 변경은 공식 기능으로 해결할 수 없다는 근거와 둘 이상의 프로젝트에서 반복되는 요구가 확인된 뒤 별도 작업으로 진행합니다.

## 검증

```powershell
npm run validate
```

브라우저 실기 검증은 `npm run dev`로 띄운 작업 전용 서버에 Playwright CLI를 연결해 수행합니다.

## CI/CD와 GitHub Pages

- Pull Request: 의존성 설치, 단위 검사, 공개 Pages 산출물 생성 및 경계 검사
- `main` push: 동일 검증을 통과한 `output/pages` 산출물만 GitHub Pages에 자동 배포
- 수동 재배포: GitHub Actions의 `CI and deploy GitHub Pages` 워크플로에서 `Run workflow`

로컬에서 배포 산출물만 다시 만들려면 다음 명령을 실행합니다.

```powershell
npm run build:pages
```

Pages 산출물은 런타임 allowlist로 만들어집니다. 공통 키트의 공개 파일 세 개만 `vendor/vn-components/`로 복사하고, `docs/`, `tests/`, `scripts/`, `node_modules/`와 저장소 운영 파일은 배포하지 않습니다.
