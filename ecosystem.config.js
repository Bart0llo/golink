module.exports = {
  apps: [
    {
      name: '[Golink Frontend]',
      cwd: './frontend',
      script: 'npm run start',
      instances: 1,
    },
    {
      name: '[Golink Backend]',
      cwd: './backend',
      script: 'npm run start',
      instances: 1,
    },
  ],
};