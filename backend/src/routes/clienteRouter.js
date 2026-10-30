import * as clienteController from '../controllers/clienteController.js'
import { Router } from 'express'

const router = Router()


router.get('/:id', clienteController.buscar)

router.get('/', clienteController.listar)

router.post('/', clienteController.cadastrar)

router.put('/:id', clienteController.atualizar)

router.delete('/:id', clienteController.remover)

export default router