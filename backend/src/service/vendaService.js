import Produto from '../models/Produto.js'
import Cliente from '../models/Cliente.js'
import Venda from '../models/Venda.js'

export async function listarVendas() {
    return await Venda.findAll({ order: [['id', 'ASC']] })
}

export async function buscarVendaPorId(id) {
    return await Venda.findByPk(id)
}

export async function cadastrarVenda(dados, res) {
    const clienteBuscado = await Cliente.findOne({
        where: {
            cpf:
                dados.cpf_cliente
        }
    })

    const produtoBuscado = await Produto.findOne({
        where: {
            nomep:
                dados.nome_produto
        }
    })

    if (clienteBuscado) {
        if(produtoBuscado){
            if(produtoBuscado.quantidade >= dados.quantidade_produto){
                const { cpf_cliente, nome_produto, quantidade_produto } = dados
                return Venda.create({ cpf_cliente, nome_produto, quantidade_produto })
            }else{
                res.status(400).json({ message: "Este produto não tem quantidade suficiente!" })
            }
        }else{
            res.status(400).json({ message: "Produto não encontrado!" })
        }
    } else {
        res.status(400).json({ message: "Cliente não encontrado!" })
    }
}

export async function removerVenda(id,res, dados) {
    const Venda = await buscarVendaPorId(id)
    if (Venda) {
        const produtoBuscado = await Produto.findOne({
        where: {
            nomep:
                dados.nome_produto
        }
    })
        Venda.destroy()
    }
    return Venda
}

export async function atualizarVenda(id, dados, res) {
    const {quantidade_produto } = dados
    const VendaA = await buscarVendaPorId(id)
    if(VendaA){
                if (dados.quantidade_produto> 0) {
                    await Venda.update({ quantidade_produto: quantidade_produto },
                        { where: { id: id } })
                    return res.status(200).json({ message: "Venda atualizado com sucesso!" })
                } else {
                    return res.status(400).json({ message: "A quantidade deve ser maior que zero!" })
                }
            }else{
                return res.status(400).json({ message: "Venda nao encontrada!" })
            }
}