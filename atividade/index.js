const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const User = require('./models/User')
const app = express()
const Book = require('./models/Book')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// ROTA PARA MOSTRAR O FORMULÁRIO
app.get('/users/create', (req, res)=>{
    return res.render('adduser')
})

// ROTA PARA CADASTRAR AS INFORMAÇÕES DO FORMULÁRIO 
app.post('/users/create', async(req, res)=>{
    const {name, occupation} =  req.body
    let newsletter = req.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }

    console.log(name, occupation, newsletter)

    await User.create({name, occupation, newsletter})
    return res.redirect('/')
})

app.get ('/users/:id', async (req, res)=>{
    const id = req.params.id

    const user = await User.findOne({raw: true, where: { id : id } });
    console.log(user)
    return res.render('viewuser', {user})
});

app.post('/users/delete/:id', async (req, res)=>{
    const id = req.params.id;
    await User.destroy({where: { id: id } })
    return res.redirect('/')
})

app.get('/users/edit/:id', async (req, res)=>{
    const id = req.params.id
    const user = await User.findOne({ raw: true, where: { id: id } });
    return res.render('edituser', {user})
})

app.post('/users/edit/:id', async(req, res) => {
    const { name, occupation } = req.body
    let newsletter = req.body.newsletter
    const id = req.params.id

    if(newsletter === 'on'){
        newsletter = true
    }
    else{
        newsletter = false
    }

    await User.update({name, occupation, newsletter}, { where: {id: id} })
    return res.redirect('/')
})




// ROTA DO BOOK
app.get('/books/create', (req, res)=>{
    return res.render('addlivro')
})

app.post('/books/create', async (req, res)=> {
    const {author, title, preco} = req.body
    let newsletter = req.body.newsletter
    
    if(newsletter === 'on'){
        newsletter = 'true'
    }else{
        newsletter = 'false'
    }

    console.log(author, title, preco, newsletter)

    await Book.create({author, title, preco, newsletter})
    return res.redirect('/')
})

app.get('/books/:id', async (req, res)=>{
    const id = req.params.id
    
    const book = await Book.findOne({raw: true, where: { id : id } })
    res.render('viewbook', {book})
})

app.get('/', async (req, res)=>{
    const users = await User.findAll({raw: true})
    const books = await Book.findAll({raw: true})
    console.log(books)
    console.log(users)
    return res.render('home', {books, users})
})

app.post('/books/delete/:id', async (req, res)=>{
    const id = req.params.id;
    await Book.destroy({where: { id: id } })
    return res.redirect('/')
})

app.get('/books/edit/:id', async (req, res)=>{
    const id = req.params.id
    const book = await Book.findOne({ raw: true, where: { id: id } });
    return res.render('editbook', {book})
})

app.post('/books/edit/:id', async(req, res) => {
    const {author, title, preco} = req.body
    let newsletter = req.body.newsletter
    const id = req.params.id

    if(newsletter === 'on'){
        newsletter = true
    }
    else{
        newsletter = false
    }

    await Book.update({author, title, preco}, { where: {id: id} })
    return res.redirect('/')
})

conn.sync().then(()=>{
    app.listen(9999, ()=>{
        console.log('Servidor Online')
    })
}).catch((err)=>console.log(err))
