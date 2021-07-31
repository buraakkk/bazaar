const CategoryModel = require('../categoryModel');

function showCategory(req, res) {
  res.header('Access-Control-Allow-Origin', '*');

  try {
    const findResult = await CategoryModel.find();
    const categories = await findResult.populate('categories');
    res.json(categories);
  } catch (error) {
    console.log('Error while showing category');
    console.log('Request', req);
    console.log('Error', error);

    res.status(500).json(`Could not show category`);
  }
}

module.exports = showCategory;
