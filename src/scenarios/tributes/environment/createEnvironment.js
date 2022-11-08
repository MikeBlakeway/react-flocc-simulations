import { Environment } from 'flocc'
import createChart from '../views/createChart'
import createTable from '../views/createTable'

const createEnvironment = (table, graph) => {
    const environment = new Environment()

    createTable(environment).mount(table)
    createChart(environment).mount(graph)

    return environment
}

export default createEnvironment
