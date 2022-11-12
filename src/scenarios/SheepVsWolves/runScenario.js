import { utils } from 'flocc'
import { runEnvironment } from './environment/runEvironment'
import { populateEnvironment } from './environment/populateEnvironment'
import { renderAll } from './environment/renderAll'
import { createSheep } from './agents/createSheep'
import { createWolf } from './agents/createWolf'
import { STARTING_SHEEP, STARTING_WOLVES } from './constants'

const runScenario = (canvas, graph) => {
    utils.seed(1)

    const { environment, sheepLocations, terrain } = renderAll(canvas, graph)

    const sheep = createSheep(environment, sheepLocations, terrain)
    const wolf = createWolf(environment, sheepLocations, sheep)

    populateEnvironment(
        [STARTING_SHEEP, STARTING_WOLVES],
        [sheep.add, wolf.add]
    )
    runEnvironment(environment)
}

export default runScenario
