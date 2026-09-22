# PenFunGo React Migration Plan

版本：0.2
建立：2026-09-20  
更新：2026-09-22
狀態：R0–R2 第一輪已實作；React 候選版尚未取代 production

## 0. 目前實作

- React、TypeScript、Vite 與 React Router 已建立。
- 品牌頁在建置時預渲染完整 HTML，不依賴 SPA fallback。
- 首頁、About、Services、Work、4 個案例、Contact 與 404 已 React 化。
- 案例由 `src/content/cases.ts` 的受控 schema 產生，不再複製四份頁面。
- 設計 token 位於 `src/styles/tokens.css`；A／B／C 敘事保留為不同 composition。
- 既有活動頁由 build script 原樣複製，validator 會檢查核心檔案 byte parity。
- React 輸出位於 `dist-react/`；目前 production 仍部署 `0605/`。

## 1. 遷移原則

React 是後續維護與內容規模化的手段，不是重新設計網站的理由。

- 先發布可回滾的靜態 MVP。
- 保留现有 URL、HTML 語意、設計方向與活動頁。
- 先把 Design System 轉為 token／元件，再逐頁搬移。
- 每搬一頁，就和靜態基線做視覺、內容、可用性及 SEO 比對。
- Dokki 內容模型未驗證前，不把資料取得邏輯寫死在元件裡。

## 2. 技術選型條件

React 方案必須同時滿足：

1. 多頁路由可直接開啟、重新整理與分享。
2. 首頁、案例與未來文章可輸出完整 HTML，不能只依賴瀏覽器執行 SPA。
3. 支援 Cloudflare 的 preview／production 與回滾。
4. 靜態內容不需要每次請求啟動後端。
5. 未來可加入單一表單端點與 Dokki 建置時同步。
6. 不破壞 `/events/mangzhong-2026-0605/`。

正式選型前，以當時 Cloudflare 官方支援狀態驗證 React Router、Next.js／OpenNext 或其他 React SSG；不依過期範例直接定案。

## 3. 建議專案邊界

```text
src/
├── app/
│   ├── routes/
│   ├── layouts/
│   └── metadata/
├── components/
│   ├── navigation/
│   ├── editorial/
│   ├── work/
│   └── forms/
├── design-system/
│   ├── tokens.css
│   ├── typography.css
│   ├── primitives/
│   └── motion.ts
├── content/
│   ├── schemas/
│   ├── approved/
│   └── adapters/
└── assets/
public/
└── events/mangzhong-2026-0605/
```

内容 adapter 隔离 Dokki 与頁面元件。元件只接收已经過 schema 驗證、可公開的資料。

## 4. 遷移階段

### R0｜基線

- 固定靜態 MVP Git tag、Cloudflare deployment 與路由清單。
- 保存桌面／手機截圖、DOM heading、metadata 與性能基線。
- 把 `docs/penfungo-design-system.md` 的 token 轉成 CSS variables。

### R1｜共用外殼

- 建立 `SiteHeader`、`SiteFooter`、`SkipLink`、route metadata。
- 保持現有鍵盤、手機選單與 reduced-motion 行為。
- 不搬內容頁以前，先證明共用外殼可產出可索引 HTML。

### R2｜靜態品牌頁

- 依序搬移首頁、About、Services、Work、Contact。
- 案例資料先用受控靜態內容，不直接呼叫 Dokki。
- 每頁保留既有 URL 與 canonical。

### R3｜互動端點

- 若正式需求成立，加入聯絡表單的 Cloudflare server endpoint。
- 完成 validation、防濫用、通知、資料用途與觀察性。
- 端點失敗時，頁面仍提供可用的聯絡替代方案。

### R4｜地方筆記與 Dokki

- 定義 Article／Author／Asset／SEO schema。
- 先做人工核准後的建置時同步。
- 驗證更新、撤稿、slug 變更、圖片失效、快取與同步失敗。
- 通過後才把 Journal 加入導覽與 sitemap。

## 5. 元件規則

- 元件名稱表達內容任務，不以視覺形狀命名，如 `ProjectRecord` 优于 `BlueCard`。
- 页面 composition 可不同，共用 primitive 不复制。
- 避免在 JSX 內寫任意 hex、magic spacing 與 transition。
- Server-rendered／靜態輸出的正文預設可見；動畫只能 progressive enhancement。
- Link 使用真正路由連結，不以 click handler 模擬導航。
- 表單狀態以資料流驅動，不只改一段文字。

## 6. Content schema 起點

```ts
type PublicationStatus =
  | 'draft'
  | 'review'
  | 'approved'
  | 'published'
  | 'withdrawn'

type PublicAsset = {
  src: string
  alt: string
  credit?: string
  rightsStatus: 'approved'
}

type CaseStudy = {
  slug: string
  title: string
  summary: string
  status: PublicationStatus
  roles: string[]
  body: unknown
  assets: PublicAsset[]
  seo?: {
    title: string
    description: string
  }
}
```

production build 只能接受 `approved`／`published`，撤下狀態不輸出目的頁或 sitemap。

## 7. 不在遷移中順手加入

- 會員、登入與權限後台。
- 第二套文章 CMS。
- 商城、付款、訂閱。
- 全站搜尋或大型篩選器。
- 為了展示 React 而增加的動畫、3D 或長時間 pin。
- 未經核准的 Logo、照片、文案與案例成效。

## 8. 完成定義

- 所有既有公開 URL 保持或有明確 301。
- HTML、metadata、sitemap 與 JSON-LD 可在不執行 client JS 时读取。
- 靜態品牌頁與活動頁均通過視覺回歸。
- Lighthouse／Web Vitals 不低於靜態 MVP 的可接受基線。
- 鍵盤、焦點、手機選單、reduced motion 和 404 行為一致。
- Cloudflare preview、production 與 rollback 有文件化且實測。
- Design System token 和 Brand System 是元件與內容評審的共同依據。
