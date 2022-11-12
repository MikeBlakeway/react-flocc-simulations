import { MAX_SHEEP } from '../constants'

export const runEnvironment = (environment) => {
    environment.tick({ randomizeOrder: false })
    if (environment.get('sheep') >= MAX_SHEEP) {
        window.alert('The sheep have inherited the earth!')
    } else if (environment.time < 3000) {
        requestAnimationFrame(() => runEnvironment(environment))
    }
}
