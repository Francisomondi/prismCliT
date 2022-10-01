const router = require('express').Router();
const {
  PrismaClient
} = require("@prisma/client")

const {
  product,category
} = new PrismaClient()


router.get('/products', async (req, res, next) => {
  try {

    const products = await product.findMany({
      include: {
        category: true
      }
    })

    const categories = await category.findMany({
      include: {
        product:true
      }
    })
    res.json({products,categories})

  } catch (error) {
    next(error)
  }
});

//getting individual product by id
router.get('/products/:id', async (req, res, next) => {
try {
  const {id}= req.params
  const singleProduct = await product.findUnique({
    where:{
      id : Number(id),
    }
  })

  res.json(singleProduct)

  
} catch (error) {
  next(error)
}
});

//creating a new product
router.post('/products', async (req, res, next) => {
  const {
        name,
        price,
        categoryId
    } = req.body

 try {
  const newProduct= await product.create({
     data: {
            name,
            price,
            categoryId
        }
  })
  res.json(newProduct) 

 } catch (error) {
  next(error)
 }

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