import { WOLF_GAIN_FROM_FOOD } from '../../../constants'

export const eat = (target, sheep, wolf) => {
    sheep.remove(target)
    wolf.increment('energy', WOLF_GAIN_FROM_FOOD)
}
