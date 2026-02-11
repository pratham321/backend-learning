const productService = require("../services/product.service");

exports.creatProduct = async (req, res, next) => {
  try {
    // await productService.creatProduct(req.body);
      const productId = await productService.createProduct(req.body);

      console.log("productId",productId);

        if (req.files && req.files.length > 0) {
      await productService.saveProductImages(
        productId,
        req.files
      );
    }
    // res.status(201).json({
    //   status: "success",
    //   message: "Product added",
    // });
       res.status(201).json({
      status: "success",
      message: "Product created with images"
    });
  } catch (error) {
    next(error);
  }
};


exports.getProducts=async(req,res,next)=>{
    try {
       const product= await productService.getProducts();

        res.status(200).json({
          status:"success",
          data:product
        })
    } catch (error) {
          next(err);
    }
}
