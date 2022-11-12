import { Agent, utils } from 'flocc'
import { SHEEP_GAIN_FROM_FOOD, width, height } from '../../constants'
import { tickSheep } from './'

const createSheep = (environment, sheepLocations, terrain) => {
    const sheep = new Agent({
        color: 'white',
        size: 1.5,
        energy: utils.random(0, 2 * SHEEP_GAIN_FROM_FOOD),
        x: utils.random(0, width),
        y: utils.random(0, height),
        sheep: 1,
        tick: () =>
            tickSheep(environment, sheep, terrain, sheepLocations, width),
    })
    return sheep
}

export default createSheep
