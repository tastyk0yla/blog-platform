import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.scss'
import App from './components/App'
import store from './redux/store'

const ROOT = createRoot(document.getElementById('root'))

ROOT.render(
  <Provider store={store}>
    <App />
  </Provider>
)
