const runTributesSimulation = (environment, turns) => {
    // tick once in random order
    environment.tick({ randomizeOrder: true })
    // reset the # of agents who have been activated
    environment.set('activated', 0)
    // increase everyone's wealth by 20
    environment.getAgents().forEach((a) => {
        a.increment('wealth', 20)
    })
    // stop after the number of turns
    if (environment.time >= turns) return
    requestAnimationFrame(() => runTributesSimulation(environment, turns))
}

export default runTributesSimulation
