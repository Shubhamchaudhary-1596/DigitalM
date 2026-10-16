import test from 'node:test';
import assert from 'node:assert/strict';

test('legacy API route modules load and their authorization imports resolve', async () => {
  const [users, leads, blogs, categories] = await Promise.all([
    import('../routes/user.route.js'),
    import('../routes/lead.route.js'),
    import('../routes/blog.route.js'),
    import('../routes/category.route.js'),
  ]);

  for (const routeModule of [users, leads, blogs, categories]) {
    assert.ok(routeModule.default, 'each route module should export an Express router');
    assert.equal(typeof routeModule.default, 'function');
  }
});
