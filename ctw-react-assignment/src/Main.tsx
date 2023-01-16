import { createRoot } from 'react-dom/client'

import App from './App'
import './styles/base.less'
const ROOT_ELEMENT = document.getElementById('app') as HTMLDivElement

createRoot(ROOT_ELEMENT).render(<App />)
