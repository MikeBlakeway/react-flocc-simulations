import { utils } from 'flocc'

const costToFight = (alliance, target) => {
    const cost = utils.sum(alliance.map((a) => a.get('wealth'))) * 0.25
    if (target.get('wealth') < cost) return target.get('wealth')
    return cost
}

export default costToFight
