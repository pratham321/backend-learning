const express=require("express");
const app=express();
require("dotenv").config();

app.use(express.json());




// Import routes
const userRoutes = require("./routes/user.routes");
const categoryRoutes=require("./routes/category.routes");
const productRoutes=require("./routes/product.routes");
// const productRoutes=require("./routes/product.routes");

app.get("/",(req,res)=>{
    res.send("homepage");
});

app.use('/api',userRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/product',productRoutes);


// app.listen(process.env.Port,()=>{
//       console.log("Server running on port 5000");
// });

// Global error handler (LAST middleware)
const errorHandler = require("./middlewares/error.middleware");
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server running on port 5000");
});

