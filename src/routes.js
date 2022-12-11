const express = require("express")

const routes = express.Router()

const ProductControllers = require("./controllers/ProductControllers")
const CategoryControllers = require("./controllers/CategoryControllers")
const CompanyControllers = require("./controllers/CompanyControllers")

// Products
routes.get("/products",             ProductControllers.findAll)
routes.get("/product/:id",          ProductControllers.find)
routes.post("/product",             ProductControllers.update)
routes.delete("/product/:id",       ProductControllers.delete)

// Category
routes.get("/categories",           CategoryControllers.findAll)
routes.get("/category/:id",         CategoryControllers.find)
routes.post("/category",            CategoryControllers.update)
routes.delete("/category/:id",      CategoryControllers.delete)

// Company
routes.get("/companies",            CompanyControllers.findAll)
routes.get("/company/:id",          CompanyControllers.find)
routes.post("/company",             CompanyControllers.update)
routes.delete("/company/:id",       CompanyControllers.delete)

module.exports = routes