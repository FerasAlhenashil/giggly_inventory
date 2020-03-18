const Product = require('../models/product')
const Material = require('../models/material')

exports.getInventory = (req, res, next) => {
  Product.fetchReadyShip()
    .then(products => {
      Material.fetchPreProduction()
        .then(materials => {
          res.json({products, materials})
        })
    })
    .catch(err => console.log(err));
}

exports.getProductionStepMaterials = (req, res, next) => {
  console.log('############### in controllers fetchProductionStep ##################', req.body.ProductName, req.method, req.body)
  const ProductName = req.body.ProductName;
  const ProductColor = req.body.ProductColor
  const ProductDepartment = req.body.ProductDepartment
  Product.fetchProductionStep(ProductName, ProductColor, ProductDepartment)
  .then(productions => {
    console.log('The response is ', productions)
    res.json({productions})
  })
    .catch(err => console.log(err))
};

exports.getInProduction = (req, res, next) => {
  console.log('####################### in getinproduction #')
  Product.fetchInProduction()
    .then(products => {
      res.json({products})
    })
    .catch(err => console.log(err))
}

exports.postUpdateReadyShip = (req, res, next) => {
  console.log('####################### in updateReadyShip #')
  const date = req.body.date 
  const name = req.body.name
  const amount = req.body.quantity
  console.log(date, name, amount)

  // ReadyShip departmentID for Grills is 35, for Feet is 36, for Skins in Main is 37, for
  // Skins in Vinyl is 34, and Sold departmentID is 38.
  switch(name){
    case "Grill, Truck, Red":
      Product.updateGrills(date, "Truck", "Red", 35, 38, amount, 0)
        .catch(err => console.log(err))
      break
    case "Grill, Truck, Blue":
      Product.updateGrills(date, "Truck", "Blue", 35, 38, amount, 0)
        .catch(err => console.log(err))
      break
    case "Grill, Truck, Black":
      Product.updateGrills(date, "Truck", "Black", 35, 38, amount, 0)
        .catch(err => console.log(err))
      break
    case "Grill, Noteboard, Red":
      Product.updateGrills(date, "Noteboard", "Red", 35, 38, amount, 0)
        .catch(err => console.log(err))
      break
    case "Grill, Noteboard, Blue":
      Product.updateGrills(date, "Noteboard", "Blue", 35, 38, amount, 0)
        .catch(err => console.log(err))
      break
    case "Grill, Noteboard, Black":
      Product.updateGrills(date, "Noteboard", "Black", 35, 38, amount, 0)
        .catch(err => console.log(err))
      break
    case "Paws, Red":
      Product.updateFeet(date, "Red", 36, 38, amount, 0)
        .catch(err => console.log(err))
      break
    case "Paws, Blue":
      Product.updateFeet(date, "Blue", 36, 38, amount, 0)
        .catch(err => console.log(err))
      break
    case "Paws, Black":
      Product.updateFeet(date, "Black", 36, 38, amount, 0)
        .catch(err => console.log(err))
      break
    case "Skin, Two-Wheel, Flowerific":
      Product.updateSkins(date, "Flowerific", "Two-Wheel", 34, 38, amount, 0)
        .catch(err => console.log(err))
      break
    case "Skin, Two-Wheel, Patriotic":
      Product.updateSkins(date, "Patriotic", "Two-Wheel", 34, 38, amount, 0)
        .catch(err => console.log(err))
      break
    case "Skin, Two-Wheel, Military":
      Product.updateSkins(date, "Military", "Two-Wheel", 34, 38, amount, 0)
        .catch(err => console.log(err))
      break
    case "Skin, Two-Wheel, WonderFall":
      Product.updateSkins(date, "WonderFall", "Two-Wheel", 34, 38, amount, 0)
        .catch(err => console.log(err))
      break
    case "Skin, Two-Wheel, Barktastic":
      Product.updateSkins(date, "Barktastic", "Two-Wheel", 34, 38, amount, 0)
        .catch(err => console.log(err))
      break
    case "Skin, Four-Wheel, Flowerific":
      Product.updateSkins(date, "Flowerific", "Four-Wheel", 34, 38, amount, 0)
        .catch(err => console.log(err))
      break
    case "Skin, Four-Wheel, Patriotic":
      Product.updateSkins(date, "Patriotic", "Four-Wheel", 34, 38, amount, 0)
        .catch(err => console.log(err))
      break
    case "Skin, Four-Wheel, Military":
      Product.updateSkins(date, "Military", "Four-Wheel", 34, 38, amount, 0)
        .catch(err => console.log(err))
      break
    case "Skin, Four-Wheel, WonderFall":
      Product.updateSkins(date, "WonderFall", "Four-Wheel", 34, 38, amount, 0)
        .catch(err => console.log(err))
      break
    case "Skin, Four-Wheel, Barktastic":
      Product.updateSkins(date, "Barktastic", "Four-Wheel", 34, 38, amount, 0)
        .catch(err => console.log(err))
      break
  }
  res.redirect('/Sales')
}