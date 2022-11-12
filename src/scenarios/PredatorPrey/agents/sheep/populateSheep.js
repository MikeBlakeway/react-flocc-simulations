import { createSheep } from './'
import { width } from '../../constants'

const populateSheep = (environment, sheepLocations, terrain) => {
    for (let i = 0; i < 300; i++) {
        addSheep(environment, sheepLocations, terrain)
    }
}

const addSheep = (environment, sheepLocations, terrain) => {
    const sheep = createSheep(environment, sheepLocations, terrain)
    environment.increment('sheep')
    environment.addAgent(sheep)
    sheepLocations[sheep.get('x') + sheep.get('y') * width] = sheep.id
}

export default populateSheep
