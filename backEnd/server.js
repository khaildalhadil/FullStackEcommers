import app from "./app.js";
import mongoose from "mongoose";

const URL = process.env.LINK.replace("<db_password>", process.env.PASSWORD);

mongoose.connect(URL)
  .then(()=> console.log("connected to data Base ✔"))
  .catch((err) => console.log("Error 💥" ,err.message))

const port = process.env.PORT || 8000;
app.listen(port, ()=> console.log(`Lensen in port ${port}`));