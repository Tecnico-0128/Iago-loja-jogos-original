import Produto from '../models/Produto.js'

export async function listarProdutos() {
    return await Produto.findAll({ order: [['id', 'ASC']] })
}

export async function buscarProdutoPorId(id) {
    return await Produto.findByPk(id)
}

export async function cadastrarProduto(dados, res) {
    const nomep = dados.nomep
    const produtoBuscado = await Produto.findOne({
        where: {
            nomep:
                dados.nomep
        }
    })

    if (!produtoBuscado) {
        if(dados.preco>0){
            if(dados.quantidade>-1){
                const { nomep, preco, quantidade} = dados
                return Produto.create({ nomep, preco, quantidade })
            }else{
                res.status(400).json({ message: "A quantidade do produto deve ser igual ou maior que 0!" })
            }
        }else{
            res.status(400).json({ message: "O valor do produto deve ser maior que 0!" })
        }
    } else {
        res.status(400).json({ message: "O produto já existe!" })
    }
}

export async function removerProduto(id) {
    const Produto = await buscarProdutoPorId(id)
    if (Produto) {
        await Produto.destroy()
    }
    return Produto
}

export async function atualizarProduto(id, dados, res) {
    const { nomep, preco, quantidade } = dados
    const ProdutoA = await buscarProdutoPorId(id)
    
    if (ProdutoA) {
        let produtoBuscado = null
        if (nomep && nomep !== ProdutoA.nomep) {
            produtoBuscado = await Produto.findOne({
                where: {
                    nomep: nomep
                }
            })
        }

        if (!produtoBuscado) {
            let nomeA = nomep ?? ProdutoA.nomep
            let precoA = preco ?? ProdutoA.preco
            let quantidadeA = quantidade ?? ProdutoA.quantidade
            
            if (precoA > 0) {
                if (quantidadeA > -1) {
                    await Produto.update(
                        { nomep: nomeA, preco: precoA, quantidade: quantidadeA },
                        { where: { id: id } }
                    )
                    return res.status(200).json({ message: "Produto atualizado com sucesso!" })
                } else {
                    return res.status(400).json({ message: "A quantidade do produto deve ser igual ou maior que 0!" })
                }
            } else {
                return res.status(400).json({ message: "O preço do produto deve ser maior que 0!" })
            }
        } else {
            return res.status(400).json({ message: "O produto já existe" })
        }
    } else {
        return res.status(404).json({ message: "Produto não encontrado!" })
    }
}
