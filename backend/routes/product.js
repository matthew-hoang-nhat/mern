const express = require('express')
const router = express.Router()


const{newProduct, getProducts, getSingleProduct, updateProduct, deleteProduct} = require('../controllers/productController')


router.route('/products').get(getProducts)
router.route('/product/:id').get(getSingleProduct)
router.route('/admin/product/:id').put(updateProduct)
router.route('/admin/product/:id').delete(deleteProduct)
router.route('/admin/products/new').post(newProduct)
module.exports = router



