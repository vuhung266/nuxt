module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/public/vue/demo-export/'
    : '/'
}