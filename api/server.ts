import { Hono } from 'https://deno.land/x/hono/mod.ts';
import { serveStatic } from 'https://deno.land/x/hono/middleware.ts';
import { cors } from 'https://deno.land/x/hono/middleware.ts';
import * as path from 'https://deno.land/std@0.114.0/path/mod.ts';

const isProduction = Deno.env.get('NODE_ENV') === 'production';
const port = Deno.env.get('PORT') || 5173;
const base = Deno.env.get('BASE') || '/';

const app = new Hono();

app.use('*', cors());

if (isProduction) {
  app.use(base, serveStatic({ root: './dist/client' }));
  app.get('*', async (c) => {
    const filePath = path.join(Deno.cwd(), 'dist/client/index.html');
    return await serveStatic({ path: filePath })(c);
  });
} else {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });
  app.use(async (c, next) => {
    await vite.middlewares(c.req.raw, c.res);
    await next();
  });
  app.get('*', async (c) => {
    try {
      const url = new URL(c.req.url).pathname.replace(base, '');
      let template = await Deno.readTextFile('./index.html');
      template = await vite.transformIndexHtml(url, template);
      const { render } = await vite.ssrLoadModule('/src/entry-server.js');
      const rendered = await render(url);
      const html = template
        .replace(`<!--app-head-->`, rendered.head ?? '')
        .replace(`<!--app-html-->`, rendered.html ?? '');
      return c.html(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.log(e.stack);
      return c.text(e.stack, 500);
    }
  });
}

console.log(`Server running on http://localhost:${port}`);
Deno.serve(app.fetch);
