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
    },
    include:{
      category:true
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
        },
    include:{
      category:true
    }
  })
  res.json(newProduct) 

 } catch (error) {
  next(error)
 }

});

//delete a product
router.delete('/products/:id', async (req, res, next) => {
 try {
  const {id}= req.params
  const deleteProduct = await product.delete({
    where:{
      id : Number(id),
    },
   
  })
  res.json(deleteProduct)

} catch (error) {
  next(error)
}
  });

//update a product
router.patch('/products/:id', async (req, res, next) => {
  try {
  const {id}= req.params
  const updatedProduct = await product.update({
    where:{
      id : Number(id),
    },
    data: req.body,
    include:{
      category:true
    }
  })

  res.json(Product)

} catch (error) {
  next(error)
}
});

module.exports = router;