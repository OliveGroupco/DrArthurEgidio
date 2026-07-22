import fs from 'fs';
import path from 'path';

const assetsDir = path.join(process.cwd(), 'dist', 'client', 'assets');
const files = fs.readdirSync(assetsDir);

const jsFile = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
const cssFile = files.find(f => f.startsWith('styles-') && f.endsWith('.css'));

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dr. Arthur Egídio</title>
    ${cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}" />` : ''}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${jsFile}"></script>
  </body>
</html>`;

fs.writeFileSync(path.join(process.cwd(), 'dist', 'client', 'index.html'), html);
console.log('Generated dist/client/index.html');
