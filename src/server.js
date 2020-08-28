const app = require("./app")
require('dotenv/config')

const PORT = process.env.APP_PORT || 3333
app.listen(PORT, () => {
  console.log('App listening on port ' + PORT)
})