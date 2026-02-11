const db = require("../config/db");

// exports.createCategory = (name) => {
//   return new Promise((resolve, reject) => {

//     console.log("createCategory services")
//     db.query(
//       "INSERT INTO categories (name) VALUES (?)",
//       [name],
//       (err, result) => {
//         if (err) return reject(err);
//         resolve(result);
//       }
//     );
//   });
// };

exports.createCategory = async (name) => {
  const [result] = await db.query("INSERT INTO categories (name) VALUES (?)", [
    name,
  ]);
 
  return result;
};
 

exports.getCategories = async() => {
  // return new Promise((resolve, reject) => {
  //   db.query(
  //     "SELECT * FROM categories WHERE status = 1",
  //     (err, results) => {
  //       if (err) return reject(err);
  //       resolve(results);
  //     }
  //   );
  // });

  const[result]= await db.query("SELECT * FROM categories WHERE status = 1");

  return result;
};
