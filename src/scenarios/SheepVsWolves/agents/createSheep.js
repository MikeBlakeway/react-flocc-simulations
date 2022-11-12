import { Agent, utils } from 'flocc'
import { move } from './actions'
import {
    SHEEP_GAIN_FROM_FOOD,
    SHEEP_REPRODUCE,
    WIDTH,
    HEIGHT,
} from '../constants'

export const createSheep = (environment, locations, terrain) => {
    const sheep = {
        add: () => {
            const sheepAgent = new Agent({
                color: 'white',
                size: 1.5,
                energy: utils.random(0, 2 * SHEEP_GAIN_FROM_FOOD),
                x: utils.random(0, WIDTH),
                y: utils.random(0, HEIGHT),
                sheep: 1,
                tick: sheep.tick,
            })
            environment.increment('sheep')
            environment.addAgent(sheepAgent)
            locations[sheepAgent.get('x') + sheepAgent.get('y') * WIDTH] =
                sheepAgent.id
        },
        remove: (agent) => {
            environment.removeAgent(agent)
            environment.decrement('sheep')
            locations[agent.get('x') + agent.get('y') * WIDTH] = 0
        },
        tick: (agent) => {
            move(agent, locations)

            agent.decrement('energy')
            if (agent.get('energy') < 0) sheep.remove(agent)
            const { x, y } = agent.getData()
            const grass = terrain.sample(x, y).g
            if (grass > 0) {
                const amountToEat = Math.min(SHEEP_GAIN_FROM_FOOD, grass)
                agent.increment('energy', amountToEat)
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
                agent.set('energy', agent.get('energy') / 2)
                sheep.add(environment, locations)
            }
        },
    }
    sheep.add()
    return sheep
}
