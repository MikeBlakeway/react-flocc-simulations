export const populateEnvironment = (populations, callbacks) => {
    populations.forEach((population, index) => {
        for (let i = 0; i < population; i++) callbacks[index]()
    })
}
