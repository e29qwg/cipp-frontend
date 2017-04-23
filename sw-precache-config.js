module.exports = {
  root: 'dist',
  stripPrefix: 'dist/',
  navigateFallback: '/index.html',
  runtimeCaching: [{
    urlPattern: /coepkt\.org/,
    handler: 'networkFirst'
  }]
};
