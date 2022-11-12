import { utils } from 'flocc'
import { WIDTH } from '../../constants'

export const move = (agent, locations) => {
    if (agent.get('sheep')) {
        const { x, y } = agent.getData()
        locations[x + y * WIDTH] = 0
    }
    agent.increment('x', utils.random(-1, 1))
    agent.increment('y', utils.random(-1, 1))
    if (agent.get('sheep')) {
        const { x, y } = agent.getData()
        locations[x + y * WIDTH] = agent.id
    }
    agent.decrement('energy')
}
