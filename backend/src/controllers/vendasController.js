import * as vendaService from '../service/vendaService.js'

export  async function listar (req,res) {
    const vendas = await vendaService.listarVendas()
    return res.status(200).json(vendas)
}

export async function cadastrar (req,res) {
    const venda = await vendaService.cadastrarVenda(req.body, res)
    return res.status(201).json(venda)
}

export async function buscar (req,res) {
    const venda = await vendaService.buscarVendaPorId(req.params.id)
     if(!venda){
        return res.status(404).json({message: "O venda não foi encontrado."})
    }
    return res.status(200).json(venda)
}

export async function remover (req,res) {
    const venda = await vendaService.removerVenda(req.params.id)
     if(!venda){
        return res.status(404).json({message: "O venda não foi encontrado."})
    }else{
        return res.status(200).json(venda)
    }
}