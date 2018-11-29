for file in *.html.md; do
    mv "$file" "$(basename "$file" .html.md).mdx"
done
