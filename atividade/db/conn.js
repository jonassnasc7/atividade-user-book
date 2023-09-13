const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodesequelize','aluno_medio', '@lunoSenai23.', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
})

// try{
//     sequelize.authenticate()
//     console.log('Conectado com sucesso')
// }catch(error){
//     console.log(error)
// }

module.exports = sequelize