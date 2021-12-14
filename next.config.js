/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");
const runtimeCaching = require('next-pwa/cache')

module.exports = {
  reactStrictMode: true
}

module.exports = withPWA({
  pwa: {
    dest: 'public'
  }
})
