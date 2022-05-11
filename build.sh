npx esbuild serverless/index.js --bundle --platform=node --target=node14.19.2 --outfile=build/index.js
cd build
zip tinyoauth.zip index.js
