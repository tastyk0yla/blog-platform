import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Article } from '../Article'
import { ArticleList } from '../ArticleList'
import { EditProfile } from '../Forms/EditProfile'
import { SignIn } from '../Forms/SignIn'
import { SignUp } from '../Forms/SignUp'
import { Header } from '../Header'
import { ManageArticle } from '../ManageArticle'
import './App.scss'

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route exact path="/" component={ArticleList} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/profile" component={EditProfile} />
          <Route path="/articles/" exact component={ArticleList} />
          <Route
            exact
            path="/articles/:slug"
            render={({ match }) => {
              const { slug } = match.params
              return <Article slug={slug} />
            }}
          />
          <Route
            path="/articles/:slug/edit"
            render={({ match }) => {
              const { slug } = match.params
              return <ManageArticle slug={slug} />
            }}
          />
          <Route path="/new-article" component={ManageArticle} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
