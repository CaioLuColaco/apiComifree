const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    async create(req, res){
        try {
            const {name, location} = req.body

            const result = await prisma.company.create({
                data: {
                    name: name,
                    location: location
                }
            })

            return res.status(200).json(result)

        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async update(req, res) {
        try {

            const companyId = parseInt(req.params.companyId)
            const currentCompany = await prisma.company.findUnique({where: {id: companyId}})

            if(currentCompany.length != 0){
                return res.status(404).json({status: 400, message: "Empresa não encontrada!"})
            }

            const {name, location} = req.body
            const result = await prisma.company.update({
                where: {
                    id: companyId
                },
                data: {
                    name: name || currentCompany.name,
                    location: location || currentCompany.location
                }
            })

            return res.status(200).json(result)
            
        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async delete(req, res){
        try {
            const companyId = parseInt(req.params.companyId)

            const result = await prisma.company.delete({
                where: {
                    id: companyId
                }
            })

            return res.status(200).json(result)

        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async find(req, res){
        try {
            const companyId = parseInt(req.params.companyId)

            const company = await prisma.company.findUnique({
                where: {
                    id: companyId
                }
            })
            
            res.status(200).json(company)

        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    },

    async findAll(req, res){
        try {

            let categories = await prisma.company.findMany({
                include: {
                    products: true
                }
            })
        
            return res.status(200).json(categories)

        } catch (error) {
            return res.status(400).json({status:400, message: error.message})
        }
    }
}