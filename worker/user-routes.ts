import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity, BriefEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
import type { User } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // BRIEFS
  app.get('/api/briefs', async (c) => {
    await BriefEntity.ensureSeed(c.env);
    const cat = c.req.query('category');
    const page = await BriefEntity.list(c.env);
    let items = page.items;
    if (cat && cat !== 'All') {
      items = items.filter(i => i.category === cat);
    }
    return ok(c, { items, next: page.next });
  });
  app.get('/api/briefs/:slug', async (c) => {
    const slug = c.req.param('slug');
    const brief = await BriefEntity.findBySlug(c.env, slug);
    if (!brief) return notFound(c, 'Brief not found');
    return ok(c, brief);
  });
  // USER PROFILE
  app.get('/api/user/:id', async (c) => {
    const user = new UserEntity(c.env, c.req.param('id'));
    if (!await user.exists()) return notFound(c);
    return ok(c, await user.getState());
  });
  app.post('/api/user', async (c) => {
    const body = await c.req.json() as Partial<User>;
    if (!body.email) return bad(c, 'Email required');
    let user = await UserEntity.findByEmail(c.env, body.email);
    if (user) {
      const entity = new UserEntity(c.env, user.id);
      await entity.patch(body);
      return ok(c, await entity.getState());
    } else {
      const newUser: User = {
        id: crypto.randomUUID(),
        email: body.email,
        name: body.name || 'Nexus User',
        tier: body.tier || 'Free'
      };
      await UserEntity.create(c.env, newUser);
      return ok(c, newUser);
    }
  });
}