#!/bin/bash
# deploy.sh — Portfólio
# Uso: ./deploy.sh "mensagem de commit"

set -e
MSG="${1:-update: portfolio}"

echo "📦 Commitando alterações..."
git add -A
git commit -m "$MSG" || echo "ℹ️  Nada para commitar."

echo "🚀 Push para GitHub..."
git push origin main

echo "✅ Deploy concluído! https://joaopgcoelho.github.io/portifolio/"
