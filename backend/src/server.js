const express = require("express");
const path = require("path");
const dbConnection = require("./config/db");
const Config = require("./config");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
const PORT = Config.PORT || 5050;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.get('/',(req,res)=>{
  res.status(200).send('server started')
}) 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));  

  
dbConnection();

 
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err, "server is not Connected");
  }
  console.log(`listening on port : http://localhost:${PORT}`);
});


