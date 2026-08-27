# AETHER SIGNAL — Web VN

`AETHER SIGNAL`을 웹 비주얼 노벨로 전환하기 위한 공개 Monogatari 프로젝트입니다. 현재 저장소는 엔진과 저작 경계, 개발 명령, 빈 실행 장면만 갖춘 초기 스캐폴드이며 소설 본문은 포함하지 않습니다.

## 시작하기

```powershell
npm install
npm run bootstrap
npm run dev
```

브라우저에서 `http://127.0.0.1:5173`을 엽니다.

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
- `tests/`: 프로젝트 경계와 실행 가능성 검증

Evidence, classification, authority, audit, operator-console 기능은 첫 플레이어블 장면이 실제로 요구할 때 project-local 확장으로 추가합니다. 공용 엔진 변경은 공식 기능으로 해결할 수 없다는 근거와 둘 이상의 프로젝트에서 반복되는 요구가 확인된 뒤 별도 작업으로 진행합니다.

## 검증

```powershell
npm run validate
```

브라우저 실기 검증은 `npm run dev`로 띄운 작업 전용 서버에 Playwright CLI를 연결해 수행합니다.
