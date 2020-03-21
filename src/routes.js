import { Router } from 'express'
import wom from './data/worldometer'

const routes = new Router()

routes.get('/', (req, res) => {
    res.send("The avaible methods are:\n/world\n/all\n/:country\n")
})
routes.get('/all', wom.getAllData)
routes.get('/world', wom.getWorldData)
routes.get('/:country', wom.getCountryData)

export default routes