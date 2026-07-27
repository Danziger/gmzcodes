import react from './react.mjs';

let nextConfig = [];

try {
  const next = await import('eslint-config-next');
  nextConfig = Array.isArray(next.default) ? next.default : [next.default];
} catch {
  // eslint-config-next is optional — install it in Next.js projects
}

export default [...react, ...nextConfig];
