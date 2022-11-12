import {
    CanvasRenderer,
    Colors,
    LineChartRenderer,
    Terrain,
    utils,
} from 'flocc'

import { WIDTH, HEIGHT } from '../constants'

export const renderers = {
    terrain: (environment) => {
        const { GREEN } = Colors
        const terrain = new Terrain(WIDTH, HEIGHT, {
            async: true,
        })
        terrain.init(() => GREEN)
        terrain.addRule((x, y) => {
            terrain.set(x, y, {
                r: GREEN.r,
                g: utils.clamp(terrain.sample(x, y).g + 1, 0, GREEN.g),
                b: GREEN.b,
                a: GREEN.a,
            })
        })
        environment.use(terrain)

        return terrain
    },
    canvas: (environment, canvas) => {
        const canvasRenderer = new CanvasRenderer(environment, {
            background: 'green',
            width: WIDTH,
            height: HEIGHT,
        })
        return canvasRenderer.mount(canvas.current)
    },
    graph: (environment, graph) => {
        const graphRenderer = new LineChartRenderer(environment, {
            autoScale: true,
            height: 200,
        })
        graphRenderer.metric('sheep', {
            fn: utils.sum,
            color: 'blue',
        })
        graphRenderer.metric('wolf', {
            fn: utils.sum,
            color: 'red',
        })
        return graphRenderer.mount(graph.current)
    },
}
