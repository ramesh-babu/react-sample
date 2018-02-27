require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'TouchPoint',
    description: 'Office community.',
    head: {
      titleTemplate: '%s | TouchPoint',
      meta: [
        {name: 'description', content: 'Office community.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'TouchPoint'},
        {property: 'og:image', content: 'http://touchpoint.popcornapps.com/img/logo.png'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'TouchPoint'},
        {property: 'og:description', content: 'Office community.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@uday-pop'},
        {property: 'og:creator', content: '@uday-pop'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },
  remoteApiHost: 'http://dev.popcornapps.com:3002/v2/',

}, environment);
