import { LineChartRenderer, utils } from 'flocc'

const createChart = (environment) => {
    const chart = new LineChartRenderer(environment, {
        autoScale: true,
        height: 200,
    })
    chart.metric('sheep', {
        fn: utils.sum,
        color: 'blue',
    })
    chart.metric('wolf', {
        fn: utils.sum,
        color: 'red',
    })
    return chart
}

export default createChart
