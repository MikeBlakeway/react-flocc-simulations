const createEnvironment = (environment, elements, callBacks) => {
    elements.map((element, i) => callBacks[i](environment).mount(element))

    return environment
}

export default createEnvironment
