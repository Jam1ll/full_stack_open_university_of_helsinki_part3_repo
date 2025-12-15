# Notes backend

#### make sure to paste the dist directory when deploying and adding this to package.json:

{
"scripts": {
// ...
"build:ui": "rm -rf dist && cd ../notes-frontend/ && npm run build && cp -r dist ../notes-backend",
"deploy": "fly deploy",
"deploy:full": "npm run build:ui && npm run deploy",  
 "logs:prod": "fly logs"
}
}

## have in mind that:

The `npm run build:ui` script builds the frontend and copies the production version to the backend repository. The `npm run deploy` script deploys the actual backend to Fly.io.

npm run deploy:full combines these two scripts, namely npm run build:ui and npm run deploy .

There is also an npm run logs:prod script to display the Fly.io logs.

Note that the directory paths in the build:ui script depend on the location of the repositories in the file system.
