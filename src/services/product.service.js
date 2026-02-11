const { body } = require("express-validator");
const db = require("../config/db");

exports.createProduct=async(data)=>{

    const { category_id, name, description, price, stock }=data;
    const [results]=await db.query(`INSERT INTO products 
      (category_id, name, description, price, stock)
      VALUES (?, ?, ?, ?, ?)`,
      [category_id, name, description, price, stock]);


      return results.insertId;; 
}


exports.getProducts=async(data)=>{
    const [results]=await db.query(`SELECT p.*, c.name as category
       FROM products p
       JOIN categories c ON c.id = p.category_id
       WHERE p.status = 1`);

       return results;
}


exports.saveProductImages = async (productId, files) => {

  // Extract image paths from uploaded files
  const imagePaths = files.map(file => file.path);

  const [results] = await db.query(
    `UPDATE products 
     SET image = ?
     WHERE id = ?`,
    [JSON.stringify(imagePaths), productId]
  );

  return results;
};
