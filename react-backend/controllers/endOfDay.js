const Material = require('../models/material');
const Product = require('../models/product');

exports.postUpdateSummary = (req, res, next) => {
    const id = req.body.productID;
    const name = req.body.productName;
    const discontinued = req.body.discontinued;
    const product = new Product(id, name, discontinued);
    product
      .save()
      .then(() => {
        res.redirect('/admin');
      })
      .catch(err => console.log(err));
};