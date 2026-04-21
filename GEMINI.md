# GEMINI Project Log & Guidelines

이 파일은 Gemini CLI가 프로젝트의 맥락을 빠르게 파악하고 일관성 있게 작업을 수행하기 위한 지침서입니다.

## 🚀 Project Overview
- **이름:** My Portfolio (Desktop UI)
- **목표:** macOS/Windows 데스크톱 환경을 웹으로 구현한 인터랙티브 포트폴리오 사이트.
- **특징:** 창(Window) 시스템, 드래그 가능한 아이콘, 하단 Dock, 상단 메뉴바 등을 포함한 SPA.

## 🛠 Tech Stack
- **Framework:** React 19 (Vite)
- **API:** YouTube IFrame API (MusicApp 전용)
- **Styling:** Vanilla CSS (컴포넌트별 .css 파일 분리)
- **Content:** React Markdown (블로그 포스트용)
- **Deployment:** GitHub Pages (`gh-pages`)

## 🏗 Key Architecture
1. **Window System (`App.jsx`):**
   - `openWindows`, `minimizedWindows` 상태로 창 관리.
   - 앱별 `initialWidth`, `initialHeight` 설정 가능 (MusicApp: 650x600, DiaryApp: 900x650, GalleryApp: 1100x800).
2. **Music Player Engine (Critical):**
   - YouTube IFrame API 직접 호출. **Disclosure - You & Me** 트랙이 플레이리스트 최상단에 추가됨.
   - **3-Layer Trick** (유튜브 영상 / 썸네일 / 클릭 차단 레이어) 유지.

## ✅ Current Status (Implemented Apps)
- [x] **ProfileApp:** 개인 프로필 정보 표시.
- [x] **DiaryApp (Updated 2026-04-21):** 
  - 사이드바 탐색기 + 본문 레이아웃으로 개편 완료.
  - 마크다운 Frontmatter(title, date) 파싱 및 최신순 정렬 기능 구현.
- [x] **GalleryApp (Updated 2026-04-21):** 
  - Mac "Photos" 앱 스타일의 반투명 사이드바 및 그리드 레이아웃.
  - `src/assets/gallery/` 내 다수의 이미지 에셋(pic 1~9) 연동 완료.
  - 시스템 폰트(San-serif) 및 상단 헤더(40px) 최적화.
- [x] **BichonRunApp:** 간단한 비숑 달리기 게임.
- [x] **PaintApp:** 캔버스 기반 그림판 (색상 선택 및 브러시 조절).
- [x] **MusicApp:** YouTube IFrame API 기반 플레이리스트 및 재생 제어.
- [x] **MailApp:** 이메일 문의 폼 (필드 검증 및 전송 시뮬레이션).
- [x] **StickyNoteApp:** 데스크톱 포스트잇 (드래그 및 개별 메모 관리).

## 📝 Roadmap & TODO
- [x] `DiaryApp` 마크다운 렌더링 및 메타데이터 동적 로딩.
- [x] `GalleryApp` 앨범 레이아웃 및 이미지 그리드 구현.
- [ ] **Mobile Optimization:** iPhone 모드 등 모바일 브라우저 대응 레이아웃 최적화.
- [ ] **System Widget:** MenuBar의 시계 및 배터리 상태 등 실시간 데이터 연동.
- [ ] **Gallery Detail:** GalleryApp 내 이미지 클릭 시 상세 보기(라이트박스) 기능 추가.
- [ ] **Window Snap:** 창을 화면 가장자리로 드래그 시 스냅되는 기능 검토.

## 📏 Coding Conventions
- 유튜브 관련 작업 시 표준 `watch?v=` URL 사용 필수.
- 새로운 앱 추가 시 `App.jsx`의 `switch-case` 문에 `initialWidth/Height` 명시 권장.
- Mac 스타일 앱 구현 시 `backdrop-filter: blur()`와 산세리프 시스템 폰트 사용 선호.
