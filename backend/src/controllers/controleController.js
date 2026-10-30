import * as clienteService from '../service/clienteService.js'
import * as controleService from '../service/controleService.js'

export  async function listar (req,res) {
    const controles = await controleService.listarClientes()
    return res.status(200).json(controles)
}

export async function buscar (req,res) {
    const controle = await controleService.buscarClientePorId(req.params.id)
     if(!controle){
        return res.status(404).json({message: "O cliente não foi encontrado."})
    }
    return res.status(200).json(controle)
}

export async function remover (req,res) {
    const controle = await controleService.removerCliente(req.params.id)
     if(!controle){
        return res.status(404).json({message: "O cliente não foi encontrado."})
    }else{
        return res.status(200).json(controle)
    }
}

export async function atualizar (req,res) {
    const cliente = await clienteService.atualizarCliente(req.params.id, req.body, res)
     if(!cliente){
        return res.status(404).json({message: "O cliente não foi encontrado."})
    }else{
        return res.status(200).json(cliente)
    }
}