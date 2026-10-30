import Cliente from '../models/Cliente.js'

export async function listarClientes() {
    return await Cliente.findAll({ order: [['id', 'ASC']] })
}

export async function buscarClientePorId(id) {
    return await Cliente.findByPk(id)
}

export async function removerCliente(id,res) {
    const Cliente = await buscarClientePorId(id)
    if (Cliente) {
        Cliente.destroy()
    }
    return Cliente
}

export async function atualizarCliente(id, dados, res) {
    const { nome, cpf } = dados
    const ClienteA = await buscarClientePorId(id)
    
    if (ClienteA) {
        if (dados.cpf == null || dados.cpf == undefined) {
            let nomeA = nome ?? ClienteA.nome
            
                if (/^[A-Za-z\sÀ-ý]+$/.test(nomeA)) {
                    await Cliente.update({ nome: nomeA },
                        { where: { id: id } })
                    return res.status(200).json({ message: "Cliente atualizado com sucesso!" })
                } else {
                    return res.status(400).json({ message: "O nome só pode conter letras, espaços e acentos!" })
                }
        } else {
            return res.status(400).json({ message: "Atualize somente o nome!" })
        }
    } else {
        return res.status(404).json({ message: "Cliente não encontrado!" })
    }
}