import * as compraController from '../controllers/compraController.js'
import { Router } from 'express'

const router = Router()


router.get('/:id', compraController.buscar)

router.get('/', compraController.listar)

router.post('/', compraController.cadastrar)

router.put('/:id', compraController.atualizar)

router.delete('/:id', compraController.remover)

export default router