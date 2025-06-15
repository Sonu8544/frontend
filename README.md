# Dev Tinder Web

- create a Vite + React
- Remove every thing and Add Hello World
- Install tailwid css 
- Install Daisy Ui 
- Add NavBar component
- Create NavBar in seprate component
- Install Tract router Dom
- create a Login page
- 


- Body
-    NavBar 
-    Route = / Feed 
-    Route =/login    LoGin Component 
-    Route =logout    Logout Page 
-    Route =/profile  Profile  

# setough Router with nested route
- BrowserRoute > Routes > Route ="/" ( Body ) > Route nested router 
- Outlet for bodu iitilize childere routes 
- Create footer and inclide in bodu below outlet 


npm install -D @tailwindcss/postcss autoprefixer
npm install -D tailwindcss
nano postcss.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
  ],
};

mv postcss.config.js postcss.config.cjs
rm -rf node_modules dist package-lock.json
npm install
npm run build


sudo nano /etc/nginx/sites-available/default ( edit server block )



# Amazon Email Service
- select region mumbai
- search IAM and create a new user
- select programmatic access
- select policy AmazonSESFullAccess
- go to search SES  and sectough account
- verify email address
- go to email address and verify email
- add CNAME record in in your domain DNS
- wait some time to verify domain
- go to /account/request-production-access and request production access because used full capablities
- go to IAM got to user and settings and create access key
- Access keys (0) create access key
- copy access key and secret key
- aws ses node js documentation( v3 )  https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-your-credentials.html
-> https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
- 

