# 屏方根主網站｜Cloudflare Pages 上線計畫

版本：0.1  
規劃日期：2026-09-20  
狀態：執行計畫／尚未部署  
正式網域：`https://penfungo.com`  
Cloudflare Pages 專案：`penfungo-web`

## 1. 結論

沿用現有 Cloudflare Pages Direct Upload 專案，不遷移主機、不另建 CMS，也不先建立完整後端。

品牌主站接管網域根路徑；既有「順事・芒種」活動頁保留原網址：

| 網址 | 上線後用途 |
| --- | --- |
| `/` | 品牌首頁 |
| `/about/` | 關於我們 |
| `/services/` | 合作方式 |
| `/work/` | 合作案例索引 |
| `/work/[slug]/` | 案例內頁 |
| `/contact/` | 聯絡／合作入口 |
| `/events/mangzhong-2026-0605/` | 既有活動頁，網址不變 |

品牌網站與活動頁必須合併為同一份 `0605/` 部署輸出。不可只把候選版 `dist/` 上傳到既有 Pages 專案，否則該次部署不會自動保留未包含的活動檔案。

地方筆記與文章路由延後至 `v1.1.0`，首版導覽、首頁與 sitemap 不顯示未部署入口。

## 2. 現況基線

- Git remote：`git@github.com:ChaseTW/olla.git`
- 目前提交：`dafba5a90340ded294d47822ef1a054aa79e8a64`
- 目前 checkout：detached HEAD；實作前建立 `codex/penfungo-brand-site` 工作分支。
- Cloudflare Pages：Direct Upload，專案 `penfungo-web`，production branch 名稱為 `main`。
- 現行部署目錄：`0605/`。
- 現行根路徑由 `0605/_redirects` 以 302 導向活動頁。
- `penfungo.com` 已實測由 Cloudflare 回應，根路徑目前回傳 302 至既有活動頁。
- 現行部署方式：`npx wrangler pages deploy 0605 --project-name=penfungo-web --branch=main`。
- 本機與環境目前沒有可用的 Cloudflare API Token；開始遠端 preview／production 部署前需由專案擁有者提供最小權限憑證。

## 3. 版本策略

| 版本 | 用途 | 搜尋狀態 | 網站狀態 |
| --- | --- | --- | --- |
| `v0.1.0-rc.1` | 已封存的獨立設計候選包 | noindex | 僅作來源與本機驗證 |
| `v0.1.0-rc.2` | 整合進原 codebase 的 Cloudflare preview | noindex | 驗證 9 頁主站與活動頁共存 |
| `v1.0.0` | 靜態主站正式發布，不含地方筆記 | 僅核准頁面 index | 根網址切換為品牌主站 |
| `v1.1.0` | 地方筆記與 Dokki 發布流程 | 只索引核准文章 | 補文章索引與詳細頁 |

每個版本均保留 Git 提交與部署紀錄。不得直接覆寫 `v0.1.0-rc.1`，也不得覆寫 A／B／C 設計留存檔。

## 4. 檔案整合

候選版來源：

`/Users/chase/.codex/visualizations/2026/09/04/01a06c77-1ba3-7d73-86ac-721838bd6fcc/penfungo-release-v0.1.0-rc.1/dist/`

目標配置：

```text
0605/
├── index.html                       # 新品牌首頁
├── shared.css
├── shared.js
├── penfungo-assets/
├── about/index.html
├── services/index.html
├── contact/index.html
├── work/
│   ├── index.html
│   └── [case]/index.html
├── events/
│   └── mangzhong-2026-0605/         # 原樣保留
├── _headers
├── _redirects
├── robots.txt
├── sitemap.xml
└── 404.html                         # 新增
```

整合時：

1. 刪除 `_redirects` 中 `/ → /events/...` 的暫時 302；保留活動頁 `index.html` 正規化規則。
2. 保留 `events/mangzhong-2026-0605/` 的所有正式資產與網址。
3. 保留 `.assetsignore` 對原始大圖、原始字型與開發檔案的排除。
4. 新增品牌圖片快取規則；字型與活動素材沿用現有規則。
5. 為不存在的路徑提供品牌化 `404.html`，不把所有錯誤路徑重寫到首頁。
6. 正式部署檔不得包含設計手冊、開發說明、SHA 清單或內部研究。

## 5. 內容發布邊界

### RC2 可以包含

- 首版 9 頁完整構圖與路由；地方筆記 4 頁不納入部署。
- 明確的「預覽／待定稿」聲明。
- AI 概念影像，但不得當作真實人物、場域或案例證據。
- 不會送出的表單示意，或更佳地在 preview 階段改為停用狀態。
- 全站 `noindex,nofollow`。

### v1.0.0 才能包含

- 經核對的正式 Logo、標準字與授權照片。
- 經核准的品牌文案、案例名稱、角色、成果與合作夥伴。
- 已驗證的聯絡管道、資料用途與回覆安排。
- 唯一 title／description、canonical、Open Graph、sitemap 和必要 JSON-LD。

未核准案例應先下架或維持 noindex，不用示意內容補滿 production。地方筆記首版整體不上線，不保留空白入口。

## 6. Dokki 與網站

第一階段不做即時 Dokki API 串接。Dokki 繼續是內容與決策主檔，網站只呈現核准的公開版本。

