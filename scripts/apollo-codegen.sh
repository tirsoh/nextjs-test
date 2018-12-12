#!/usr/bin/env bash

echo "Fetching schemas from Dato..."
apollo-codegen introspect-schema https://graphql.datocms.com --header "Authorization: Bearer 78d2968c99a076419fbb" --output schema.json

echo "Generating Typescript files..."
apollo-codegen generate ../**/*.graphql --schema schema.json --target typescript --addTypename --output ../types/models.ts

