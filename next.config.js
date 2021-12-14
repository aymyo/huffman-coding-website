/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

module.exports = {
  reactStrictMode: true,
}

module.exports = withPWA({
  pwa: {
    dest: 'public'
  }
})
