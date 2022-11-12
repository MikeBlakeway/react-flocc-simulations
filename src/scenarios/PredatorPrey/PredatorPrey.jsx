import React, { useEffect, useRef } from 'react'
import { utils, Environment } from 'flocc'
import { createCanvas, createChart } from './views'

import { width, height } from './constants'
import { setup, start, run } from './environment'

const PredatorPrey = () => {
    utils.seed(1)
    const canvas = useRef(null)
    const chart = useRef(null)

    useEffect(() => {
        const PredatorPreyConfig = {
            setup,
            run,
            elements: [canvas.current, chart.current],
            callBacks: [createCanvas, createChart],
        }
        start(new Environment({ width, height }), PredatorPreyConfig)
    }, [])
    return (
        <div>
            <div id='canvas' ref={canvas}></div>
            <div id='chart' ref={chart}></div>
        </div>
    )
}

export default PredatorPrey
