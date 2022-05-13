npx esbuild serverless/index.js --bundle --platform=node --target=node14.19.2 --outfile=build/serverless/index.js
cd build/serverless
zip tinyoauth.zip index.js
