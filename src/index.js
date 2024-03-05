import app from "./app"
import { createAdmin } from "./libs/initialSetup"

const port = process.env.PORT || 3000
app.listen(port, "0.0.0.0")

console.log('Server listen on port', port)