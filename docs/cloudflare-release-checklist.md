# 屏方根主網站｜Cloudflare Pages 發布、驗收與回滾清單

版本：`v0.1`  
更新日期：2026-09-20  
適用專案：Cloudflare Pages `penfungo-web`（Direct Upload）  
正式網域：`https://penfungo.com`  
Production branch：`main`  
Preview branch：`brand-mvp-v1`

## 1. 發布邊界

- Cloudflare Pages 的部署輸出一律是完整的 `0605/`，不是只上傳品牌站新增檔案。
- 必須保留 `/events/mangzhong-2026-0605/` 及其圖片、字型、互動、報名連結與既有 SEO 結構。
- 首版不發布「地方筆記」：`journal/` 不得進入部署輸出、導覽、首頁連結或 sitemap，公開網址應回傳 `404`。
- 主站首版為靜態資源；除非另行核准並實作 Cloudflare Pages Function，聯絡表單不得呈現為可成功送出。
- Preview 使用 `brand-mvp-v1`；只有完成驗收後才可部署 `main`。
- 不執行 Terraform `apply`。現有 Pages 專案、網域與 DNS 已存在，本次只是更新網站內容。

## 2. 目前已知狀態與硬性閘門

截至 2026-09-20，本機與 Cloudflare 實測：

- Git branch：`main`
- 活動站整合前基線 commit：`dafba5a90340ded294d47822ef1a054aa79e8a64`
- MVP 程式與規範 commit：`1dec8f2`
- `main` 已推送至 `origin/main`；品牌站檔案已納入版控。
- Wrangler OAuth：已登入，可查詢與部署 `penfungo-web`。
- `CLOUDFLARE_API_TOKEN` 與 `.cloudflare_token` 未使用；目前互動式操作以 OAuth 完成。
- Preview deployment：`9ce17207-10d1-4ae9-9315-e9154af0c692`
- 發布前 production deployment：`12f2f20c-78dc-4c3c-b60e-32805e9bd860`

不得把 OAuth／API Token 寫入文件、原始碼、commit、終端截圖或 Dokki 公開內容。若改為 CI 自動部署，另建立最小權限 API Token，並只存於 CI secret。

最小權限至少需要：

- Account · Cloudflare Pages · Edit
- 若只做網站內容部署，不需要同時執行 DNS／Zone 變更。

> `noindex` 不是存取控制。Preview deployment 預設可被知道網址的任何人開啟；`X-Robots-Tag: noindex` 只要求搜尋引擎不要索引，不能保護未公開文案、客戶資料或圖片。若 RC2 含不可外流內容，必須先在 Cloudflare Dashboard 為 Preview deployments 啟用 Cloudflare Access，或不要上傳該內容。

## 3. 固定變數

以下指令均從 repository 根目錄執行：

```sh
PROJECT_NAME=penfungo-web
DEPLOY_DIR=0605
PREVIEW_BRANCH=brand-mvp-v1
PRODUCTION_BRANCH=main
EVENT_PATH=events/mangzhong-2026-0605
```

互動式發布先確認 Wrangler OAuth 狀態：

```sh
npx -y wrangler whoami
```

若改用 Makefile／CI，則優先讀取 `CLOUDFLARE_API_TOKEN`，否則讀取 `.cloudflare_token`。下列檢查不得印出 token 內容：

```sh
test -n "$CLOUDFLARE_API_TOKEN" || test -s .cloudflare_token
```

## 4. Preflight｜部署前檢查

### 4.1 來源與版本

- [ ] `git status --short --branch` 顯示預期分支，沒有未理解或未納入版本的變更。
- [ ] 記錄本次 RC2 commit：`git rev-parse HEAD`。
- [ ] 確認 `0605/` 是完整、唯一的部署輸出，不從獨立候選包直接部署。
- [ ] 確認本次只改網站內容，沒有意外修改 `infra/`、DNS 或 Pages 專案設定。
- [ ] 記錄整合前活動站基線 commit：`dafba5a90340ded294d47822ef1a054aa79e8a64`。

### 4.2 輸出範圍

```sh
test -f 0605/index.html
test -f 0605/about/index.html
test -f 0605/services/index.html
test -f 0605/contact/index.html
test -f 0605/work/index.html
test -f 0605/events/mangzhong-2026-0605/index.html
test ! -e 0605/journal
```

