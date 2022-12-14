import populateAgents from './populateAgents'
import { POPULATION, COLORS } from '../constants'

const setup = (environment, tick) => {
    environment.set('activated', 0)

    populateAgents(environment, tick, COLORS, POPULATION)

    const agents = environment.getAgents()

    agents.forEach((agent, i) => {
        // commitments to all other agents are 0,
        // except self, which is 1
        for (let j = 0; j < POPULATION; j++) {
            agent.set(`c.${j}`, i === j ? 1 : 0)
        }
        // set prev and next agents
        agent.set('prev', agents[i === 0 ? POPULATION - 1 : i - 1])
        agent.set('next', agents[i === POPULATION - 1 ? 0 : i + 1])
    })
}

export default setup
