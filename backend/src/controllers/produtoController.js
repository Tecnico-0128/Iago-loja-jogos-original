import * as produtoService from '../service/produtoService.js'

export  async function listar (req,res) {
    const produtos = await produtoService.listarProdutos()
    return res.status(200).json(produtos)
}

export async function cadastrar (req,res) {
    const produto = await produtoService.cadastrarProduto(req.body, res)
    return res.status(201).json(produto)
}

export async function buscar (req,res) {
    const produto = await produtoService.buscarProdutoPorId(req.params.id)
     if(!produto){
        return res.status(404).json({message: "O produto não foi encontrado."})
    }
    return res.status(200).json(produto)
}

export async function remover (req,res) {
    const produto = await produtoService.removerProduto(req.params.id)
     if(!produto){
        return res.status(404).json({message: "O produto não foi encontrado."})
    }else{
        return res.status(200).json(produto)
    }
}


export async function atualizar (req,res) {
    const produto = await produtoService.atualizarProduto(req.params.id, req.body, res)
     if(!produto){
        return res.status(404).json({message: "O produto não foi encontrado."})
    }else{
        return res.status(200).json(produto)
    }
}