const setInitialTributes = (agents, population) => {
    agents.forEach((agent, i) => {
        // commitments to all other agents are 0,
        // except self, which is 1
        for (let j = 0; j < population; j++) {
            agent.set(`c.${j}`, i === j ? 1 : 0)
        }
        // set prev and next agents
        agent.set('prev', agents[i === 0 ? population - 1 : i - 1])
        agent.set('next', agents[i === population - 1 ? 0 : i + 1])
    })
}

export default setInitialTributes
