const costToPay = (a) => {
    if (a.get('wealth') < 250) return a.get('wealth')
    return 250
}

export default costToPay
