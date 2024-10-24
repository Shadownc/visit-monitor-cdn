import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/visit-monitor.min.js',
      format: 'umd',
      name: 'VisitMonitor',
      plugins: [terser()],
    },
    {
      file: 'dist/visit-monitor.iife.min.js',
      format: 'iife',
      name: 'VisitMonitor',
      plugins: [terser()],
    },
  ],
};
