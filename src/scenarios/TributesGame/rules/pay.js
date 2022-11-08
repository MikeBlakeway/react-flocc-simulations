import { costToPay, setCommitment } from '.'

const pay = (a, b) => {
    const toPay = costToPay(a)
    a.decrement('wealth', toPay)
    b.increment('wealth', toPay)
    setCommitment(a, b)
    // console.log(`${a.get("i")} paid ${b.get("i")} ${toPay}`);
}

export default pay
