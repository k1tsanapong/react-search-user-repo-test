import PageHome from './PageHome.jsx'
import { Switch, Route} from 'react-router-dom'

function App(){
  return (
    <div>
      <Switch>
        <Route path='/'>
          <PageHome />
        </Route>
      </Switch>
    </div>
  )
}

export default App