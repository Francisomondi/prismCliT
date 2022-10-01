const router = require('express').Router();
const {
  PrismaClient
} = require("@prisma/client")

const {
  product
} = new PrismaClient()


router.get('/products', async (req, res, next) => {
  try {

    const products = await product.findMany({
      include: {
        category: true
      }
    })
    res.json(products)

  } catch (error) {
    next(error)
  }
});

//getting individual products
router.get('/products/:id', async (req, res, next) => {
  res.send({
    message: 'Ok api is working 🚀'
  });
});

//creating a new product
router.post('/products', async (req, res, next) => {
  res.send({
    message: 'Ok api is working 🚀'
  });
});

//delete a new product
router.delete('/products/:id', async (req, res, next) => {
  res.send({
    message: 'Ok api is working 🚀'
  });
});
//delete a new product
router.patch('/products/:id', async (req, res, next) => {
  res.send({
    message: 'Ok api is working 🚀'
  });
});

module.exports = router;