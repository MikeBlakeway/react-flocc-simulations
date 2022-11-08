import { directionTo, getCommitment } from '.'

const alliance = (a, b, population) => {
    let dir = directionTo(a, b, population)
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

export default alliance
