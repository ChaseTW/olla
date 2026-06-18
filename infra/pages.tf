# pages.tf — Cloudflare Pages 專案 + 自訂網域 + DNS
#
# 分工：Terraform 只建「基礎設施」；網站檔案本身由 Wrangler 推送：
#   wrangler pages deploy 0605 --project-name=penfungo-web

# ── Pages 專案（Direct Upload 型；不接 Git，內容用 Wrangler 推送）──
resource "cloudflare_pages_project" "site" {
  account_id        = var.account_id
  name              = var.project_name
  production_branch = "main"
  # 無 source 區塊 = Direct Upload 專案。
  # 日後若改成 Git 自動部署，於此加入 source { ... } 與 build_config { ... }。
}

# ── 綁定自訂網域 penfungo.com ──
resource "cloudflare_pages_domain" "apex" {
  account_id   = var.account_id
  project_name = cloudflare_pages_project.site.name
  name         = var.domain
}

# ── DNS：apex 指向 Pages（Cloudflare 自動 CNAME flatten）──
# 注意：在同帳號下新增 Pages 自訂網域時，Cloudflare 有時會「自動」建立此紀錄。
#       若 apply 出現 conflict，請改用 `terraform import` 匯入，或移除此資源。
resource "cloudflare_dns_record" "apex" {
  zone_id = var.zone_id
  name    = var.domain
  type    = "CNAME"
  content = "${cloudflare_pages_project.site.name}.pages.dev"
  proxied = true
  ttl     = 1

  depends_on = [cloudflare_pages_domain.apex]
}

# Web Analytics 不用 Terraform 管 —— 沒有對應的 API token 權限群組，
# 且後台一鍵即可開啟。上線後到 Dashboard →（帳號）→ Analytics & Logs
# → Web Analytics → Add a site 啟用即可。

# ── 輸出 ──
output "pages_dev_url" {
  description = "Pages 預設網址；綁定自訂網域生效前先用這個測試"
  value       = "https://${var.project_name}.pages.dev"
}

output "production_url" {
  description = "正式網址"
  value       = "https://${var.domain}/"
}
