const express = require('express')
const { getProjects} = require('../controllers/hero/projectList')

const projectListRouter = express.Router()



projectListRouter.get('/get', getProjects)



module.exports =projectListRouter