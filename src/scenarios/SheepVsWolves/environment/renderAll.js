import { Environment } from 'flocc'
import { renderers } from './renderers'
import { WIDTH, HEIGHT } from '../constants'

export const renderAll = (canvas, graph) => {
    const environment = new Environment({ WIDTH, HEIGHT })
    const sheepLocations = new Array(WIDTH * HEIGHT)
    const terrain = renderers.terrain(environment)

    renderers.canvas(environment, canvas)
    renderers.graph(environment, graph)

    return { environment, sheepLocations, terrain }
}
