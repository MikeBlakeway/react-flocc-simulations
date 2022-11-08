const startSimulation = ({ environment, tick, TURNS }, setup, run) => {
    setup(environment, tick)
    run(environment, TURNS)
}

export default startSimulation
