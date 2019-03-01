#!/bin/bash

export PORT=4793
export NODEBIN=`pwd`/assets/node_modules/.bin
export PATH="$PATH:$NODEBIN"
export MIX_ENV=prod

echo "Building..."

mkdir -p ~/.config/tasktracker

mix deps.get

(cd assets && npm install)
(cd assets && node_modules/.bin/webpack --mode production)
mix phx.digest
mix compile
mix ecto.migrate

mix run priv/repo/seeds.exs

echo "Generating release..."
mix release --env=prod

echo "Starting app..."

_build/prod/rel/task_tracker/bin/task_tracker foreground
