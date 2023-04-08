module.exports = {
  '!(*test|*setup|*config).ts': [
    'eslint --ext ts --quiet --fix -- .',
    'prettier --config .prettierrc --write',
  ],
}
