const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

require("./Routes/htmlRoutes")(app);
require("./Routes/apiRoutes")(app);

app.listen(PORT,() => console.log('Listening on PORT: ${PORT}'));