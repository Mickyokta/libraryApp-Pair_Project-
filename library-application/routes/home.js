const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.homePage)
router.get('/booklist', Controller.bookList)
router.get('/booklist/borrow/:bookId/:profileId', Controller.borrowBook)
router.get('/booklist/addbook', Controller.addBookPage) // adm
router.post('/booklist/addbook', Controller.addBook) // adm
router.get('/bookList/borrowed/:profileId', Controller.borrowedBookPage)
router.get('/booklist/delete/:bookId', Controller.deleteBook)
router.get('/booklist/borrowedAdmin', Controller.borrowedBookAdmin) //adm
router.get('/bookList/borrowed/:profileId/return/:bookId', Controller.returnBook)

module.exports = router