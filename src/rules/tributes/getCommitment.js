const getCommitment = (a, b) => {
    return a.get(`c.${b.get('i')}`)
}

export default getCommitment
