import express from 'express'
import clienteRouter from './src/routes/clienteRouter.js'
import controleRouter from './src/routes/controleRouter.js'
import produtoRouter from './src/routes/produtoRouter.js'
import sequelize from './src/config/database.js'

const app = express()
app.use(express.json())
app.use('/cliente', clienteRouter)
app.use('/produto', produtoRouter)
app.use('/controle', controleRouter)
try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(3000, () => console.log("Servidozin rodando."))
} catch(erro) {
    console.error('Falha ao inicar: ', erro)
    process.exit(1)
}