import { WOLF_SENSE_RADIUS } from '../../../constants'
import { getPreyIndex } from './getPreyIndex'

export const sniff = (agent, locations) => {
    const { minY, maxY, minX, maxX } = getSenseArea(agent)

    const prey = []
    for (let y = minY; y < maxY; y++) {
        for (let x = minX; x < maxX; x++) {
            const preyLocated = findPrey(locations, x, y)
            if (preyLocated) prey.push(preyLocated)
        }
    }
    return prey
}

const findPrey = (locations, x, y) => locations[getPreyIndex(x, y)]

const getSenseArea = (agent) => {
    const _y = agent.get('y')
    const _x = agent.get('x')

    return {
        minY: _y - WOLF_SENSE_RADIUS,
        maxY: _y + WOLF_SENSE_RADIUS,
        minX: _x - WOLF_SENSE_RADIUS,
        maxX: _x + WOLF_SENSE_RADIUS,
    }
}
