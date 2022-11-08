const createEnvironment = (environment, elements, callbacks) => {
    elements.map((element, i) => callbacks[i](environment).mount(element))

    return environment
}

export default createEnvironment
