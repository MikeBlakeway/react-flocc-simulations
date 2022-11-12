import React, { useEffect, useRef } from 'react'
import runScenario from './runScenario'

const SheepVsWolves = () => {
    const canvas = useRef(null)
    const graph = useRef(null)

    useEffect(() => {
        runScenario(canvas, graph)
    }, [])
    return (
        <div>
            <div id='canvas' ref={canvas}></div>
            <div id='graph' ref={graph}></div>
        </div>
    )
}

export default SheepVsWolves
