import { populateWolfs } from '../agents/wolf'
import { populateSheep } from '../agents/sheep'

const setup = (environment, sheepLocations, terrain) => {
    populateSheep(environment, sheepLocations, terrain)
    populateWolfs(environment, sheepLocations)
    console.log(environment)
}

export default setup
