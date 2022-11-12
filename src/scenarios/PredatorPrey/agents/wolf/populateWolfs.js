import { createWolf } from '../wolf'

const populateWolfs = (environment, sheepLocations) => {
    for (let i = 0; i < 100; i++) {
        const wolf = createWolf(environment, sheepLocations)
        environment.increment('wolves')
        environment.addAgent(wolf)
    }
}

export default populateWolfs
