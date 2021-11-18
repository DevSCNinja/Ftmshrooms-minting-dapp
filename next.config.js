const withImages = require('next-images')

module.exports = {
  future: {
    webpack5: true,
  },
  webpack: function (config, options) {
    config.experiments = {};

    return config;
  },
};

module.exports = withImages({
  webpack(config, options) {
    return config
  }
})