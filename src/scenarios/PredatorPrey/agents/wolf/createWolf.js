import { Agent, utils } from 'flocc'
import { tickWolf } from './'
import { WOLF_GAIN_FROM_FOOD, width, height } from '../../constants'

const createWolf = (environment, sheepLocations) => {
    const wolf = new Agent({
        color: '#cedee7',
        size: 2.5,
        energy: utils.random(0, 2 * WOLF_GAIN_FROM_FOOD),
        x: utils.random(0, width),
        y: utils.random(0, height),
        wolf: 1,
        tick: () => tickWolf(environment, wolf, sheepLocations),
    })

    return wolf
}

export default createWolf
