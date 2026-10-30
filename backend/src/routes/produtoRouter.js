import * as produtoController from '../controllers/produtoController.js'
import { Router } from 'express'

const router = Router()


router.get('/:id', produtoController.buscar)

router.get('/', produtoController.listar)

router.post('/', produtoController.cadastrar)

router.put('/:id', produtoController.atualizar)

router.delete('/:id', produtoController.remover)

export default router