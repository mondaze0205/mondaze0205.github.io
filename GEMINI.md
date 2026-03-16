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
   - 앱별 `initialWidth`, `initialHeight` 설정 가능 (MusicApp: 650x600).
2. **Music Player Engine (Critical):**
   - 라이브러리 대신 **YouTube IFrame API** 직접 호출하여 브라우저 자동 재생 정책 및 보안 정책 해결.
   - **3-Layer Trick:**
     1. `z-index: 1`: 실제 유튜브 영상 (Scale 1.3으로 검은 바 제거).
     2. `z-index: 3`: 고해상도 썸네일(`maxresdefault.jpg`) 이미지 덮개.
     3. `z-index: 5`: 투명 클릭 차단 레이어 (사용자의 직접적인 유튜브 인터랙션 방지).
   - `setInterval`을 이용한 커스텀 재생 바(Progress Bar) 연동.

## ✅ Current Status (Implemented Apps)
- [x] **ProfileApp:** 개인 프로필 정보 표시.
- [x] **DiaryApp:** 블로그/일기 목록 및 내용 표시 (마크다운 연동 준비 중).
- [x] **BichonRunApp:** 간단한 비숑 달리기 게임.
- [x] **PaintApp:** 캔버스 기반 그림판.
- [x] **MusicApp:** 유튜브 API 기반 "눈속임" 플레이어 (소리 재생 및 UI 동기화 완벽 구현).
- [x] **MailApp:** 이메일 문의 폼.
- [x] **StickyNoteApp:** 데스크톱 포스트잇 기능.

## 📝 Roadmap & TODO
- [ ] `DiaryApp` 내 마크다운 파일(src/posts/1.md 등) 실제 렌더링 연동.
- [ ] `GalleryApp` 앨범 레이아웃 및 이미지 슬라이더 구현.
- [ ] 모바일 환경(iPhone Mode)에서 MusicApp의 레이아웃 최적화.
- [ ] MenuBar의 위젯(시계 등) 실시간 데이터 연동.

## 📏 Coding Conventions
- 유튜브 관련 작업 시 표준 `watch?v=` URL 사용 필수.
- 새로운 앱 추가 시 `App.jsx`의 `switch-case` 문에 `initialWidth/Height` 명시 권장.
