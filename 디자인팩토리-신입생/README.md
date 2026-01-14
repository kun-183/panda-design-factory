# 책 판다 (Book Panda) · 중고 문제집 거래 플랫폼 (1단계 UI)

**목표**: 과목 → 단원(미풀이) → 검색/필터/정렬 → 상세 → 등록 흐름을 모바일 퍼스트 UI로 구현한 프론트엔드 프로토타입입니다.  
현재는 **목데이터(MOCK)** 기반이며, 2단계(백엔드/DB), 3단계(AI 이미지 분석)로 확장하기 쉽게 구조를 잡았습니다.

## 실행 방법

터미널에서 아래 명령을 실행하세요:

```bash
npm install
npm run dev
```

Vite 기본 주소: `http://localhost:5173`

## 구현된 페이지(1단계)

- `/` 과목 선택(메인)
- `/units` 단원(미풀이) 다중 선택
- `/search` 검색 결과 리스트 + 필터/정렬(깔끔/가격/최신)
- `/listing/:id` 상세 페이지(갤러리/AI 분석/미풀이 단원/판매자/거래방법)
- `/sell/new` 문제집 등록(사진 업로드 프리뷰 + 폼)

## 핵심 UX 포인트

- **단원 체크 기반**: “상세설명 읽기” 비용을 줄이기 위해, 미풀이 단원을 구조화된 데이터로 노출
- **모바일 퍼스트**: 카드형 리스트, 스티키 헤더, 하단 네비
- **빠른 탐색**: 검색 결과에서 단원 칩을 바로 토글 가능

## 폴더 구조

```
src/
  components/   공통 UI(쉘/카드/칩/갤러리)
  lib/          타입/카탈로그(과목·단원)/목데이터/쿼리상태
  pages/        5개 페이지
```

## Vercel 배포 방법

### 방법 1: Vercel CLI 사용

1. **Vercel CLI 설치 및 로그인**
   ```bash
   npm i -g vercel
   vercel login
   ```

2. **프로젝트 배포**
   ```bash
   vercel
   ```
   - 첫 배포 시 프로젝트 설정 질문에 기본값으로 진행하면 됩니다.
   - Production 배포: `vercel --prod`

### 방법 2: Vercel 웹 대시보드 사용 (추천)

1. **GitHub에 프로젝트 푸시**
   - GitHub 저장소를 생성하고 코드를 푸시합니다.

2. **Vercel 대시보드에서 배포**
   - [vercel.com](https://vercel.com)에 접속해 GitHub 계정으로 로그인
   - "Add New Project" 클릭
   - GitHub 저장소 선택
   - Vercel이 자동으로 Vite 프로젝트를 감지합니다
   - Build Settings 확인:
     - Framework Preset: `Vite`
     - Build Command: `npm run build` (자동 감지됨)
     - Output Directory: `dist` (자동 감지됨)
   - "Deploy" 클릭

3. **배포 완료**
   - 배포가 완료되면 `https://your-project.vercel.app` 형태의 URL이 생성됩니다.
   - 이후 GitHub에 푸시할 때마다 자동으로 재배포됩니다.

### 주의사항

- `vercel.json` 파일이 이미 포함되어 있어 SPA 라우팅이 자동으로 처리됩니다.
- React Router의 모든 경로(`/units`, `/search`, `/listing/:id` 등)가 정상 작동합니다.

## 다음 단계(선택)

- **2단계 백엔드/DB**: Supabase/Firebase로 Listing CRUD + 이미지 업로드
- **3단계 AI 분석**: 업로드 이미지에서 필기/오염/풀이 흔적을 추정해 `conditionScore`, `solvedRatio` 산출


