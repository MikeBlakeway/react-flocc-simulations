import { alliance, costToFight, setCommitment } from '.'

const fight = (a, b, population) => {
    const withA = alliance(a, b, population)
    const withB = alliance(b, a, population)
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

export default fight
