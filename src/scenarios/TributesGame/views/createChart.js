import { LineChartRenderer } from 'flocc'
import { POPULATION, COLORS, CHART_OPTIONS } from '../constants'

const createChart = (environment) => {
    const chart = new LineChartRenderer(environment, CHART_OPTIONS)
    for (let i = 0; i < POPULATION; i++) {
        chart.metric('wealth', {
            color: COLORS[i],
            fn: (arr) => arr[i],
        })
    }

    return chart
}

export default createChart
