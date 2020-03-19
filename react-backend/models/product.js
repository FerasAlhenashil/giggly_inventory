const db = require('../util/database');

module.exports = class Product {
  constructor(name, discontinued) {
    this.name = name;
    this.discontinued = discontinued;
  }

  save() {
    return db.query('INSERT INTO products (ProductName, Discontinued) VALUES (?, ?)',
      [this.name, this.discontinued]
    );
  }

  // Updates amounts of materials in various departments for a given amount of a given grill.
  // Querys must find the type and amount of materials for the grill and multiply them by a given
  // amount. The first query subtracts those materials from the given department. The next query
  // adds the completed materials to the next department in the production process. The next query adds 
  // (one plastic sheet and one grommet) * (given lost value) to the current departments lost field if 
  // the department is GrillVelcro, GrillStickers, or GrillPackaging, and (one plastic sheet) * 
  // (given lost value) if it's a different grill department. The last query adds materials that 
  // weren't lost back to the pre-production department.
  static updateGrills(date, design, color, department, nextDepartment, completed, lost) {
    db.query(
      'UPDATE amounts, ( \
        SELECT ? AS Date, DepartmentID, MatID, MaterialAmount * (? + ?) AS NumMats \
        FROM departments, productmaterials \
          INNER JOIN products ON productmaterials.ProdID = products.ProductID \
        WHERE ProductName LIKE ? AND ProductName LIKE ? AND DepartmentName LIKE ? \
      ) AS temp \
      SET amounts.InStock = amounts.InStock - temp.NumMats \
      WHERE amounts.Date = temp.Date AND amounts.DepID = temp.DepartmentID AND amounts.MatID = temp.MatID',
      [date, completed, lost, "%"+design+"%", "%"+color+"%", "%"+department+"%"])
    db.query(
      'INSERT INTO amounts (Date, DepID, MatID, InStock, Lost) \
      SELECT * FROM ( \
        SELECT ? AS Date, DepartmentID, MatID, MaterialAmount * ? AS NumMats, 0 \
        FROM departments, productmaterials INNER JOIN products ON productmaterials.ProdID = products.ProductID \
        WHERE ProductName LIKE ? AND ProductName LIKE ? AND DepartmentName LIKE ? \
      ) AS temp \
      ON DUPLICATE KEY UPDATE InStock = InStock + temp.NumMats',
      [date, completed, "%"+design+"%", "%"+color+"%", "%"+nextDepartment+"%"])
    if (department === "GrillVelcro" || department === "GrillStickers" || department === "GrillPackaging"){
      db.query(
        'UPDATE amounts, ( \
          SELECT ? AS Date, DepartmentID, MatID \
          FROM departments, productmaterials \
            INNER JOIN products ON productmaterials.ProdID = products.ProductID \
            INNER JOIN materials ON productmaterials.MatID = materials.MaterialID \
          WHERE ProductName LIKE ? AND ProductName LIKE ? AND DepartmentName LIKE ? \
            AND ((MaterialName LIKE ? AND MaterialName LIKE ?) OR (MaterialName LIKE ?)) \
        ) AS temp  \
        SET amounts.Lost = amounts.Lost + ? \
        WHERE amounts.Date = temp.Date AND amounts.DepID = temp.DepartmentID AND amounts.MatID = temp.MatID',
        [date, "%"+design+"%", "%"+color+"%", "%"+department+"%", "%"+color+"%", "%plastic%", "%grommet%", lost])
      return db.query( // Pre-production departmentID for Grills is 18.
        'UPDATE amounts, ( \
          SELECT ? AS Date, 18 AS DepartmentID, MatID, MaterialAmount * ? AS NumMats \
          FROM productmaterials INNER JOIN products ON productmaterials.ProdID = products.ProductID \
          WHERE ProductName LIKE ? AND ProductName LIKE ? AND MatID NOT IN ( \
            SELECT MaterialID FROM materials \
            WHERE MaterialName LIKE ? AND MaterialName LIKE ? OR MaterialName LIKE ? \
          ) \
        ) AS temp  \
        SET amounts.InStock = amounts.InStock + temp.NumMats \
        WHERE amounts.Date = temp.Date AND amounts.DepID = temp.DepartmentID AND amounts.MatID = temp.MatID',
        [date, lost, "%"+design+"%", "%"+color+"%", "%"+color+"%", "%plastic%", "%grommet%"])
    } else {
      db.query(
        'UPDATE amounts, ( \
          SELECT ? AS Date, DepartmentID, MatID \
          FROM departments, productmaterials \
            INNER JOIN products ON productmaterials.ProdID = products.ProductID \
            INNER JOIN materials ON productmaterials.MatID = materials.MaterialID \
          WHERE ProductName LIKE ? AND ProductName LIKE ? AND DepartmentName LIKE ? \
            AND MaterialName LIKE ? AND MaterialName LIKE ? \
        ) AS temp  \
        SET amounts.Lost = amounts.Lost + ? \
        WHERE amounts.Date = temp.Date AND amounts.DepID = temp.DepartmentID AND amounts.MatID = temp.MatID',
        [date, "%"+design+"%", "%"+color+"%", "%"+department+"%", "%"+color+"%", "%plastic%", lost])
      return db.query( // Pre-production departmentID for Grills is 18.
        'UPDATE amounts, ( \
          SELECT ? AS Date, 18 AS DepartmentID, MatID, MaterialAmount * ? AS NumMats \
          FROM productmaterials INNER JOIN products ON productmaterials.ProdID = products.ProductID \
          WHERE ProductName LIKE ? AND ProductName LIKE ? AND MatID NOT IN ( \
            SELECT MaterialID FROM materials \
            WHERE MaterialName LIKE ? AND MaterialName LIKE ? \
          ) \
        ) AS temp  \
        SET amounts.InStock = amounts.InStock + temp.NumMats \
        WHERE amounts.Date = temp.Date AND amounts.DepID = temp.DepartmentID AND amounts.MatID = temp.MatID',
        [date, lost, "%"+design+"%", "%"+color+"%", "%"+color+"%", "%plastic%"])
    }
  }

  // Updates amounts of materials in various departments for a given amount of a given feet.
  // Querys must find the type and amount of materials for the feet and multiply them by a given
  // amount. The first query subtracts those materials from the given department. The next query
  // adds the completed materials to the next department in the production process. The next query adds 
  // (one blister card) * (given lost value) to the current departments lost field if the department is  
  // FeetPackaging, and (one foot) * (given lost value) if it's a different feet department. The 
  // last query adds materials that weren't lost back to the pre-production department.
  static updateFeet(date, color, department, nextDepartment, completed, lost) {
    db.query(
      'UPDATE amounts, ( \
        SELECT ? AS Date, DepartmentID, MatID, MaterialAmount * (? + ?) AS NumMats \
        FROM departments, productmaterials \
          INNER JOIN products ON productmaterials.ProdID = products.ProductID \
        WHERE ProductName LIKE ? AND ProductName LIKE ? AND DepartmentName LIKE ? \
      ) AS temp \
      SET amounts.InStock = amounts.InStock - temp.NumMats \
      WHERE amounts.Date = temp.Date AND amounts.DepID = temp.DepartmentID AND amounts.MatID = temp.MatID',
      [date, completed, lost, "%paw%", "%"+color+"%", "%"+department+"%"])
    db.query(
      'INSERT INTO amounts (Date, DepID, MatID, InStock, Lost) \
      SELECT * FROM ( \
        SELECT ? AS Date, DepartmentID, MatID, MaterialAmount * ? AS NumMats, 0 \
        FROM departments, productmaterials INNER JOIN products ON productmaterials.ProdID = products.ProductID \
        WHERE ProductName LIKE ? AND ProductName LIKE ? AND DepartmentName LIKE ? \
      ) AS temp \
      ON DUPLICATE KEY UPDATE InStock = InStock + temp.NumMats',
      [date, completed, "%paw%", "%"+color+"%", "%"+nextDepartment+"%"])
    if (department === "FeetPackaging"){
      db.query(
        'UPDATE amounts, ( \
          SELECT ? AS Date, DepartmentID, MatID \
          FROM departments, productmaterials \
            INNER JOIN products ON productmaterials.ProdID = products.ProductID \
            INNER JOIN materials ON productmaterials.MatID = materials.MaterialID \
          WHERE ProductName LIKE ? AND ProductName LIKE ? AND DepartmentName LIKE ? AND MaterialName LIKE ? \
        ) AS temp  \
        SET amounts.Lost = amounts.Lost + ? \
        WHERE amounts.Date = temp.Date AND amounts.DepID = temp.DepartmentID AND amounts.MatID = temp.MatID',
        [date, "%paw%", "%"+color+"%", "%"+department+"%", "%blister card%", lost])
      return db.query( // Pre-production departmentID for Feet is 25.
        'UPDATE amounts, ( \
          SELECT ? AS Date, 25 AS DepartmentID, MatID, MaterialAmount * ? AS NumMats \
          FROM productmaterials INNER JOIN products ON productmaterials.ProdID = products.ProductID \
          WHERE ProductName LIKE ? AND ProductName LIKE ? AND MatID NOT IN ( \
            SELECT MaterialID FROM materials \
            WHERE MaterialName LIKE ? \
          ) \
        ) AS temp  \
        SET amounts.InStock = amounts.InStock + temp.NumMats \
        WHERE amounts.Date = temp.Date AND amounts.DepID = temp.DepartmentID AND amounts.MatID = temp.MatID',
        [date, lost, "%paw%", "%"+color+"%", "%blister card%"])
    } else {
      db.query(
        'UPDATE amounts, ( \
          SELECT ? AS Date, DepartmentID, MatID \
          FROM departments, productmaterials \
            INNER JOIN products ON productmaterials.ProdID = products.ProductID \
            INNER JOIN materials ON productmaterials.MatID = materials.MaterialID \
          WHERE ProductName LIKE ? AND ProductName LIKE ? AND DepartmentName LIKE ? \
            AND MaterialName LIKE ? AND MaterialName LIKE ? \
        ) AS temp  \
        SET amounts.Lost = amounts.Lost + ? \
        WHERE amounts.Date = temp.Date AND amounts.DepID = temp.DepartmentID AND amounts.MatID = temp.MatID',
        [date, "%paw%", "%"+color+"%", "%"+department+"%", "%"+color+"%", "%paw%", lost])
      return db.query( // Pre-production departmentID for Feet is 25.
        'UPDATE amounts, ( \
          SELECT ? AS Date, 25 AS DepartmentID, MatID, MaterialAmount * ? AS NumMats \
          FROM productmaterials INNER JOIN products ON productmaterials.ProdID = products.ProductID \
          WHERE ProductName LIKE ? AND ProductName LIKE ? AND MatID NOT IN ( \
            SELECT MaterialID FROM materials \
            WHERE MaterialName LIKE ? AND MaterialName LIKE ? \
          ) \
        ) AS temp  \
        SET amounts.InStock = amounts.InStock + temp.NumMats \
        WHERE amounts.Date = temp.Date AND amounts.DepID = temp.DepartmentID AND amounts.MatID = temp.MatID',
        [date, lost, "%paw%", "%"+color+"%", "%"+color+"%", "%paw%"])
    }
  }

  // Updates amounts of materials in various departments for a given amount of a given skin.
  // Querys must find the type and amount of materials for the skin and multiply them by a given
  // amount. The first query subtracts those materials from the given department. The next query
  // adds the completed materials to the next department in the production process. The next query 
  // is skipped if the department is SkinWrapPrint, or adds (one given skin) * (given lost value)
  // to the departments lost value if it's a different skin department. The last query adds
  // materials that weren't lost back to the pre-production department.
  static updateSkins(date, skin, walker, department, nextDepartment, completed, lost) {
    db.query(
      'UPDATE amounts, ( \
        SELECT ? AS Date, DepartmentID, MatID, MaterialAmount * (? + ?) AS NumMats \
        FROM departments, productmaterials \
          INNER JOIN products ON productmaterials.ProdID = products.ProductID \
        WHERE ProductName LIKE ? AND ProductName LIKE ? AND DepartmentName LIKE ? AND Location LIKE "%Vinyl%" \
      ) AS temp \
      SET amounts.InStock = amounts.InStock - temp.NumMats \
      WHERE amounts.Date = temp.Date AND amounts.DepID = temp.DepartmentID AND amounts.MatID = temp.MatID',
      [date, completed, lost, "%"+walker+"%", "%"+skin+"%", "%"+department+"%"])
    db.query(
      'INSERT INTO amounts (Date, DepID, MatID, InStock, Lost) \
      SELECT * FROM ( \
        SELECT ? AS Date, DepartmentID, MatID, MaterialAmount * ? AS NumMats, 0 \
        FROM departments, productmaterials INNER JOIN products ON productmaterials.ProdID = products.ProductID \
        WHERE ProductName LIKE ? AND ProductName LIKE ? AND DepartmentName LIKE ? AND Location LIKE "%Vinyl%" \
      ) AS temp \
      ON DUPLICATE KEY UPDATE InStock = InStock + temp.NumMats',
      [date, completed, "%"+walker+"%", "%"+skin+"%", "%"+nextDepartment+"%"])
    if (department === "SkinPrint"){
      return db.query( // Pre-production departmentID for Skins is 13.
        'UPDATE amounts, ( \
          SELECT ? AS Date, 13 AS DepartmentID, MatID, MaterialAmount * ? AS NumMats \
          FROM productmaterials INNER JOIN products ON productmaterials.ProdID = products.ProductID \
          WHERE ProductName LIKE ? AND ProductName LIKE ? \
        ) AS temp  \
        SET amounts.InStock = amounts.InStock + temp.NumMats \
        WHERE amounts.Date = temp.Date AND amounts.DepID = temp.DepartmentID AND amounts.MatID = temp.MatID',
        [date, lost, "%"+walker+"%", "%"+skin+"%"])
    } else {
      db.query(
        'UPDATE amounts, ( \
          SELECT ? AS Date, DepartmentID, MatID \
          FROM departments, productmaterials \
            INNER JOIN products ON productmaterials.ProdID = products.ProductID \
            INNER JOIN materials ON productmaterials.MatID = materials.MaterialID \
          WHERE ProductName LIKE ? AND ProductName LIKE ? AND DepartmentName LIKE ? \
            AND MaterialName LIKE ? AND MaterialName LIKE ? AND MaterialName NOT LIKE "%UPC%" \
        ) AS temp  \
        SET amounts.Lost = amounts.Lost + ? \
        WHERE amounts.Date = temp.Date AND amounts.DepID = temp.DepartmentID AND amounts.MatID = temp.MatID',
        [date, "%"+walker+"%", "%"+skin+"%", "%"+department+"%", "%"+walker+"%", "%"+skin+"%", lost])
      return db.query( // Pre-production departmentID for Skins is 13.
        'UPDATE amounts, ( \
          SELECT ? AS Date, 13 AS DepartmentID, MatID, MaterialAmount * ? AS NumMats \
          FROM productmaterials INNER JOIN products ON productmaterials.ProdID = products.ProductID \
          WHERE ProductName LIKE ? AND ProductName LIKE ? AND MatID NOT IN ( \
            SELECT MaterialID FROM materials \
            WHERE MaterialName LIKE ? AND MaterialName LIKE ? AND MaterialName NOT LIKE "%UPC%" \
          ) \
        ) AS temp  \
        SET amounts.InStock = amounts.InStock + temp.NumMats \
        WHERE amounts.Date = temp.Date AND amounts.DepID = temp.DepartmentID AND amounts.MatID = temp.MatID',
        [date, lost, "%"+walker+"%", "%"+skin+"%", "%"+walker+"%", "%"+skin+"%"])
    }
  }

  // Returns the amount of products that have not been discontinued and are currently ready to ship. 
  // First it finds the type and amount of materials for each product and the current amount of those  
  // materials in the ready to ship departments. Then it divides each material by the amount needed for
  // each product and returns the minimum number among the materials needed for a product.
  static fetchReadyShip() {
    return db.query( // ReadyShip departmentID's are 34, 35, and 36. (Excludes MainSkinReadyShip (37))
      'WITH temp AS ( \
        SELECT ProdID, amounts.MatID, InStock, MaterialAmount \
        FROM productmaterials INNER JOIN amounts ON productmaterials.MatID = amounts.MatID \
        WHERE DepID IN (34, 35, 36) AND Date = (SELECT DATE(CURRENT_TIMESTAMP() - INTERVAL 8 HOUR)) \
      ) \
      SELECT CAST(MIN(InStock/MaterialAmount) AS int) AS ReadyShip, ProductName \
      FROM temp INNER JOIN products ON temp.ProdID = products.ProductID \
      WHERE Discontinued = 0 \
      GROUP BY ProductName \
      ORDER BY ProductName'
    );
  }

  // Returns the amount of products that have not been discontinued that are in each department. 
  // First it finds the type and amount of materials for each product and the current amount of those  
  // materials in each department. Then it divides each material by the amount needed for
  // each product and returns the minimum number among the materials needed for a product.
  static fetchInProduction(){
    return db.query( // ReadyShip departmentID's are 34-37 and Sold is 38.
      'WITH temp AS ( \
        SELECT ProdID, amounts.MatID, DepID, InStock, Lost, MaterialAmount \
        FROM productmaterials INNER JOIN amounts ON productmaterials.MatID = amounts.MatID \
        WHERE DepID NOT IN (34, 35, 36, 37, 38) AND Date = (SELECT DATE(CURRENT_TIMESTAMP() - INTERVAL 8 HOUR)) \
      ) \
      SELECT Location, DepartmentName, ProductName, CAST(MIN(InStock/MaterialAmount) AS INT) AS InDepartment, \
        MAX(Lost) AS Lost \
      FROM temp INNER JOIN products ON temp.ProdID = products.productID \
        INNER JOIN departments ON DepartmentID = DepID \
      WHERE Discontinued = 0 \
      GROUP BY ProductName, DepartmentID \
      ORDER BY Location, DepartmentName, ProductName'
    )
  }

  // Returns the type and amount of materials in a given department for a given product.
  static fetchProductionStep(name, color, department) {
    return db.query(
      'WITH temp AS ( \
        SELECT DepartmentID, MatID, MaterialName \
        FROM departments, productmaterials \
          INNER JOIN products ON productmaterials.ProdID = products.ProductID \
          INNER JOIN materials ON productmaterials.MatID = materials.MaterialID \
        WHERE ProductName LIKE ? AND ProductName LIKE ? AND DepartmentName LIKE ? \
      ) \
      SELECT MaterialName, InStock, Lost \
      FROM temp INNER JOIN amounts ON temp.DepartmentID = amounts.DepID AND temp.MatID = amounts.MatID \
      WHERE Date = (Select DATE(CURRENT_TIMESTAMP() - INTERVAL 8 HOUR))',
      ["%"+name+"%", "%"+color+"%", "%"+department+"%"])
  }
  
  // Sets the values in amounts for the current day to be the values of the previous day
  static rollbackAll() {
    return db.query(
      'UPDATE amounts, (SELECT * FROM amounts WHERE Date = \
        (SELECT DATE(CURRENT_TIMESTAMP() - INTERVAL 8 HOUR - INTERVAL 1 DAY))) AS temp \
      SET amounts.InStock = temp.InStock, amounts.Lost = temp.Lost \
      WHERE amounts.Date = (SELECT DATE(CURRENT_TIMESTAMP() - INTERVAL 8 HOUR)) \
        AND amounts.DepID = temp.DepID AND amounts.MatID = temp.MatID'
    )
  }

  static discontinue(name) {
      return db.query('UPDATE products SET Discontinued = 1 WHERE productName LIKE ?', [name])
  }

  static fetchAll() {
    return db.query('SELECT * FROM products');
  }
};