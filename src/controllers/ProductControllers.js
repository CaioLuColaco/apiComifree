import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

module.exports = {
    async create(req, res){
        try {
            const {title, description, price, quantity, validity, categoryId, companyId} = req.body

            const result = await prisma.product.create({
                data: {
                    title: title,
                    description: description,
                    price: price, 
                    quantity: quantity, 
                    validity: validity, 
                    categoryId: categoryId, 
                    companyId: companyId
                }
            })

            return res.status(200).json(result)

        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async update(req, res) {
        try {

            const productId = parseInt(req.params.productId)
            const currentProduct = await prisma.product.findUnique({where: {id: productId}})

            if(currentProduct.length != 0){
                return res.status(404).json({status: 400, message: "Produto não encontrado!"})
            }

            const {title, description, price, quantity, validity, categoryId, companyId} = req.body
            const result = await prisma.product.update({
                where: {
                    id: productId
                },
                data: {
                    title: title || currentProduct.title,
                    description: description || currentProduct.description,
                    price: price || currentProduct.price, 
                    quantity: quantity || currentProduct.quantity, 
                    validity: validity || currentProduct.validity, 
                    categoryId: categoryId || currentProduct.categoryId, 
                    companyId: companyId || currentProduct.companyId
                }
            })

            return res.status(200).json(result)
            
        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async delete(req, res){
        try {
            const productId = parseInt(req.params.productId)

            const result = await prisma.product.delete({
                where: {
                    id: productId
                }
            })

            return res.status(200).json(result)

        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async find(req, res){
        try {
            const productId = parseInt(req.params.productId)

            const product = await prisma.product.findUnique({
                where: {
                    id: productId
                }
            })
            
            res.status(200).json(product)

        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async findAll(req, res){
        try {
            const filter = Object.fromEntries(
                Object.entries(req.query).filter(([_, v]) => v != null && v !== "")
            );

            let products = await prisma.product.findMany({
                include: {
                    category: true,
                    company: true
                }
            })

            if(filter.category) {
                products = products.filter(product => product.category.name == filter.category)
            }
            if(filter.company) {
                products = products.filter(product => product.company.name == filter.company)
            }
            if(filter.value_min) {
                products = products.filter(product => product.title == filter.value_min)
            }
            if(filter.value_max) {
                products = products.filter(product => product.price <= filter.value_max)
            }
            if(filter.validity_max) {
                products = products.filter(product => product.validity <= filter.validity_max)
            }
        
            return products? res.status(200).json(products) : res.status(404).json({status: 400, message: "Nenhum produto encontrado!"})

        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    }
}