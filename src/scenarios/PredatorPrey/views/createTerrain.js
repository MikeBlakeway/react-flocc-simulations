import { Colors, Terrain, utils } from 'flocc'
import { width, height } from '../constants'

const createTerrain = () => {
    const { GREEN } = Colors
    const terrain = new Terrain(width, height, {
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
    return terrain
}

export default createTerrain
