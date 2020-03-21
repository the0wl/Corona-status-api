import { Router } from 'express'
import wom from './data/worldometer'

const routes = new Router()

routes.get('/all', wom.getAllData)
routes.get('/world', wom.getWorldData)
routes.get('/:country', wom.getCountryData)

export default routes