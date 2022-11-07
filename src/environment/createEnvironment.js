import { Environment } from 'flocc'
import createChart from './components/createChart'
import createTable from './components/createTable'

const createEnvironment = (table, graph) => {
    const environment = new Environment()

    createTable(environment).mount(table)
    createChart(environment).mount(graph)

    return environment
}

export default createEnvironment
