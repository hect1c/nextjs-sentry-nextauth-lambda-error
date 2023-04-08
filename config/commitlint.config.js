module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 120],
    'type-enum': [
      2,
      'always',
      [
        'breaking',
        'feat',
        'fix',
        'refactor',
        'config',
        'test',
        'build',
        'chore',
        'docs',
        'build',
        'no-release',
        'ci',
        'revert',
      ],
    ],
    'references-empty': [2, 'never'],
  },
  parserPreset: {
    parserOpts: {
      referenceActions: null,
      issuePrefixes: ['PS-', 'PL-', 'ps-', 'pl-'],
    },
  },
}
