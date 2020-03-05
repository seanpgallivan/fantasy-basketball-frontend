import React from 'react'
import League from '../components/League'

const LeagueList = ({history, leagues, onLeagueView}) => {

  const showLeagues = () => 
    leagues.map((league, i) => 
      <League 
        key={i} 
        history={history}
        league={league} 
        onLeagueView={onLeagueView}
      />
    )


  return (
    <div className="league-list content">
      <div className="content-header">
        <h1>League List</h1>
      </div>
      <div className="content-box">
        {showLeagues()}

      </div>
    </div>
  )
}
export default LeagueList