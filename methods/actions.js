
var Student = require('../models/student')
var jwt = require('jwt-simple')
var config = require ('../config/dbconfig')
const student = require('../models/student')

var functions = {
    addStudent: function (req, res){ 
            var newstudent = Student({
                studentName: req.body.studentName,
                password: req.body.password,
                email: req.body.email,
                age: req.body.age,
                class: req.body.class,
                Course: req.body.Course,
                joinedDate: req.body.joinedDate,
                phonenumber: req.body.phonenumber,
                vcode: req.body.vcode,
            });
            newstudent.save(function(err, newstudent){    
                if(err){
                    res.json({success: false, msg: 'Failed to add'})
                }
                else{
                    res.json({success: true, msg: 'Student data added'})
                }
            })
        
    },

    authenticate: function(req, res){
        Student.findOne({
            vcode: req.body.vcode
        }, function (err, student ){
            if (err) throw err
            if (!student){
                res.status(403).send({success:false, msg:'Authentication Failed, Student not found'})
            }
            else{
                student.comparePassword(req.body.password, function(err, isMatch) {
                    if (isMatch && !err){
                        var token = jwt.encode(student, config.secret)
                        var decodedtoken = jwt.decode(token, config.secret)
                        res.json({
                            success: true, 
                            Id: decodedtoken._id,
                            studentName: decodedtoken.studentName, 
                            age: decodedtoken.age, 
                            phonenumber: decodedtoken.phonenumber, 
                            email: decodedtoken.email, 
                            class: decodedtoken.class,
                            Course: decodedtoken.Course,
                            joinedDate: decodedtoken.joinedDate,
                            token: token,
                        })
                    }
                    else{
                        return res.status(403).send({success: false, msg: 'Authention Failed, Wrong password'})
                    }
                })
            }
        }
        )
    },

    getstudentbyid: function (req, res){
        student.findById(req.params._id)
        .exec(function(err, student){
         res.json({student});
         }
     )},
}

module.exports = functions