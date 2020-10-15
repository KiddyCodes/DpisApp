const express = require('express')
const actions = require('../methods/actions')
const router = express.Router()
require('../config/dbconfig.js')



router.get('/', (req, res) => {
    res.send('DPIS API')
})

 //@desc To Add a new student
 //@route POST /adduser
 router.post('/addstudent', actions.addStudent)
 //@desc To Authenticate a new user
 //@route POST /authenticate
 router.post('/authenticate', actions.authenticate)



module.exports = router