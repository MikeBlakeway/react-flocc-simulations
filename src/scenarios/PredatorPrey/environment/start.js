import { MAX_SHEEP, width, height } from '../constants'
import { createTerrain } from '../views'
import createEnvironment from './createEnvironment'

const start = (env, config) => {
    const { setup, run, elements, callBacks } = config
    const sheepLocations = new Array(width * height)

    const environment = createEnvironment(env, elements, callBacks)

    const terrain = createTerrain(width, height)
    environment.use(terrain)

    setup(environment, sheepLocations, terrain)
    run(environment, MAX_SHEEP)
}

export default start
