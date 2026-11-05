import * as compraService from '../service/compraService.js'

export  async function listar (req,res) {
    const compras = await compraService.listarCompras()
    return res.status(200).json(compras)
}

export async function cadastrar (req,res) {
    const compra = await compraService.cadastrarCompra(req.body, res)
    return res.status(201).json(compra)
}

export async function buscar (req,res) {
    const compra = await compraService.buscarCompraPorId(req.params.id)
     if(!compra){
        return res.status(404).json({message: "O compra não foi encontrado."})
    }
    return res.status(200).json(compra)
}

export async function remover (req,res) {
    const compra = await compraService.removerCompra(req.params.id)
     if(!compra){
        return res.status(404).json({message: "O compra não foi encontrado."})
    }else{
        return res.status(200).json(compra)
    }
}


export async function atualizar (req,res) {
    const compra = await compraService.atualizarCompra(req.params.id, req.body, res)
     if(!compra){
        return res.status(404).json({message: "O compra não foi encontrado."})
    }else{
        return res.status(200).json(compra)
    }
}