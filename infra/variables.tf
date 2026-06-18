variable "account_id" {
  description = "Cloudflare Account ID（Dashboard 右側欄可找到）"
  type        = string
}

variable "zone_id" {
  description = "penfungo.com 的 Cloudflare Zone ID（網域需先加入 Cloudflare 帳號）"
  type        = string
}

variable "domain" {
  description = "正式網域"
  type        = string
  default     = "penfungo.com"
}

variable "project_name" {
  description = "Cloudflare Pages 專案名稱（也決定 *.pages.dev 網址）"
  type        = string
  default     = "penfungo-web"
}
