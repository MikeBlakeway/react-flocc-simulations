const directionTo = (a, b, population) => {
    // determine which direction around the circle to travel
    let diff = b.get('i') - a.get('i')
    let dir = 'prev'
    if ((diff > 0 && diff <= population / 2) || diff <= -population / 2) {
        dir = 'next'
    }
    return dir
}

export default directionTo
