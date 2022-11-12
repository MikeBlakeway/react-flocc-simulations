import { utils } from 'flocc'
import {
    WOLF_GAIN_FROM_FOOD,
    WOLF_REPRODUCE,
    width,
    height,
} from '../../constants'
import { removeSheep } from '../sheep'
import move from '../common/move'
import { createWolf } from './'

export const tickWolf = (environment, wolf, sheepLocations) => {
    move(wolf, sheepLocations, width)
    wolf.decrement('energy')
    if (wolf.get('energy') < 0) {
        environment.removeAgent(wolf)
        environment.decrement('wolves')
    }
    const here = []
    const r = 6
    for (let y = wolf.get('y') - r; y < wolf.get('y') + r; y++) {
        for (let x = wolf.get('x') - r; x < wolf.get('x') + r; x++) {
            const index =
                (x < 0 ? x + width : x >= width ? x - width : x) +
                (x < 0 ? y + height : y >= height ? y - height : y) * width
            const sheep = sheepLocations[index]
            if (sheep) here.push(sheep)
        }
    }
    if (here.length === 0) return
    let agent = environment.getAgentById(utils.sample(here))
    removeSheep(environment, sheepLocations, agent, width)
    wolf.increment('energy', WOLF_GAIN_FROM_FOOD)
    // reproduce
    if (utils.uniform() < WOLF_REPRODUCE) {
        wolf.set('energy', wolf.get('energy') / 2)
        createWolf(environment, sheepLocations)
    }
}

export default tickWolf
