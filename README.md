# appsyncmasterclass-backend

npm install --save-dev serverless
npm install --save-dev serverless-appsync-plugin
npm install --dev serverless-better-credentials

npm run sls -- create -t aws-nodejs

export AWS_PROFILE=<your-profile>
npm run sls -- deploy