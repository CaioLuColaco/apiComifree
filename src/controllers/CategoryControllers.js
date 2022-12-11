import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

module.exports = {
    async create(req, res){
        try {
            const {name, description} = req.body

            const result = await prisma.category.create({
                data: {
                    name: name,
                    description: description
                }
            })

            return res.status(200).json(result)

        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async update(req, res) {
        try {

            const categoryId = parseInt(req.params.categoryId)
            const currentCategory = await prisma.category.findUnique({where: {id: categoryId}})

            if(currentCategory.length != 0){
                return res.status(404).json({status: 400, message: "Categoria não encontrada!"})
            }

            const {name, description} = req.body
            const result = await prisma.category.update({
                where: {
                    id: categoryId
                },
                data: {
                    name: name || currentCategory.name,
                    description: description || currentCategory.description
                }
            })

            return res.status(200).json(result)
            
        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async delete(req, res){
        try {
            const categoryId = parseInt(req.params.categoryId)

            const result = await prisma.category.delete({
                where: {
                    id: categoryId
                }
            })

            return res.status(200).json(result)

        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async find(req, res){
        try {
            const categoryId = parseInt(req.params.categoryId)

            const category = await prisma.category.findUnique({
                where: {
                    id: categoryId
                }
            })
            
            res.status(200).json(category)

        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async findAll(req, res){
        try {

            let categories = await prisma.category.findMany({
                include: {
                    product: true
                }
            })
        
            return res.status(200).json(categories)

        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    }
}