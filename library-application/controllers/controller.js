const { Op } = require('sequelize')
const {User, Profile, Book} = require('../models/index.js')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

class Controller{
    static loginPage(req, res){
        let {status} = req.query
        if(status){
            let newStatus = status.split('').map((el)=> {
                if(el == '-'){
                    return ' '
                } else {
                    return el
                }
            }).join('')
            res.render('loginPage', {status: newStatus})
        } else {
            res.render('loginPage', {status})
        }
    }
    static loginCheck(req, res){
        let {email, password} = req.body
        User.findOne({
            where:{
                email
            },
            include : Profile
        })
        .then((data)=> {
            if(!data){
                res.redirect('/login?status=Email-is-Invalid')
            }
            else{
                if(data.password == password){
                    if(data.role == 'admin'){
                        // res.render('adminHomePage', {data})
                        res.redirect(`/home?status=admin&id=${data.id}`)
                    }
                    else{
                        // res.render('homePage', {data})
                        res.redirect(`/home?status=user&id=${data.id}`)
                    }
                }
                else{
                    res.redirect('/login?status=Wrong-Password')
                }
            }
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
    }
    static createAccountPage(req, res){
        res.render('createAccountPage')
    }
    static createAccount(req, res){
        let {firstName, lastName, username, email, password, address, phoneNumber, city, province, zip} = req.body
        let userInput = {
            username,
            email,
            password,
            role: "User"
        }
        let profileInput = {
            firstName,
            lastName,
            address,
            phoneNumber,
            city,
            province,
            zip
        }
        User.findAll({raw: true})
        .then((data)=> {
            profileInput.UserId = data[data.length-1].id +1
            return User.create(userInput)
        })
        .then(()=>{
            return Profile.create(profileInput)
        })
        .then(()=> {
            res.redirect('/login?status=Account-Created')
        })
        .catch((err)=> {
            let error = err.errors.map((el)=> {
                return el.message
            })
            res.redirect(`/?status=${error}`)
        })
    }
    static homePage(req, res){
        let status = req.query.status
        let id = +req.query.id
        let profileData = ''
        if(status == 'admin'){
            User.findByPk(id, {include: Profile})
            .then((data)=> {
                profileData = data
                console.log(`masuk banh`)
                return Book.findAll()
            })
            .then((books)=> {
                let randomId1 = Math.floor(Math.random()*books.length)
                let randomId2 = Math.floor(Math.random()*books.length)
                let randomId3 = Math.floor(Math.random()*books.length)
                for(let i = 0; i < 1; i--){
                    if(randomId1 == randomId2 || randomId1 == randomId3 || randomId2 == randomId3 || randomId1 == books.length || randomId2 == books.length || randomId3 == books.length){
                        randomId1 = Math.floor(Math.random()*books.length)
                        randomId2 = Math.floor(Math.random()*books.length)
                        randomId3 = Math.floor(Math.random()*books.length)
                    } else {
                        break
                    }
                }
                res.render('adminHomePage', {data: profileData, book1: books[randomId1], book2: books[randomId2], book3: books[randomId3]})
            })
            .catch((err)=> {
                res.send(err)
            })
        }
        else{
            User.findByPk(id, {include: Profile})
            .then((data)=> {
                profileData = data
                console.log(`masuk banh`)
                return Book.findAll()
            })
            .then((books)=> {
                let randomId1 = Math.floor(Math.random()*books.length)
                let randomId2 = Math.floor(Math.random()*books.length)
                let randomId3 = Math.floor(Math.random()*books.length)
                for(let i = 0; i < 1; i--){
                    if(randomId1 == randomId2 || randomId1 == randomId3 || randomId2 == randomId3 || randomId1 == books.length || randomId2 == books.length || randomId3 == books.length){
                        randomId1 = Math.floor(Math.random()*books.length)
                        randomId2 = Math.floor(Math.random()*books.length)
                        randomId3 = Math.floor(Math.random()*books.length)
                    } else {
                        break
                    }
                }
                res.render('homePage', {data: profileData, book1: books[randomId1], book2: books[randomId2], book3: books[randomId3]})
            })
            .catch((err)=> {
                res.send(err)
            })
        }
    }
    static bookList(req, res){
        let {status, id, filter} = req.query
        if(status){
            if(status == 'admin'){
                let option = {}
                if(filter){
                    if(filter === 'HNT'){
                        filter = 'Horror and Thriller'
                    } else if (filter === 'YA'){
                        filter = 'Young adult'
                    } else if (filter ==='CF'){
                        filter = `Children's Fiction`
                    } else if (filter === 'BNM'){
                        filter = 'Biography and Memoir'
                    }
                    option.where = {genre: filter}
                }
                Book.findAll(option)
                .then((data)=> {
                    console.log(data, id)
                    res.render('bookListAdmin', {data, profileId:id})
                })
                .catch((err)=> {
                    console.log(err)
                })
            } else {
                let option = {where: {
                    status: 'Available'
                }}
                let books = ''
                if(filter){
                    if(filter === 'HNT'){
                        filter = 'Horror and Thriller'
                    } else if (filter === 'YA'){
                        filter = 'Young adult'
                    } else if (filter ==='CF'){
                        filter = `Children's Fiction`
                    } else if (filter === 'BNM'){
                        filter = 'Biography and Memoir'
                    }
                    option.where.genre = filter
                }
                Book.findAll(option)
                .then((data)=> {
                    books = data
                })
                .then(()=> {
                    res.render('bookList', {data: books, profileId:id})
                })
                .catch((err)=> {
                    console.log(err)
                })
            }
        }
    }
    static borrowBook(req, res){
        let {bookId, profileId} = req.params
        Book.update({
            ProfileId: profileId,
            status: 'Borrowed'
        }, {
            where:{
                id: {
                    [Op.eq]: bookId
                }
            }
        })
        .then(()=> {
            return Profile.findByPk(profileId, {include:User})
        })
        .then((data)=> {
            console.log(data)
            res.redirect(`/home/booklist?status=${data.User.role}&id=${profileId}`)
        })
        .catch((err)=> {
            console.log(err)
            res.send(err)
        })
    }
    static addBookPage(req, res){
        res.render('addBookPage')
    }
    static addBook(req, res){
        let {title, author, yearOfReleased, genre, image, synopsis} = req.body
        let obj = {title, author, yearOfReleased, genre, image, synopsis}
        obj.ProfileId = 1
        obj.status = 'Available'
        Book.create(obj)
        .then((data)=> {
            res.redirect('/home/booklist?status=admin&id=1')
        })
        .catch((err)=> {
            let error = err.errors.map((el)=> {
                return el.message
            })
            res.send(error)
        }
        )
    }
    static borrowedBookPage(req, res){
        let {profileId} = req.params
        let {filter} = req.query
        let option = {
            where:{
                ProfileId: profileId
            }
        }
        if(filter){
            if(filter === 'HNT'){
                filter = 'Horror and Thriller'
            } else if (filter === 'YA'){
                filter = 'Young adult'
            } else if (filter ==='CF'){
                filter = `Children's Fiction`
            } else if (filter === 'BNM'){
                filter = 'Biography and Memoir'
            }
            option.where.genre = filter
        }
        let books = ''
        Book.findAll(option)
        .then((data)=> {
            books = data
            return Profile.findByPk(profileId)
        })
        .then((profile)=> {
            console.log(profile)
            res.render('borrowedBookPage', {data: books, profile})
        })   
        .catch((err)=> {
            res.send(err)
        })
    }
    static deleteBook(req, res){
        let {bookId} = req.params
        Book.destroy({
            where:{
                id: +bookId
            }
        })
        .then(()=> {
            res.redirect('/home/booklist?status=admin&id=1')
        })
        .catch((err)=> {
            res.send(err)
        })
    }
    static borrowedBookAdmin(req, res){
        Book.findAll({
            where: {
                status: "Borrowed"
            },
            include: Profile
        })
        .then((data)=> {
            res.render('adminBorrowedBookPage', {data})
        })
        .catch((err)=> {
            res.send(err)
        })
    }
    static returnBook(req, res){
        let {profileId, bookId} = req.params
        Book.update({
            ProfileId: 1,
            status : 'Available'
        }, {where:{
            id: bookId
        }})
        .then(()=> {
            res.redirect(`/home/booklist/borrowed/${profileId}`)
        })
    }
}

module.exports = Controller