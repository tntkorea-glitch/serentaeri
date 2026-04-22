#!/bin/bash
# Push env vars from .env + .env.local to Vercel (production/preview/development)
# Usage: bash push-env.sh

set +e

push_key() {
  local key="$1" value="$2"
  for env in production preview development; do
    # Remove existing if present (ignore errors), then add
    vercel env rm "$key" "$env" --yes >/dev/null 2>&1
    printf '%s' "$value" | vercel env add "$key" "$env" >/dev/null 2>&1
    local rc=$?
    if [ $rc -eq 0 ]; then
      echo "  [$env] $key ✓"
    else
      echo "  [$env] $key ✗ (rc=$rc)"
    fi
  done
}

for envfile in .env .env.local; do
  [ -f "$envfile" ] || continue
  echo "=== $envfile ==="
  while IFS= read -r line || [ -n "$line" ]; do
    line="${line#"${line%%[![:space:]]*}"}"
    [ -z "$line" ] && continue
    case "$line" in
      \#*) continue ;;
    esac
    key="${line%%=*}"
    value="${line#*=}"
    # strip surrounding double quotes
    if [ "${value#\"}" != "$value" ] && [ "${value%\"}" != "$value" ]; then
      value="${value%\"}"
      value="${value#\"}"
    fi
    push_key "$key" "$value"
  done < "$envfile"
done

echo "Done."
