import { Agent, utils } from 'flocc'

const populateAgents = (environment, tick, colors, population) => {
    for (let i = 0; i < population; i++) {
        const agent = new Agent({
            i,
            color: `${colors[i]} (${i})`,
            wealth: utils.random(300, 500),
        })
        agent.set('tick', tick)
        environment.addAgent(agent)
    }
}

export default populateAgents
