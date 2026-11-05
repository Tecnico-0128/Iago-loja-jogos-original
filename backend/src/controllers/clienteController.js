import * as clienteService from '../service/clienteService.js'

export  async function listar (req,res) {
    const clientes = await clienteService.listarClientes()
    return res.status(200).json(clientes)
}

export async function cadastrar (req,res) {
    const cliente = await clienteService.cadastrarCliente(req.body, res)
    return res.status(201).json(cliente)
}

export async function buscar (req,res) {
    const cliente = await clienteService.buscarClientePorId(req.params.id)
     if(!cliente){
        return res.status(404).json({message: "O cliente não foi encontrado."})
    }
    return res.status(200).json(cliente)
}

export async function remover (req,res) {
    const cliente = await clienteService.removerCliente(req.params.id)
     if(!cliente){
        return res.status(404).json({message: "O cliente não foi encontrado."})
    }else{
        return res.status(200).json(cliente)
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