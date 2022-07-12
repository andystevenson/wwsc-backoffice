const config = require('@andystevenson/11ty')
const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite')
const { EleventyEdgePlugin } = require('@11ty/eleventy')

module.exports = function (eleventyConfig) {
  const newConfig = config(eleventyConfig)

  eleventyConfig.addPlugin(EleventyVitePlugin)
  eleventyConfig.addPlugin(EleventyEdgePlugin)

  eleventyConfig.addWatchTarget('./public')
  eleventyConfig.addFilter('decimal', function (num, length) {
    return num.toFixed(length || 2)
  })
  return newConfig
}
