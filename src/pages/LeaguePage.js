import React, {Component} from 'react'

class HomePage extends Component {
  state = {
    chats: []
  }

  render() {
    let {user} = this.props
    let {chats} = this.state

    return (
      <div className="pane">
        <h1>League View</h1>
      </div>
    )
  }
}
export default HomePage