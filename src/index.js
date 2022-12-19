import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { App } from './components/App'
import './index.scss'
import store from './redux/store'

const ROOT = createRoot(document.getElementById('root'))

ROOT.render(
  <Provider store={store}>
    <App />
  </Provider>
)
