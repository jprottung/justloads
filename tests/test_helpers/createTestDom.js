import { JSDOM } from 'jsdom';

export default function createTestDom(body = '', title = 'Titel', options = {}) {
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>${title}</title>
  </head>
  <body>
  ${body}
  </body>
  </html>`;

  return new JSDOM(html, options);
}
