import { utils } from 'flocc'

const move = (agent, sheepLocations, width) => {
    if (agent.get('sheep')) {
        const { x, y } = agent.getData()
        sheepLocations[x + y * width] = 0
    }
    agent.increment('x', utils.random(-3, 3))
    agent.increment('y', utils.random(-3, 3))
    if (agent.get('sheep')) {
        const { x, y } = agent.getData()
        sheepLocations[x + y * width] = agent.id
    }
}

export default move
