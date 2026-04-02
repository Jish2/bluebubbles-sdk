#!/usr/bin/env bash
# Generate BlueBubbles client SDKs from openapi.yaml
#
# Usage:
#   ./scripts/generate.sh              # Generate all languages
#   ./scripts/generate.sh typescript   # Generate a specific language
#   ./scripts/generate.sh typescript python dart

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SPEC_FILE="$REPO_ROOT/openapi.yaml"

# ─── Language-specific generators ─────────────────────────────────────────────
# Each language has its own generate function using the best tool for that
# language. Add a new function + entry in ALL_LANGUAGES to support a new lang.

generate_typescript() {
  echo "━━━ Generating: typescript ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "    tool: openapi-typescript"

  cd "$REPO_ROOT/sdks/typescript"
  npm run generate
  echo "    done → sdks/typescript/"
}

# Placeholder generators for future languages — uncomment and implement when ready.
#
# generate_python() {
#   echo "━━━ Generating: python ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
#   cd "$REPO_ROOT/sdks/python"
#   # e.g. openapi-python-client generate --path "$SPEC_FILE"
#   echo "    done → sdks/python/"
# }
#
# generate_dart() {
#   echo "━━━ Generating: dart ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
#   cd "$REPO_ROOT/sdks/dart"
#   echo "    done → sdks/dart/"
# }

ALL_LANGUAGES=(typescript)

# ─── Dispatch ─────────────────────────────────────────────────────────────────

generate_one() {
  local lang="$1"

  if ! declare -f "generate_${lang}" &>/dev/null; then
    echo "ERROR: No generator found for language '$lang'."
    echo ""
    echo "Available languages:"
    for l in "${ALL_LANGUAGES[@]}"; do
      echo "  $l"
    done
    exit 1
  fi

  "generate_${lang}"
}

generate_all() {
  echo "Generating SDKs for: ${ALL_LANGUAGES[*]}"
  for lang in "${ALL_LANGUAGES[@]}"; do
    echo ""
    generate_one "$lang"
  done
}

# ─── Entry point ──────────────────────────────────────────────────────────────

cd "$REPO_ROOT"

if [[ $# -eq 0 ]]; then
  generate_all
else
  for lang in "$@"; do
    generate_one "$lang"
  done
fi

echo ""
echo "Done. Generated SDKs are in sdks/."
