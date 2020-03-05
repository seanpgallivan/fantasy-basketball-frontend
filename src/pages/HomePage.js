import React, {Component} from 'react'
import LeagueList from '../containers/LeagueList'
import MessageList from '../containers/MessageList'
import MessageDetail from '../components/MessageDetail'
import { api } from '../services/api'

class HomePage extends Component {
  state = {
    messages: []
  }


  render() {
    let {user, onLeagueView, history} = this.props
    let {messages} = this.state

    return (
      <div className="pane">
        <LeagueList
          leagues={user ? user.leagues : []}
          onLeagueView={onLeagueView}
          history={history}
        />
        <MessageList
  
        />
        <MessageDetail
  
        />
      </div>
    )
  }
}
export default HomePage