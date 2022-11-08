import { utils } from 'flocc'
import { POPULATION, TURNS } from '../constants'
import { canTarget, calculateVulnerability, target } from '../rules'
import { createEnvironment } from '.'

const start = (env, config) => {
    const { setup, run, elements, callbacks } = config
    const environment = createEnvironment(env, elements, callbacks)

    const tick = (agent) => {
        // only 3 agents may make a move during any 1 tick
        if (environment.get('activated') === 3) return
        environment.increment('activated')

        // get an array of all other agents who may be targeted
        const targetableOthers = environment.getAgents().filter((a) => {
            return a !== agent && canTarget(agent, a)
        })

        // if (targetableOthers.length > 2) {
        //   console.log(
        //     agent.get("i"),
        //     "targetable",
        //     targetableOthers.map(c => c.get("i"))
        //   );
        // }

        // calculate vulnerabilities of those agents
        const vulnerabilities = utils.shuffle(targetableOthers).map((other) => {
            const vulnerability = calculateVulnerability(
                other,
                agent,
                POPULATION
            )
            return { other, vulnerability }
        })

        // determine the most vulnerable agent to target
        let targetedOther = null
        let optimimum = 0
        vulnerabilities.forEach(({ other, vulnerability }) => {
            if (vulnerability < 0) return
            vulnerability *= Math.max(other.get('wealth'), 250)
            if (vulnerability > optimimum) {
                optimimum = vulnerability
                targetedOther = other
            }
        })

        // if one exists, target it
        if (targetedOther !== null) {
            target(agent, targetedOther, POPULATION)
        }
    }

    setup(environment, tick)
    run(environment, TURNS)
}

export default start
