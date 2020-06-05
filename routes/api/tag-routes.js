const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//GET all =============================================================================================
router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
        through: ProductTag,
        as: 'products'
      }
    ]
  })
  .then(dbTagData => {
    res.json(dbTagData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

//GET single ==============================================================================================
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    
    include:[
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
        through: ProductTag,
        as: 'products'
      }
    ]
  })
  .then(dbTagData => {
    if(!dbTagData){
      res.status(404).json({ message: "No tag information exists for this id" });
      return;
    }
    res.json(dbTagData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  }) 
});


//POST into =================================================================================================
router.post('/', (req, res) => {
  // create a new tag
  //expects "tag_name"
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => {
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  }) 
  
});

//PUT ==========================================================================================================
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  //expects "tag_name"
  Tag.update(
    {
      tag_name: req.body.tag_name
    },

    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbTagData => {
    if(!dbTagData){
      res.status(404).json({ message: "No tag information exists for this id" });
      return;
    }
    res.json(dbTagData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  }); 
});

//DELETE ===========================================================================================================
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

module.exports = router;
