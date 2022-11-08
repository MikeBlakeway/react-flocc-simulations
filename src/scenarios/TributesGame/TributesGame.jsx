import React, { useEffect, useRef } from 'react'
import { utils, Environment } from 'flocc'
import createChart from './views/createChart'
import createTable from './views/createTable'
import { start, setup, run } from './environment'

const TributesGame = () => {
    utils.seed(0)
    const table = useRef(null)
    const chart = useRef(null)
    useEffect(() => {
        const TributesGameConfig = {
            setup,
            run,
            elements: [table.current, chart.current],
            callbacks: [createTable, createChart],
        }
        start(new Environment(), TributesGameConfig)
    }, [])
    return (
        <div>
            <div id='table' ref={table}></div>
            <div id='table' ref={chart}></div>
        </div>
    )
}

export default TributesGame
