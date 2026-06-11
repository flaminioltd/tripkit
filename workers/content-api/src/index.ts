import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Bindings = {
  CONTENT_BUCKET: R2Bucket;
  CACHE_TTL_SECONDS: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Allow requests from our mobile app
app.use('*', cors());

// Basic health check route
app.get('/healthz', (c) => c.json({ status: 'ok', timestamp: Date.now() }));

// Fetch the global content manifest
app.get('/api/v1/manifest', async (c) => {
  const object = await c.env.CONTENT_BUCKET.get('manifest.json');
  
  if (object === null) {
    return c.json({ error: 'Manifest not found' }, 404);
  }
  
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set('Cache-Control', `public, max-age=${c.env.CACHE_TTL_SECONDS || '300'}`);
  headers.set('Content-Type', 'application/json');
  
  return new Response(object.body, { headers });
});

// Fetch a specific content package
app.get('/api/v1/packages/:name', async (c) => {
  const name = c.req.param('name');
  // Enforce .json extension lookup to prevent directory traversal
  const object = await c.env.CONTENT_BUCKET.get(`${name}.json`);
  
  if (object === null) {
    return c.json({ error: 'Package not found' }, 404);
  }
  
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set('Cache-Control', `public, max-age=${c.env.CACHE_TTL_SECONDS || '300'}`);
  headers.set('Content-Type', 'application/json');
  
  return new Response(object.body, { headers });
});

export default app;
