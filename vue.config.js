module.exports = {
  transpileDependencies: ['vuetify'],

  publicPath: process.env.NODE_ENV === 'production' ? '/kode-internship/' : '/',

  chainWebpack(config) {
    // Set up all the aliases we use in our app.
    config.resolve.alias.clear().merge(require('./aliases.config').webpack)
    config.resolve.alias.merge({
      vue$: 'vue/dist/vue.esm.js',
    })

    // Don't allow importing .vue files without the extension, as
    // it's necessary for some Vetur autocompletions.
    config.resolve.extensions.delete('.vue')
  },
}
