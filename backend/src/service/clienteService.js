import Cliente from '../models/Cliente.js'
import validarCpf from 'validar-cpf';

export async function listarClientes() {
    return await Cliente.findAll({ order: [['id', 'ASC']] })
}

export async function buscarClientePorId(id) {
    return await Cliente.findByPk(id)
}

export async function cadastrarCliente(dados, res) {
    console.log(dados)
    const cpf = dados.cpf
    const clienteBuscado = await Cliente.findOne({
        where: {
            cpf:
                dados.cpf
        }
    })

    if (!clienteBuscado) {
        if (/^[A-Za-z\sÀ-ý]+$/.test(dados.nome)) {
            if (validarCpf(cpf)) {
                const { nome, cpf } = dados
                return Cliente.create({ nome, cpf })
            } else {
                res.status(400).json({ message: "Este CPF não é válido!" })
            }
        } else {
            res.status(400).json({ message: "O nome só pode conter letras, espaços e acentos!" })
        }
    } else {
        res.status(400).json({ message: "Este CPF já está cadastrado" })
    }
}

export async function removerCliente(id,res) {
    const Cliente = await buscarClientePorId(id)
    if (Cliente) {
        Cliente.destroy()
    }
    return Cliente
}

export async function atualizarCliente(id, dados,res) {
    const { nome, cpf } = dados
    const ClienteA = await buscarClientePorId(id)
    
    if (ClienteA) {
        let clienteBuscado = null;
        if (cpf && cpf !== ClienteA.cpf) {
            clienteBuscado = await Cliente.findOne({
                where: { cpf: cpf }
            });
        }
        if (!clienteBuscado) {
            let cpfA = cpf ?? ClienteA.cpf
            let nomeA = nome ?? ClienteA.nome
            
            if (validarCpf(cpfA)) {
                if (/^[A-Za-z\sÀ-ý]+$/.test(nomeA)) {
                    await Cliente.update({ nome: nomeA, cpf: cpfA },
                        { where: { id: id } })
                    return res.status(200).json({ message: "Cliente atualizado com sucesso!" })
                } else {
                    return res.status(400).json({ message: "O nome só pode conter letras, espaços e acentos!" })
                }
            } else {
                return res.status(400).json({ message: "CPF inválido!" })
            }
        } else {
            return res.status(400).json({ message: "O cliente já existe" })
        }
    } else {
        return res.status(404).json({ message: "Cliente não encontrado!" })
    }
}