export const die = (environment, agent, type) => {
    environment.removeAgent(agent)
    environment.decrement(type)
}
