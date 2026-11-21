import { expect, it } from 'vitest';
import { canonicalPathIssue } from './canonical-path.mjs';

const origin = 'http://localhost:3013';
it('allows the public origin and a trailing slash during local audits', () => {
  expect(canonicalPathIssue('https://innflow.ai/about/', '/about', origin)).toBeNull();
});
it('rejects a different inner route as well as the homepage', () => {
  expect(canonicalPathIssue('/contact', '/about', origin)).toMatch(/does not match/);
  expect(canonicalPathIssue('/', '/about', origin)).toMatch(/does not match/);
});
it('reports malformed URLs rather than crashing the audit', () => {
  expect(canonicalPathIssue('http://[', '/about', origin)).toBe('invalid canonical URL');
});
it('rejects non-web protocols and URL decorations', () => {
  expect(canonicalPathIssue('javascript:alert(1)', '/about', origin)).toBe('invalid canonical protocol');
  for (const suffix of ['?page=2', '#details']) {
    expect(canonicalPathIssue(`/about${suffix}`, '/about', origin)).toMatch(/query or fragment/);
  }
});
