import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import TributesGame from './scenarios/TributesGame/TributesGame'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <TributesGame />
    </StrictMode>
)