- [ ] `0605/journal/` 不存在。
- [ ] 導覽、首頁與內容中沒有公開 `/journal/` 連結：

```sh
rg -n "href=[\"']/?journal(?:/|[\"'#?])" 0605 \
  --glob '*.html' --glob '*.js' || true
```

- [ ] `sitemap.xml` 不含 `/journal/`，且只列入首版核准公開的品牌頁與活動頁。
- [ ] 正式輸出不含 `RELEASE.md`、SHA 清單、設計手冊、研究文件、預覽說明或來源素材。
- [ ] `.assetsignore` 仍排除 `img/`、`fonnts/`、`font-preview.html`、`puremosa_final.html` 和活動頁備份。

### 4.3 Cloudflare 特殊檔案

- [ ] `_redirects` 已移除根路徑導向活動頁的暫時 `302`。
- [ ] `_redirects` 保留活動頁 `index.html` 到乾淨網址的 `301` 正規化。
- [ ] 沒有把未知路徑全部重寫到首頁；缺頁應由品牌 `404.html` 處理。
- [ ] `_headers` 保留全站安全標頭與活動頁快取規則，並補入品牌站靜態素材規則。
- [ ] `robots.txt`、`sitemap.xml` 位於 `0605/` 根目錄。
- [ ] Preview 頁面以 Cloudflare 預設 `X-Robots-Tag: noindex` 加上頁面 meta 作雙重檢查；production 不可殘留全站 `noindex`。

### 4.4 靜態檔與連結檢查

```sh
find 0605 -type f | sort
find 0605 -type f -size +25M -print
git diff --check
```

- [ ] 沒有單檔超過 Cloudflare Pages Wrangler 上傳上限 25 MiB。
- [ ] 檔案總數低於 Wrangler Direct Upload 的 20,000 個檔案上限。
- [ ] 所有 HTML 的 CSS、JS、圖片、favicon 與內部連結都能解析到 `0605/` 內的實體檔案。
- [ ] 正式頁沒有「設計預覽」「編輯試稿」「資料未傳送」「待確認」等內部／占位字樣。
- [ ] AI 概念圖沒有被描述成真實人物、場域、合作成果或紀錄照片。
- [ ] 聯絡入口是已驗證管道；若表單沒有後端，表單保持停用或移除。

### 4.5 本機 smoke test

從 `0605/` 根目錄啟動，不只預覽活動子目錄：

```sh
python3 -m http.server 8770 --directory 0605
```

逐一檢查：

- [ ] `/`
- [ ] `/about/`
- [ ] `/services/`
- [ ] `/work/`
- [ ] 每個首版公開案例頁
- [ ] `/contact/`
- [ ] `/events/mangzhong-2026-0605/`
- [ ] `/robots.txt`
- [ ] `/sitemap.xml`
- [ ] `/journal/` 應為 `404`
- [ ] 隨機不存在路徑應為 `404`

> Python 靜態伺服器不會套用 Cloudflare `_headers`、`_redirects` 或自訂 404 行為；這三項必須在 Preview 再驗。

## 5. Preview｜`brand-mvp-v1`

### 5.1 取得遠端基線

確認 Wrangler 已登入後，先列出現有 deployment。下列環境變數僅供 API Token／CI 流程；互動式 OAuth 不必設定 token：

```sh
export CLOUDFLARE_API_TOKEN='由專案擁有者提供的 token'
export CLOUDFLARE_ACCOUNT_ID='243d322c6ffaec5be3a06d4525582630'
npx -y wrangler pages deployment list --project-name=penfungo-web
```

- [ ] 記錄當前成功 production deployment ID、建立時間與 URL。
- [ ] 在 Cloudflare Dashboard 確認 production branch 是 `main`。
- [ ] 若內容不可公開，先確認 Preview deployments 已啟用 Cloudflare Access。

### 5.2 部署 Preview

```sh
CLOUDFLARE_API_TOKEN="$CLOUDFLARE_API_TOKEN" \
CLOUDFLARE_ACCOUNT_ID="$CLOUDFLARE_ACCOUNT_ID" \
npx -y wrangler pages deploy 0605 \
  --project-name=penfungo-web \
  --branch=brand-mvp-v1
```

