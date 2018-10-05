import {
  BrowserRouter as Router,
  Switch,
  Route,
  browserHistory
} from 'react-router-dom'
import Home from './containers/Home'
import AppLayout from 'layout/App'

const App = () => (
  <Home />
)

export default App
