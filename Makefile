# ═══════════════════════════════════════════════════════════════
#  Makefile — 屏方根主網站與活動頁 · penfungo.com
#
#    make preview      本機預覽完整網站（http://localhost:8000）
#    make preview-react 建置並預覽 React 候選版
#    make build-react   產出 React 預渲染版本到 dist-react/
#    make preview-event 只預覽既有活動頁
#    make deploy       部署網站內容到 Cloudflare Pages
#    make plan         Terraform：預覽基礎設施變更
#    make apply        Terraform：套用基礎設施變更
#    make infra-init   Terraform：初始化（首次或換 provider 後）
#
#  認證（deploy / plan / apply 需要 Cloudflare API token）—— 擇一：
#    1. export CLOUDFLARE_API_TOKEN=你的token
#    2. 把 token 單獨寫進 .cloudflare_token 檔
#       （內含密鑰：勿外流、勿進版控）
# ═══════════════════════════════════════════════════════════════

PROJECT    := penfungo-web
DEPLOY_DIR := 0605
SITE_DIR   := 0605
EVENT_DIR  := 0605/events/mangzhong-2026-0605
REACT_DIR  := dist-react
ACCOUNT_ID := 243d322c6ffaec5be3a06d4525582630
PORT       := 8000

# token：環境變數優先，否則讀 .cloudflare_token 檔
CF_TOKEN := $(or $(CLOUDFLARE_API_TOKEN),$(strip $(shell cat .cloudflare_token 2>/dev/null)))

.DEFAULT_GOAL := help
.PHONY: help preview preview-react build-react preview-event deploy plan apply infra-init _token

help:
	@echo "屏方根主網站 · penfungo.com"
	@echo ""
	@echo "  make preview      完整網站預覽 → http://localhost:$(PORT)"
	@echo "  make preview-react React 候選版預覽 → http://localhost:$(PORT)"
	@echo "  make build-react  建置 React 預渲染輸出 → $(REACT_DIR)/"
	@echo "  make preview-event 既有活動頁預覽 → http://localhost:$(PORT)"
	@echo "  make deploy       部署網站內容到 Cloudflare Pages"
	@echo "  make plan         Terraform 預覽基礎設施變更"
	@echo "  make apply        Terraform 套用基礎設施變更"
	@echo "  make infra-init   Terraform 初始化"
	@echo ""
	@echo "  認證：export CLOUDFLARE_API_TOKEN=xxx  或寫入 .cloudflare_token 檔"

# 本機靜態預覽伺服器
preview:
	@echo "預覽 → http://localhost:$(PORT)   （Ctrl+C 結束）"
	@python3 -m http.server $(PORT) --directory $(SITE_DIR)

build-react:
	@npm run build

preview-react: build-react
	@echo "React 候選版 → http://localhost:$(PORT)   （Ctrl+C 結束）"
	@python3 -m http.server $(PORT) --directory $(REACT_DIR)

preview-event:
	@echo "活動頁預覽 → http://localhost:$(PORT)   （Ctrl+C 結束）"
	@python3 -m http.server $(PORT) --directory $(EVENT_DIR)

# 內部：確認 token 存在，否則中止並提示
_token:
	@test -n "$(CF_TOKEN)" || { \
	  echo "✗ 找不到 Cloudflare API token"; \
	  echo "  解法：export CLOUDFLARE_API_TOKEN=xxx  或建立 .cloudflare_token 檔"; \
	  exit 1; }

# 部署網站內容到 Cloudflare Pages（production / branch=main）
deploy: _token
	@CLOUDFLARE_API_TOKEN="$(CF_TOKEN)" CLOUDFLARE_ACCOUNT_ID="$(ACCOUNT_ID)" \
	  npx -y wrangler pages deploy $(DEPLOY_DIR) \
	    --project-name=$(PROJECT) --branch=main

# Terraform 初始化（首次執行，或更新 provider 後）
infra-init:
	@cd infra && terraform init -input=false

# Terraform 預覽基礎設施變更
plan: _token
	@cd infra && CLOUDFLARE_API_TOKEN="$(CF_TOKEN)" terraform plan

# Terraform 套用基礎設施變更（會要求輸入 yes 確認）
apply: _token
	@cd infra && CLOUDFLARE_API_TOKEN="$(CF_TOKEN)" terraform apply
