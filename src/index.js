import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import PredatorPrey from './scenarios/PredatorPrey/PredatorPrey'
import SheepVsWolves from './scenarios/SheepVsWolves/SheepVsWolves'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <SheepVsWolves />
    </StrictMode>
)
