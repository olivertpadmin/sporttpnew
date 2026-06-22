import { NextResponse } from 'next/server'

const BASE = '/portal-preview'

const HTML = `<!doctype html>
<html lang="cs">
  <head>
    <meta charset="UTF-8" />
    <base href="${BASE}/" />
    <link rel="icon" type="image/svg+xml" href="${BASE}/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#06d373" />
    <title>VIP Partner Portal</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
    <script type="module" crossorigin src="${BASE}/assets/index.js"></script>
    <link rel="stylesheet" crossorigin href="${BASE}/assets/index.css" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`

export async function GET() {
  return new NextResponse(HTML, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
