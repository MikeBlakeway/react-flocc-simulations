import { directionTo, getCommitment } from '.'
/**
 * Determine whether agent a is able to target agent b
 */
const canTarget = (a, b, population) => {
    // contiguous agents can always target each other
    if (b === a.get('next') || b === a.get('prev')) return true
    // travel from a toward b
    const dir = directionTo(a, b, population)
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

export default canTarget
