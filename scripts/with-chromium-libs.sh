#!/usr/bin/env bash
# Wrapper that exposes Chromium's runtime deps from /nix/store via LD_LIBRARY_PATH
# so Playwright's bundled chrome-headless-shell can launch in this sandbox.
set -e

PKGS=(glib nss nspr dbus.lib atk cups.lib libdrm expat libxkbcommon mesa
      alsa-lib at-spi2-atk at-spi2-core cairo pango fontconfig.lib freetype
      libGL zlib libxshmfence)
XPKGS=(libX11 libXcomposite libXdamage libXext libXfixes libXrandr libxcb
       libXrender libXtst libXi libXcursor libXScrnSaver libxkbfile)

LIBS=""
add_path() {
  local out="$1"
  [ -z "$out" ] && return
  if [ -d "$out/lib" ]; then LIBS="$LIBS:$out/lib"; fi
}

for p in "${PKGS[@]}"; do
  # Try .out then bare attribute.
  out=$(nix-build '<nixpkgs>' -A "${p}.out" --no-out-link 2>/dev/null || \
        nix-build '<nixpkgs>' -A "$p" --no-out-link 2>/dev/null || true)
  add_path "$out"
done
for p in "${XPKGS[@]}"; do
  out=$(nix-build '<nixpkgs>' -A "xorg.${p}.out" --no-out-link 2>/dev/null || \
        nix-build '<nixpkgs>' -A "xorg.$p" --no-out-link 2>/dev/null || true)
  add_path "$out"
done

GCC=$(nix-build '<nixpkgs>' -A stdenv.cc.cc.lib --no-out-link 2>/dev/null || true)
add_path "$GCC"

export LD_LIBRARY_PATH="${LIBS#:}:${LD_LIBRARY_PATH:-}"
exec "$@"
