var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')
var studentSchema = new Schema({
    studentName: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    age: {
        type: String,
    },
    class: {
        type: String,
    },
    Course: {
        type: String,
    },
    jonedDate: {
        type: String,
    },
    phonenumber: {
        type: String,
    },
    vcode: {
        type: String,
    },
    result: [
        {
            Id: String,
            Name: String, 
            result: String}
        ],
}) 

studentSchema.pre('save', function(next){
    var student = this;
    if(this.isModified('password') || this.isNew){
        bcrypt.genSalt(10, function(err, salt){
            if (err) {
                return next (err)
            }
            bcrypt.hash(student.password, salt, function(err, hash){
                if (err) {
                    return next (err)
                }
                student.password = hash;
                next()
            })
        })
    }
    else{
        return next()
    }
})

studentSchema.pre('update', function(next){
    var student = this;
    if(this.isModified('password') || this.isNew){
        bcrypt.genSalt(10, function(err, salt){
            if (err) {
                return next (err)
            }
            bcrypt.hash(student.password, salt, function(err, hash){
                if (err) {
                    return next (err)
                }
                student.password = hash;
                next()
            })
        })
    }
    else{
        return next()
    }
})

studentSchema.methods.comparePassword = function(passw, cb){
    bcrypt.compare(passw, this.password, function(err, isMatch){
        if(err){
            return cb(err)
        }
        cb(null, isMatch)
    })
}


module.exports = mongoose.model('Student',studentSchema)