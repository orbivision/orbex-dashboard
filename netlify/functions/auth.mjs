// /auth/login, /auth/callback, /auth/logout — the only paths the edge gate lets through unsigned.
import { configError, getAuth } from '../lib.mjs';

export default async (req) => {
  let auth;
  try { auth = getAuth(); } catch (e) { return configError(e); }
  return (await auth.handle(req)) ?? new Response('not found', { status: 404 });
};

export const config = { path: '/auth/*' };
