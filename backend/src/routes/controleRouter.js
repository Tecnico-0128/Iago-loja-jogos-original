import * as controleController from '../controllers/controleController.js'
import { Router } from 'express'

const router = Router()


router.get('/:id', controleController.buscar)

router.get('/', controleController.listar)

router.delete('/:id', controleController.remover)

router.put('/:id', controleController.atualizar)

export default router