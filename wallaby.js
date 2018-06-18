module.exports = wallaby => {
  const path = require('path');
  return {
    debug: true,
    testFramework: 'jest',
    files: [
      'imports/**/*.js',
      '.jest/config.js',
      '.jest/mongo-environment.js',
      '.jest/common.js',
      { pattern: 'imports/**/*.spec.js', ignore: true },
    ],
    tests: ['imports/**/*.spec.js'],
    compilers: {
      'imports/**/*.js': wallaby.compilers.babel({
        presets: [
          [
            'env',
            {
              targets: {
                node: 'current',
              },
              include: ['transform-es2015-destructuring'],
            },
          ],
          'stage-0',
        ],
        plugins: [
          [
            'ramda',
            {
              useES: false,
            },
          ],
        ],
      }),
    },
    env: { type: 'node' },
    workers: { initial: 1, regular: 1, recycle: true },
    setup: () => {
      var jestConfig = require(`${wallaby.localProjectDir}/.jest/config.js`);
      wallaby.testFramework.configure(jestConfig);
    },
  };
};