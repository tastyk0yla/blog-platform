import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.scss'
import Header from '../Header'
import Article from '../Article'
import ArticleList from '../ArticleList'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/" component={ArticleList} />
        <Route path="/articles/" exact component={ArticleList} />
        <Route
          path="/articles/:slug"
          render={({ match }) => {
            const { slug } = match.params
            return <Article slug={slug} />
          }}
        />
      </div>
    </Router>
  )
}

export default App
