import Cliente from '../models/Cliente.js'
import Produto from '../models/Produto.js'
import Venda from '../models/Venda.js'

export async function listarTudo() {
    return await Cliente.findAll({ order: [['id', 'ASC']] })
    return await Produto.findAll({ order: [['id', 'ASC']] })
    return await Venda.findAll({ order: [['id', 'ASC']] })
}