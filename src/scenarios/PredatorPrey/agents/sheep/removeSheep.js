const removeSheep = (environment, sheepLocations, sheep, width) => {
    environment.removeAgent(sheep)
    environment.decrement('sheep')
    sheepLocations[sheep.get('x') + sheep.get('y') * width] = false
}

export default removeSheep
