/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const runtimeCaching = require('next-pwa/cache')

module.exports = {
  reactStrictMode: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching
  },
}
