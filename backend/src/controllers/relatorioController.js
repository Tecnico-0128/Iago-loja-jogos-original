import * as relatorioService from '../service/relatorioService.js'

export  async function listar (req,res) {
    const controles = await controleService.listarTudo()
    return res.status(200).json(relatorio)
}