- [ ] 保存 Wrangler 回傳的唯一 deployment URL 與 deployment ID。
- [ ] 保存分支別名；預期格式為 `brand-mvp-v1.penfungo-web.pages.dev`，以 Wrangler／Dashboard 實際結果為準。
- [ ] 確認 production 自訂網域 `penfungo.com` 沒有受到 preview 部署影響。

### 5.3 Preview 驗收

用唯一 deployment URL 驗收，不只看會更新的分支別名：

```sh
for path in / /about/ /services/ /work/ /contact/ \
  /events/mangzhong-2026-0605/ /journal/ /robots.txt /sitemap.xml; do
  curl -sS -o /dev/null -w "%{http_code}  %{url_effective}\n" \
    "https://<preview-deployment-url>${path}"
done
curl -sSIL "https://<preview-deployment-url>/"
```

- [ ] `/` 回傳 `200`，且不再 `302` 至活動頁。
- [ ] `/about/`、`/services/`、`/work/`、核准案例與 `/contact/` 回傳 `200`。
- [ ] `/journal/` 及文章舊路徑回傳 `404`，沒有 fallback 到首頁。
- [ ] 活動頁回傳 `200`；圖片、字型、動畫、導覽、倒數與 SurveyCake 報名連結正常。
- [ ] `X-Robots-Tag: noindex` 出現在 Preview 回應。
- [ ] Preview HTML 另含 `meta robots=noindex,nofollow`。
- [ ] `robots.txt` 和 `sitemap.xml` 可讀，sitemap 不含地方筆記。
- [ ] `_headers` 的安全標頭、品牌素材快取與活動素材快取符合預期。
- [ ] 手機、平板與桌面主要斷點正常。
- [ ] Chrome、Safari，以及 Firefox 或 Edge 至少一個通過。
- [ ] 鍵盤、焦點、跳到主要內容、`prefers-reduced-motion` 和對比可用。
- [ ] 沒有混合內容、404 資產、主控台錯誤或明顯 CLS。
- [ ] 品牌／內容負責人簽核首版公開頁清單。

Preview 驗收失敗時，不得以 `--branch=main` 重試；修正後重新部署 `brand-mvp-v1`，並用新的唯一 deployment URL 完整回歸。

### 5.4 2026-09-20 實際發布紀錄

- Git source：`1dec8f2`
- Deployment ID：`9ce17207-10d1-4ae9-9315-e9154af0c692`
- 唯一網址：`https://9ce17207.penfungo-web.pages.dev/`
- 分支別名：`https://brand-mvp-v1.penfungo-web.pages.dev/`
- 驗證結果：品牌主要路由與既有活動頁 `200`；`/journal/` `404`；Preview 回應含 `X-Robots-Tag: noindex`。
- Production 狀態：`https://penfungo.com/` 仍維持發布前活動頁 `302`，未被 Preview 變更。

## 6. Production｜`main`

### 6.1 Go / No-Go

Production 部署前全部勾選：

- [ ] RC2 唯一 deployment URL 已完成技術與內容驗收。
- [ ] RC2 對應的 Git commit 已固定且可重建。
- [ ] 已保存部署前 production deployment ID。
- [ ] 已建立並推送發布前回滾 tag，例如 `prod-before-brand-homepage-2026-09`。
- [ ] 正式輸出只包含已核准內容與授權素材。
- [ ] 已移除品牌正式頁的 `noindex,nofollow`。
- [ ] 地方筆記仍未進部署輸出、導覽與 sitemap。
- [ ] 活動頁完整保留。
- [ ] 已安排發布人、驗收人、回滾人與至少 30 分鐘觀察窗口。

### 6.2 Production 部署

`make deploy` 等同把 `0605/` 發布到 `main`。為避免分支推斷差異，正式發布保留明確 branch：

```sh
CLOUDFLARE_API_TOKEN="$CLOUDFLARE_API_TOKEN" \
CLOUDFLARE_ACCOUNT_ID="$CLOUDFLARE_ACCOUNT_ID" \
npx -y wrangler pages deploy 0605 \
  --project-name=penfungo-web \
  --branch=main
```

- [ ] 保存新 production deployment ID、唯一 URL、時間與對應 commit。
- [ ] 不執行第二次部署來「確認」；先對已產生的 deployment 做驗收。

