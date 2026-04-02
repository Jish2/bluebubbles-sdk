#!/usr/bin/env bash
# Generate BlueBubbles client SDKs from openapi.yaml
#
# Usage:
#   ./scripts/generate.sh              # Generate all languages
#   ./scripts/generate.sh typescript   # Generate a specific language
#   ./scripts/generate.sh typescript python dart

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONFIG_DIR="$REPO_ROOT/config/languages"
SPEC_FILE="$REPO_ROOT/openapi.yaml"

# ─── Detect generator runtime ────────────────────────────────────────────────

detect_runner() {
  if command -v npx &>/dev/null; then
    echo "npx"
  elif command -v docker &>/dev/null; then
    echo "docker"
  elif command -v openapi-generator-cli &>/dev/null; then
    echo "global"
  else
    echo ""
  fi
}

run_generator() {
  local config_file="$1"
  local runner
  runner=$(detect_runner)

  case "$runner" in
    npx)
      npx --yes @openapitools/openapi-generator-cli generate \
        -c "$config_file" \
        --skip-validate-spec
      ;;
    docker)
      docker run --rm \
        -v "$REPO_ROOT:/workspace" \
        openapitools/openapi-generator-cli generate \
        -c "/workspace/${config_file#$REPO_ROOT/}" \
        --skip-validate-spec
      ;;
    global)
      openapi-generator-cli generate \
        -c "$config_file" \
        --skip-validate-spec
      ;;
    *)
      echo "ERROR: No generator runtime found."
      echo "Install one of:"
      echo "  - Node.js (https://nodejs.org) — recommended, uses npx automatically"
      echo "  - Docker  (https://docker.com)"
      echo "  - openapi-generator-cli globally: npm i -g @openapitools/openapi-generator-cli"
      exit 1
      ;;
  esac
}

# ─── Validate spec ────────────────────────────────────────────────────────────

validate_spec() {
  echo "Validating $SPEC_FILE ..."
  local runner
  runner=$(detect_runner)
  case "$runner" in
    npx)
      npx --yes @openapitools/openapi-generator-cli validate -i "$SPEC_FILE" || true
      ;;
    docker)
      docker run --rm \
        -v "$REPO_ROOT:/workspace" \
        openapitools/openapi-generator-cli validate -i /workspace/openapi.yaml || true
      ;;
    global)
      openapi-generator-cli validate -i "$SPEC_FILE" || true
      ;;
  esac
}

# ─── Generate one language ────────────────────────────────────────────────────

generate_one() {
  local lang="$1"
  local config_file="$CONFIG_DIR/${lang}.yaml"

  if [[ ! -f "$config_file" ]]; then
    echo "ERROR: No config found for language '$lang'."
    echo "Expected: $config_file"
    echo ""
    echo "Available languages:"
    for f in "$CONFIG_DIR"/*.yaml; do
      echo "  $(basename "$f" .yaml)"
    done
    exit 1
  fi

  echo ""
  echo "━━━ Generating: $lang ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "    config : $config_file"

  run_generator "$config_file"

  echo "    done    → sdks/$lang/"
}

# ─── Generate all languages ───────────────────────────────────────────────────

generate_all() {
  local langs=()
  for f in "$CONFIG_DIR"/*.yaml; do
    langs+=("$(basename "$f" .yaml)")
  done

  if [[ ${#langs[@]} -eq 0 ]]; then
    echo "No language configs found in $CONFIG_DIR"
    exit 1
  fi

  echo "Generating SDKs for: ${langs[*]}"

  for lang in "${langs[@]}"; do
    generate_one "$lang"
  done
}

# ─── Entry point ─────────────────────────────────────────────────────────────

cd "$REPO_ROOT"

validate_spec

if [[ $# -eq 0 ]]; then
  generate_all
else
  for lang in "$@"; do
    generate_one "$lang"
  done
fi

echo ""
echo "Done. Generated SDKs are in sdks/."
