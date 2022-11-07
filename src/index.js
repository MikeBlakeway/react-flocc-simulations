import { utils } from 'flocc'
import { POPULATION, TURNS } from './constants'
import createEnvironment from './environment/createEnvironment'
import { costToPay, setCommitment, getCommitment } from './rules/tributes'
import setupSimulation from './rules/tributes/setupSimulation'

const table = document.getElementById('root')
const graph = document.getElementById('graph')
utils.seed(0)

const environment = createEnvironment(table, graph)

function allianceOf1stVersus2nd(a, b) {
    let dir = directionTo(a, b)
    const withA = [a]
    let other
    // go from A away from B
    other = a.get(dir)
    while (getCommitment(other, a) > getCommitment(other, b)) {
        withA.push(other)
        other = other.get(dir)
    }
    // then go from A toward B
    dir = dir === 'next' ? 'prev' : 'next'
    other = a.get(dir)
    while (getCommitment(other, a) > getCommitment(other, b)) {
        withA.push(other)
        other = other.get(dir)
    }
    return withA
}

function pay(a, b) {
    const toPay = costToPay(a)
    a.decrement('wealth', toPay)
    b.increment('wealth', toPay)
    setCommitment(a, b)
    // console.log(`${a.get("i")} paid ${b.get("i")} ${toPay}`);
}

function costToFight(alliance, target) {
    const cost = utils.sum(alliance.map((a) => a.get('wealth'))) * 0.25
    if (target.get('wealth') < cost) return target.get('wealth')
    return cost
}

function fight(a, b) {
    const withA = allianceOf1stVersus2nd(a, b)
    const withB = allianceOf1stVersus2nd(b, a)
    const costToFightA = costToFight(withA, b)
    const costToFightB = costToFight(withB, a)

    let proportion = 1
    if (costToFightB > a.get('wealth')) {
        proportion = a.get('wealth') / costToFightB
    }
    if (costToFightA > b.get('wealth')) {
        proportion = b.get('wealth') / costToFightA
    }

    a.decrement('wealth', proportion * costToFightB)
    b.decrement('wealth', proportion * costToFightA)

    // a and b mutually decrease commitments
    setCommitment(a, b, -0.1)

    // 1. a's alliance increases commitment to a and b's to b
    // 2. a's alliance decrease commitment to b and b's to a
    withA
        .filter((c) => c !== a)
        .forEach((c) => {
            setCommitment(c, a)
            setCommitment(c, b, -0.1)
        })
    withB
        .filter((c) => c !== b)
        .forEach((c) => {
            setCommitment(c, b)
            setCommitment(c, a, -0.1)
        })
}

function directionTo(a, b) {
    // determine which direction around the circle to travel
    let diff = b.get('i') - a.get('i')
    let dir = 'prev'
    if ((diff > 0 && diff <= POPULATION / 2) || diff <= -POPULATION / 2) {
        dir = 'next'
    }
    return dir
}

/**
 * Determine whether agent a is able to target agent b
 */
function canTarget(a, b) {
    // contiguous agents can always target each other
    if (b === a.get('next') || b === a.get('prev')) return true
    // travel from a toward b
    const dir = directionTo(a, b)
    let other = a
    do {
        // move one step toward b
        other = other.get(dir)
        // if we've reached b, then a can target b
        if (other === b) return true
        // if this agent's commitment to a is less than or equal
        // to its commitment toward b, it will not fight alongside
        // a, so a cannot target b
        if (getCommitment(other, a) <= getCommitment(other, b)) {
            return false
        }
    } while (true)
}

/**
 * Agent a is targeting agent b.
 * b decides whether to fight or whether to pay.
 */
function target(a, b) {
    const allianceOfAVsB = allianceOf1stVersus2nd(a, b)
    const shouldFight = costToFight(allianceOfAVsB, b) < costToPay(b)
    // console.log(
    //   `${a.get("i")} targets ${b.get("i")} (${a.get("wealth")} vs ${b.get(
    //     "wealth"
    //   )})`
    // );
    // // console.log("- ", b.get("wealth"));
    // console.log(
    //   "- ",
    //   "cost to fight",
    //   costToFight(allianceOf1stVersus2nd(a, b), b),
    //   "cost to pay",
    //   costToPay(b)
    // );
    if (shouldFight) {
        fight(a, b)
    } else {
        pay(b, a)
    }
}

function vulnerabilityOfBVersusA(a, b) {
    const withA = allianceOf1stVersus2nd(a, b)
    const withB = allianceOf1stVersus2nd(b, a)
    const withAWealth = utils.sum(withA.map((c) => c.get('wealth')))
    const withBWealth = utils.sum(withB.map((c) => c.get('wealth')))
    const vulnerability = (withBWealth - withAWealth) / withBWealth
    return vulnerability
}

function tick(agent) {
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
        const vulnerability = vulnerabilityOfBVersusA(other, agent)
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
        target(agent, targetedOther)
    }
}

function run() {
    // tick once in random order
    environment.tick({ randomizeOrder: true })
    // reset the # of agents who have been activated
    environment.set('activated', 0)
    // increase everyone's wealth by 20
    environment.getAgents().forEach((a) => {
        a.increment('wealth', 20)
    })
    // stop after the number of turns
    if (environment.time >= TURNS) return
    requestAnimationFrame(run)
}

setupSimulation(environment, tick)
run()
