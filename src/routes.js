const express = require("express")

const routes = express.Router()

const ProductControllers = require("./controllers/ProductControllers")
const CategoryControllers = require("./controllers/CategoryControllers")
const CompanyControllers = require("./controllers/CompanyControllers")

// Products
routes.get("/products",                     ProductControllers.findAll)
routes.get("/product/:productId",           ProductControllers.find)
routes.post("/product",                     ProductControllers.create)
routes.put("/product/:productId",           ProductControllers.update)
routes.delete("/product/:productId",        ProductControllers.delete)

// Category
routes.get("/categories",                   CategoryControllers.findAll)
routes.get("/category/:categoryId",         CategoryControllers.find)
routes.post("/category",                    CategoryControllers.create)
routes.put("/category/:categoryId",         CategoryControllers.update)
routes.delete("/category/:categoryId",      CategoryControllers.delete)

// Company
routes.get("/companies",                    CompanyControllers.findAll)
routes.get("/company/:companyId",           CompanyControllers.find)
routes.post("/company",                     CompanyControllers.create)
routes.put("/company/:companyId",           CompanyControllers.update)
routes.delete("/company/:companyId",        CompanyControllers.delete)

module.exports = routes