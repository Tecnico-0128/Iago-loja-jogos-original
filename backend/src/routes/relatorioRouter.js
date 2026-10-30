import * as relatorioController from '../controllers/relatorioController.js'
import { Router } from 'express'

const router = Router()

router.get('/', relatorioController.listar)

export default router