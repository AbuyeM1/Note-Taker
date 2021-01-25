const express = require("express");

const app = express();
const PORT = process.env.PORT || 8085;

app.use(express.json());
// app.use(express.());
app.use(express.static("public"));

require("./Routes/htmlRoutes")(app);
require("./Routes/apiRoutes")(app);

app.listen(PORT,() => console.log('Listening on PORT: ${PORT}'));