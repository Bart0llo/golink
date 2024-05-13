module.exports = {
  apps: [
    {
      name: '[Golink Frontend]',
      cwd: './apps/frontend',
      script: 'npm run start',
      instances: 1,
    },
    {
      name: '[Golink Backend]',
      cwd: './apps/backend',
      script: 'npm run start',
      instances: 1,
    },
  ],
};