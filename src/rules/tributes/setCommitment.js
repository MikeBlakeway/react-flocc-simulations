import { utils } from 'flocc'

/*
 * increase (or decrease) commitment of
 * a to b and b to a
 */
const setCommitment = (a, b, amount = 0.1) => {
    const aKey = `c.${a.get('i')}`
    const bKey = `c.${b.get('i')}`
    a.increment(bKey, amount)
    a.set(bKey, utils.clamp(a.get(bKey), 0, 1))
    b.increment(aKey, amount)
    b.set(aKey, utils.clamp(b.get(aKey), 0, 1))
}

export default setCommitment
