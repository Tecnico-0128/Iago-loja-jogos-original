import * as vendaController from '../controllers/vendasController.js'
import { Router } from 'express'

const router = Router()


router.get('/:id', vendaController.buscar)

router.get('/', vendaController.listar)

router.post('/', vendaController.cadastrar)

router.delete('/:id', vendaController.remover)

export default router