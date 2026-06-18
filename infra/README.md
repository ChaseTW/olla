# infra — Cloudflare 基礎設施（Terraform）

用 Terraform 管理 `penfungo.com` 的 Cloudflare Pages 專案、自訂網域與 DNS。
**Terraform 只建基礎設施，不上傳網站檔案** —— 檔案由 Wrangler 推送。
（Web Analytics 不走 Terraform：後台一鍵開啟即可。）

## 前置作業

1. 安裝 [Terraform](https://developer.hashicorp.com/terraform/install)（>= 1.6）。
2. `penfungo.com` 已加入 Cloudflare 帳號（取得 Zone ID）。
3. 建立 Cloudflare API Token，權限（3 條）：
   - Account · Cloudflare Pages : Edit
   - Zone · DNS : Edit
   - Zone · Zone : Read

## 使用方式

```bash
cd infra
cp terraform.tfvars.example terraform.tfvars   # 填入 account_id / zone_id
export CLOUDFLARE_API_TOKEN="你的 token"

terraform init
terraform plan      # 檢視將建立的資源
terraform apply     # 一次性：建立 Pages 專案 + 網域 + DNS
```

## 部署網站內容（每次更新都做這步）

Terraform 跑完只是建好「空專案」。實際網站檔案用 Wrangler 推送：

```bash
npx wrangler pages deploy ../0605 --project-name=penfungo-web
```

## 注意

- Cloudflare provider v4 → v5 有破壞性變更；`terraform init` 後請對照
  實際安裝版本的官方文件核對資源 schema。
- 新增 Pages 自訂網域時，Cloudflare 有時會自動建立 DNS 紀錄；若
  `apply` 出現衝突，改用 `terraform import` 匯入 `cloudflare_dns_record.apex`。
