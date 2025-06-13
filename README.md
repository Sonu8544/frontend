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