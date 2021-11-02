import cookie from 'cookie';

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US');
}

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || '' : '');
}