- `v1.0.0`：從 Dokki 的核准稿受控地輸出首頁、關於、合作方式與案例等靜態頁面。
- `v1.1.0`：加入地方筆記；確認 Dokki 有穩定、允許正式網站使用的讀取／發布介面後，再決定受控建置或自動同步。
- 自動同步必須有公開狀態、slug、更新、撤稿、圖片、SEO 欄位、錯誤與快取規則。
- Dokki 或 MCP 憑證不得放入瀏覽器端 JavaScript。

這個分期能避免為了等待整合介面而阻塞主網站，也避免建立第二套內容後台。

## 7. 後端與表單

首版主站不需要完整後端；後續地方筆記採靜態輸出時同樣不需要資料庫。

聯絡功能二擇一：

1. **首版建議**：先顯示已驗證的電子郵件或其他正式聯絡方式，暫不顯示可送出的表單。
2. 若需表單：新增單一 Cloudflare Pages Function，負責伺服器端驗證、防濫用、寄送通知、成功／失敗狀態與最低限度紀錄。不得在前端假裝送出成功。

登入、資料庫、會員、商城、訂閱與即時 API 不在本次範圍。

## 8. Preview 發布

### 準備

1. 建立 `codex/penfungo-brand-site` 分支。
2. 記錄目前 production 提交與 Cloudflare 部署 ID，作為回滾基線。
3. 將候選版合併到 `0605/`，完成路徑、headers、redirects、robots 和 sitemap 的 preview 設定。
4. 本機啟動 `0605/` 根目錄，逐頁驗證品牌站與活動頁。

### Cloudflare preview

```sh
npx -y wrangler pages deploy 0605 \
  --project-name=penfungo-web \
  --branch=brand-rc-2
```

preview URL 預期為 `brand-rc-2.penfungo-web.pages.dev`，實際網址以 Wrangler 回傳為準。Preview deployment 仍可能被知道網址的人存取；內容若不能外流，需先加 Cloudflare Access，不能只把 noindex 當權限控制。

Preview 驗收完成前，不使用 `--branch=main`。

## 9. 驗收清單

### 路由與回歸

- 首版品牌 9 頁均直接開啟、重新整理、上一頁與分享正常；沒有指向地方筆記的失效入口。
- 根網址不再跳轉活動頁。
- 既有活動網址、圖片、字型、互動、報名連結及 SEO 結構沒有回歸。
- 所有內部連結、圖片、CSS、JS、favicon 和 404 均無缺檔。

### 視覺與可用性

- 手機、平板、桌面主要斷點。
- 鍵盤操作、可見焦點、跳到主要內容、表單標籤與錯誤狀態。
- `prefers-reduced-motion` 下正文仍可閱讀。
- 圖片尺寸、首屏速度、CLS 與長文閱讀性。
- Chrome、Safari，至少再驗證一個 Firefox／Edge。

### 內容與搜尋

- 預覽聲明、AI 影像和未核准內容沒有被誤當正式資料。
- production 頁面沒有殘留「編輯試稿」「設計預覽」或內部開發說明。
- canonical、OG URL、sitemap 與正式路徑一致。
- 正式站只讓已核准頁面被索引；preview 全站 noindex。

## 10. Production 與回滾

Production 前須由品牌／內容負責人確認公開清單，再執行：

```sh
npx -y wrangler pages deploy 0605 \
  --project-name=penfungo-web \
  --branch=main
```

發布後立即驗證根網址、主要路由、活動頁、robots、sitemap、canonical、404 與 HTTP headers。

回滾方式：

1. 優先使用 Cloudflare Pages 的上一個成功 production deployment 回滾。
2. 若需重新部署，從發布前 Git tag／提交重建原 `0605/` 並以 `main` 上傳。
3. 回滾後驗證根網址重新導向活動頁，以及活動頁資產與報名入口。

正式發布前建立 `prod-before-brand-homepage-2026-09` tag；发布成功後建立 `v1.0.0` tag。

## 11. 執行順序與完成定義

### Phase A｜整合 RC2

- 建立工作分支。
- 合併品牌站與活動站。
- 更新 Cloudflare Pages 特殊檔案。
- 完成本機自動與瀏覽器檢查。

完成定義：可從一個 `0605/` 根目錄完整瀏覽品牌站與原活動頁，無斷鏈與資產缺失。

### Phase B｜Cloudflare Preview

- 取得最小權限 API Token。
- 記錄現行 production deployment。
- 部署 `brand-rc-2` preview 並驗收。

完成定義：Cloudflare preview 路由、畫面、headers、活動頁和 noindex 均符合預期。

### Phase C｜內容與正式資產

- 由 Dokki 取得經核准公開稿。
- 替換 Logo、照片與案例；地方筆記留待下一版。
- 決定聯絡方案並補 SEO／GEO。

完成定義：所有公開頁均有來源、授權與負責人確認，沒有示意成功或占位事實。

### Phase D｜Production

- 建立發布前 tag／部署快照。
- 部署 `main`。
- 執行 smoke test 與搜尋設定驗證。
- 將實際版本、部署時間、deployment ID 與回滾點寫回 Dokki。

完成定義：`penfungo.com` 顯示品牌首頁，既有活動頁原網址正常，且可在已記錄的回滾時間內恢復上一版。

## 12. 目前阻塞

以下項目不阻塞 Phase A 本機整合，但會阻塞相應階段：

- Phase B：缺 Cloudflare API Token。
- Phase C／D：缺正式 Logo／照片、案例公開核准、正式聯絡管道。
- Phase D：缺 production 公開清單與最终发布确认。
