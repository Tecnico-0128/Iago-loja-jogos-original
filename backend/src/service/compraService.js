import Produto from '../models/Produto.js'
import Compra from '../models/Compra.js'

export async function listarCompras() {
    return await Compra.findAll({ order: [['id', 'ASC']] })
}

export async function buscarCompraPorId(id) {
    return await Compra.findByPk(id)
}

export async function cadastrarCompra(dados, res) {
    const produtoBuscado = await Produto.findOne({
        where: {
            nomep:
                dados.produtoa
        }
    })
        if(produtoBuscado){
            if(dados.quantidadea > 0){
                const {produtoa, quantidadea } = dados
                await Produto.update({ quantidade: dados.quantidadea },
                        { where: { nomep: dados.produtoa} })
                return Compra.create({ produtoa, quantidadea })
            }else{
                res.status(400).json({ message: "Deve-se comprar pelo menos um produto!" })
            }
        }else{
            res.status(400).json({ message: "Produto não encontrado!" })
        }
}

export async function removerCompra(id,res, dados) {
    const Compra = await buscarCompraPorId(id)
    if (Compra) {
        const produtoBuscado = await Produto.findOne({
        where: {
            nomep:
                dados.produtoa
        }
    })
        await Produto.update({ quantidade: produtoBuscado.quantidade },
                        { where: { nomep: dados.produtoa } })
        Compra.destroy()
    }
    return Compra
}

export async function atualizarCompra(id, dados, res) {
    const {quantidade_produto } = dados
    const CompraA = await buscarCompraPorId(id)
    if(CompraA){
                if (dados.quantidade_produto> 0) {
                    await Compra.update({ quantidade_produto: quantidade_produto },
                        { where: { id: id } })
                    return res.status(200).json({ message: "Compra atualizado com sucesso!" })
                } else {
                    return res.status(400).json({ message: "A quantidade deve ser maior que zero!" })
                }
            }else{
                return res.status(400).json({ message: "Compra nao encontrada!" })
            }
}