### 6.3 發布後 smoke test

```sh
for path in / /about/ /services/ /work/ /contact/ \
  /events/mangzhong-2026-0605/ /journal/ /robots.txt /sitemap.xml; do
  curl -sS -o /dev/null -w "%{http_code}  %{url_effective}\n" \
    "https://penfungo.com${path}"
done
curl -sSIL https://penfungo.com/
```

- [ ] 根網址回傳 `200` 品牌首頁，不再導向活動頁。
- [ ] 品牌主路由與核准案例頁回傳 `200`。
- [ ] 地方筆記回傳 `404`。
- [ ] 活動頁與其資產、互動及報名入口正常。
- [ ] production 品牌頁沒有 `X-Robots-Tag: noindex` 或 meta `noindex`。
- [ ] canonical、Open Graph、JSON-LD 與 sitemap 全部使用正式 `https://penfungo.com/...`。
- [ ] 404、HTTP 安全標頭與快取策略生效。
- [ ] 從外部網路和至少一支手機實測，不只在開發機驗收。
- [ ] 觀察 30 分鐘，確認沒有大量 404、資產失敗或使用者回報。

全部通過後：

- [ ] 建立 `v1.0.0` Git tag。
- [ ] 將版本、commit、deployment ID、發布時間、驗收人與回滾點寫回 Dokki。
- [ ] 保留 RC2 與上一個 production deployment，不立刻刪除。

## 7. Rollback｜回滾

### 7.1 立即回滾條件

出現以下任一狀況就回滾，不在 production 直接修補：

- 根網址、核心品牌頁或活動頁無法開啟。
- 活動頁素材、報名入口或既有互動回歸。
- 未核准／敏感內容、地方筆記或內部文件被公開。
- 全站錯誤 redirect、資產大量 404、錯誤快取或明顯安全問題。
- production 意外保留全站 `noindex`，且無法立即確認影響範圍。

### 7.2 首選：Cloudflare Pages Dashboard 回滾

1. Workers & Pages → `penfungo-web` → Deployments。
2. 找到發布前記錄的成功 **production** deployment。
3. 開啟動作選單，選擇 **Rollback to this deployment**。
4. 確認 production 已切回舊 deployment。

Preview deployment 不能作為 rollback 目標；只能回滾到先前成功的 production deployment。

### 7.3 備援：從 Git 基線重建並重新部署

若 Dashboard 回滾不可用：

1. 從發布前 tag／commit 在獨立乾淨 worktree 重建舊版 `0605/`。
2. 確認舊版根路徑導向活動頁的 `302` 與活動資產完整。
3. 使用相同 Wrangler 指令部署到 `--branch=main`。
4. 記錄新的 deployment ID，避免把「重新部署」誤記成原部署回滾。

### 7.4 回滾後驗收

- [ ] `https://penfungo.com/` 恢復原本導向活動頁的行為。
- [ ] `/events/mangzhong-2026-0605/` 回傳 `200`。
- [ ] 活動頁圖片、字型、互動與 SurveyCake 報名入口正常。
- [ ] `robots.txt`、`sitemap.xml` 與舊版一致。
- [ ] CDN 回應不再混用新舊資產；若確認是快取問題，再由 Cloudflare Dashboard 執行必要的 cache purge。
- [ ] 在 Dokki 記錄事故、回滾時間、來源 deployment、目標 deployment、影響與後續修正。

## 8. 發布紀錄模板

```text
Release: v0.1.0-rc.2 / v1.0.0
Git commit:
Cloudflare project: penfungo-web
Environment: preview brand-mvp-v1 / production main
Deployment ID:
Unique deployment URL:
Branch alias:
Published at (Asia/Taipei):
Published by:
Validated by:
Previous production deployment ID:
Rollback target:
Public routes:
Excluded routes: /journal/**
Known limitations:
Result: pass / rollback
```

## 9. 官方參考

- [Cloudflare Pages Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)
- [Cloudflare Pages Preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/)
- [Cloudflare Pages Rollbacks](https://developers.cloudflare.com/pages/configuration/rollbacks/)
- [Cloudflare Pages Headers](https://developers.cloudflare.com/pages/configuration/headers/)
