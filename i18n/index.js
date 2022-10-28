const us = require("../locales/us.json")
const az = require("../locales/az.json")

const i18n = {
  translations: {
    us,
    az
  },
  defaultLang:
    typeof window !== "undefined" && localStorage.getItem("lang")
      ? localStorage.getItem("lang")
      : "us"
}

module.exports = i18n
