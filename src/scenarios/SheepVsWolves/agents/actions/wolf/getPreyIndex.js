import { WIDTH, HEIGHT } from '../../../constants'

export const getPreyIndex = (x, y) =>
    (x < 0 ? x + WIDTH : x >= WIDTH ? x - WIDTH : x) +
    (x < 0 ? y + HEIGHT : y >= HEIGHT ? y - HEIGHT : y) * WIDTH
