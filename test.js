const photocell = require("./lib/photocell")

const latest = photocell.read()

console.log(`LIGHT: ${latest}`)
