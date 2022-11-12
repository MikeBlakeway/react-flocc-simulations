import { CanvasRenderer } from 'flocc'
import { width, height } from '../constants'

const createCanvas = (environment) => {
    const renderer = new CanvasRenderer(environment, {
        background: 'green',
        width,
        height,
    })
    return renderer
}

export default createCanvas
