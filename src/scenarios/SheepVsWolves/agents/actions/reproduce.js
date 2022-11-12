export const reproduce = (agent, wolf) => {
    agent.set('energy', agent.get('energy') / 2)
    wolf.add()
}
