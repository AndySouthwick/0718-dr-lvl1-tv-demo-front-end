import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SiteNav from './SiteNav'
import ManagePage from './ManagePage'
import PreviewPage from './PreviewPage';
import './App.css'

class App extends Component {
  state = {
    tvShow: {
      name: '',
      rating: '',
      imageUrl: ''
    },
    tvShows: []
  }

  tvShowDeleted = () => {
    this.setState({
      tvShow: {
        name: '',
        rating: '',
        imageUrl: ''
      }
    })
  }

  saveTVShow = (showToSave) => {
    this.setState(
      (prevState) => ({
        tvShows: [...prevState.tvShows, {
          name: showToSave.name,
          rating: showToSave.rating,
          imageUrl: showToSave.imageUrl
        }]
      })
    )
  }

  renderManagePage = () => {
    return (<ManagePage />)
  }

  renderPreviewPage = () => {
    return (<PreviewPage tvShows={this.state.tvShows} tvShow={this.state.tvShow} />)
  }

  render() {
    return (
      <Router>
        <Fragment>
          <SiteNav />
          <Switch>
            <Route exact path="/" component={this.renderManagePage} />
            <Route path="/preview" component={this.renderPreviewPage} />
          </Switch>
        </Fragment>
      </Router>
    )
  }
}

export default App
