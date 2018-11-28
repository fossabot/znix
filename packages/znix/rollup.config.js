const bundles = require('tslib-cli');

export default bundles([
  { input: 'src/znix.ts', output: { format: 'esm', file: 'dist/znix.esm.js' } },
  { input: 'src/znix.ts', output: { format: 'umd', file: 'dist/znix.js', name: 'znix' } },
  { input: 'src/znix.ts', output: { format: 'umd', file: 'dist/znix.min.js', name: 'znix' }, minify: true }
]);
