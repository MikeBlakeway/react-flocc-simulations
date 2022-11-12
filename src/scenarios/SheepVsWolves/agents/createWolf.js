import { Agent, utils } from 'flocc'
import {
    WOLF_GAIN_FROM_FOOD,
    WOLF_REPRODUCE,
    WIDTH,
    HEIGHT,
} from '../constants'

import { die, sniff, move, hasEnergy, eat, reproduce } from './actions'

export const createWolf = (environment, locations, sheep) => {
    // TODO: Consider converting to Class
    const wolf = {
        add: () => {
            environment.increment('wolves')
            environment.addAgent(
                new Agent({
                    color: '#aaaaaa',
                    size: 4,
                    energy: utils.random(0, 2 * WOLF_GAIN_FROM_FOOD),
                    x: utils.random(0, WIDTH),
                    y: utils.random(0, HEIGHT),
                    wolf: 1,
                    tick: wolf.tick,
                })
            )
        },

        tick: (agent) => {
            // check energy levels before moving
            if (!hasEnergy(agent)) {
                die(environment, agent, 'wolves')
            }
            move(agent, locations)

            // detect potential prey within sense area: returns and array
            const prey = sniff(agent, locations)

            // if no prey then return
            if (prey.length === 0) return

            const target = environment.getAgentById(utils.sample(prey))
            eat(target, sheep, agent)
            // reproduce
            if (utils.uniform() < WOLF_REPRODUCE) {
                reproduce(agent, wolf)
            }
        },
    }
    wolf.add()
    return wolf
}
