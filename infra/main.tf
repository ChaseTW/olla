# main.tf — Terraform 與 Cloudflare provider 設定
#
# ⚠️  Cloudflare provider v4 → v5 有破壞性變更（資源改名、欄位改名，
#     例如 cloudflare_record → cloudflare_dns_record、value → content）。
#     此設定以 v5 撰寫；terraform init 後請對照你實際安裝版本的官方文件
#     再核對一次資源 schema。

terraform {
  required_version = ">= 1.6"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5"
    }
  }

  # 建議（非必要）：正式環境改用遠端 state，避免 state 檔遺失或衝突。
  # backend "s3" { ... }   # 例如指向 Cloudflare R2
}

provider "cloudflare" {
  # 認證請用環境變數，切勿寫進檔案：
  #   export CLOUDFLARE_API_TOKEN="..."
  #
  # API Token 所需權限（3 條）：
  #   Account · Cloudflare Pages : Edit
  #   Zone    · DNS              : Edit
  #   Zone    · Zone             : Read
}
