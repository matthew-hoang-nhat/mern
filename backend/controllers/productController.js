const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncErrors')

exports.newProduct =catchAsyncError( async (req, res, next) => {
    const product = await Product.create(req.body)

    res.status(201).json(
        {
            success:true,
            product
        }
    )
})

exports.getProducts = catchAsyncError( async (req, res, next) => {
    const products = await Product.find()

    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
}
)
exports.getSingleProduct = catchAsyncError( async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product){
       return next(new ErrorHandler('Product not found', 404))
        
    }

    res.status(200).json({
        success: true,
        product
    })
})

exports.updateProduct = catchAsyncError( async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product){
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        }) 
    }
    product = await Product.findByIdAndUpdate(req.params.id, res.body, {
        new: true,
        runValidators: true,
    })
    
    res.status(200).json({
        success: true,
        product
    })
})


exports.deleteProduct = catchAsyncError( async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product){
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        }) 
    }
    product = await Product.findByIdAndDelete(req.params.id, res.body, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        message: 'Product is deleted'
    })
})

