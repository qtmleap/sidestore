#!/bin/zsh

sudo chown -R $(whoami):$(whoami) node_modules

# Silence direnv output.
# In direnv 2.36+, DIRENV_LOG_FORMAT env var is ignored unless direnv.toml exists.
# See: https://github.com/direnv/direnv/issues/1418
mkdir -p ~/.config/direnv
cat > ~/.config/direnv/direnv.toml <<'EOF'
[global]
log_format = ""
hide_env_diff = true
EOF

bun install --frozen-lockfile --ignore-scripts
bunx --bun biome migrate --write
