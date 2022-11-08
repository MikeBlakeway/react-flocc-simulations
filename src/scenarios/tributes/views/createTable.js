import { TableRenderer } from 'flocc'
import { ENV_OPTIONS, POPULATION } from '../../../constants'

const createTable = (environment) => {
    const renderer = new TableRenderer(environment, ENV_OPTIONS)
    renderer.columns = [
        'color',
        'wealth',
        ...new Array(POPULATION).fill(0).map((v, i) => `c.${i}`),
    ]
    return renderer
}

export default createTable
