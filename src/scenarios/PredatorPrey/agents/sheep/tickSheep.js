import { utils } from 'flocc'

import move from '../common/move'
import { removeSheep, populateSheep } from './'

import { SHEEP_GAIN_FROM_FOOD, SHEEP_REPRODUCE } from '../../constants'

const tickSheep = (environment, sheep, terrain, sheepLocations, width) => {
    move(sheep, sheepLocations, width)
    sheep.decrement('energy')
    if (sheep.get('energy') < 0)
        removeSheep(environment, sheepLocations, sheep, width)
    const { x, y } = sheep.getData()
    const grass = terrain.sample(x, y).g
    if (grass > 0) {
        const amountToEat = Math.min(SHEEP_GAIN_FROM_FOOD, grass)
        sheep.increment('energy', amountToEat)
        ;[-1, 0, 1].forEach((_y) => {
            ;[-1, 0, 1].forEach((_x) => {
                const { r, g, b, a } = terrain.sample(x + _x, y + _y)
                terrain.set(x + _x, y + _y, r, g - 15, b, a)
            })
        })
        terrain.set(x, y, grass - 8 * amountToEat)
    }
    // reproduce
    if (utils.uniform() < SHEEP_REPRODUCE) {
        sheep.set('energy', sheep.get('energy') / 2)
        populateSheep(environment, sheepLocations, terrain)
    }
}

export default tickSheep
