sphinx-build -b html docs/source/ docs/build/html
npx jsdoc app lib README.md -r -d docs/build/html/reference
