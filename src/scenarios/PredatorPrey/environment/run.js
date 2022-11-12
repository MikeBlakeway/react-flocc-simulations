import { MAX_SHEEP } from '../constants'

const run = (environment) => {
    environment.tick({ randomizeOrder: true })
    if (environment.get('sheep') >= MAX_SHEEP) {
        window.alert('The sheep have inherited the earth!')
    } else if (environment.time < 3000) {
        requestAnimationFrame(() => run(environment))
    }
}

export default run
