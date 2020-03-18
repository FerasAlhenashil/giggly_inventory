const db = require('../util/database');

module.exports = class Material {
  constructor(name) {
    this.name = name
  }

  save() {
    return db.query('INSERT INTO materials (MaterialName) VALUES (?)', [this.name]);
  }

  // Inserts a new record. Updates any previous record with the same date, depID, and matID.
  static update(date, location, name, gain, lost) {
    const DepID = 13
    if (name === "Red Paw" || name === "Blue Paw" || name === "Black Paw" ||
      name === "UPC, Paws, Red" || name === "UPC, Paws, Blue" || name === "UPC, Paws, Black" ||
      name === "Core" || name === "Screw" || name === "Shipping Envelope" ||
      name === "Blister" || name === "Blister Card") DepID = 25
    else if (name === "Red Plastic Sheet" || name === "Blue Plastic Sheet" || name === "Black Plastic Sheet" ||
      name === "UPC, Truck, Red" || name === "UPC, Truck, Blue" || name === "UPC, Truck, Black" ||
      name === "UPC, Noteboard, Red" || name === "UPC, Noteboard, Blue" || name === "UPC, Noteboard, Black" ||
      name === "Grommet" || name === "Velcro" || name === "Sticker, Truck" ||
      name === "Grill Box" || name === "Sticker, Noteboard") DepID = 18
    else if (location === "Main") DepID = 29
    return db.query( 
      'INSERT INTO amounts (Date, DepID, MatID, InStock, Lost) \
      SELECT * FROM ( \
        SELECT DISTINCT ?, ?, MatID, ? AS InStock, ? AS Lost \
        FROM departments INNER JOIN amounts ON DepartmentID = DepID \
          INNER JOIN materials ON MaterialID = MatID \
        WHERE MaterialName LIKE ? \
      ) AS temp \
      ON DUPLICATE KEY UPDATE InStock = InStock + temp.InStock, Lost = Lost + temp.Lost',
    [date, DepID, gain, lost, name])
  }

  // Updates amounts of vinyls. Vinyls cannot be lost, only used.
  static updateVinyl(date, name, delivered, used){
    if (delivered === "") delivered = 0
    if (used === "") used = 0
    const MatID = 54
    if (name === "1105") MatID = 55
    else if (name === "1106") MatID = 56
    else if (name === "Laminate") MatID = 57
    return db.query(
      'INSERT INTO amounts (Date, DepID, MatID, InStock, Lost) \
      VALUES (?, 13, ?, ? - ?, 0) \
      ON DUPLICATE KEY UPDATE InStock = InStock + ? - ?',
      [date, MatID, delivered, used, delivered, used]
    )
  }

  // Returns the amount of materials in pre-production 
  static fetchPreProduction(){
    return db.query( // Pre-production departmentID's are 13, 18, and 25.
    'SELECT InStock, MaterialName \
    FROM amounts INNER JOIN materials ON amounts.MatID = materials.MaterialID \
    WHERE DepID IN (13, 18, 25) AND Date = (SELECT DATE(CURRENT_TIMESTAMP() - INTERVAL 8 HOUR)) \
    ORDER BY MaterialName')
  }

  static fetchAll() {
    return db.query('SELECT * FROM materials');
  }
}