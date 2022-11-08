import { alliance, costToFight, costToPay, fight, pay } from '.'

/**
 * Agent a is targeting agent b.
 * b decides whether to fight or whether to pay.
 */
const target = (a, b, population) => {
    const allianceOfAVsB = alliance(a, b, population)
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

export default target
