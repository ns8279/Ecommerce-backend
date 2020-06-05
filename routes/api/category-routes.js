const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//GET /api/categories  ===============================================================================================
router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    //include the Products 
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'] //the selected attributes will be displayed in the GET Route
      }
    ]
  })
  .then(dbCategory => {
    res.json(dbCategory);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })  
});

//GET /api/categories/:id t ==============================================================================================
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'] //the selected attributes will be displayed in the GET Route
      }
    ]
  })
  .then(dbCategory => {
    if(!dbCategory){
      res.status(404).json({ message: "No Category found with this id" });
      return;
    }
    res.json(dbCategory);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })  
});

//POST /api/categories  ===============================================================================================
router.post('/', (req, res) => {
  // create a new category
  //expects { category_name }
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategory => {
    res.json(dbCategory);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

//PUT /api/categories/:id  ===============================================================================================
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  //expects { category_name }
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbCategory => {
    if(!dbCategory){
      res.status(404).json({ message: "No Category found with this id" });
      return;
    }
    res.json(dbCategory);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })  
});

//DELETE /api/categories/:id  ===============================================================================================
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategory => {
    if(!dbCategory){
      res.status(404).json({ message: "No Category found with this id" });
      return;
    }
    res.json(dbCategory);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })  
});

module.exports = router;
