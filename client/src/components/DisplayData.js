import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { fetchDraftsByUser } from '../actions';
import dateFormat from 'dateformat';


@connect((store) => {
  return {
    ownDrafts: store.draft.ownDrafts,
    errorOnFetchOwnDrafts: store.user.errorOnFetchOwnDrafts
  };
})

class DisplayData extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchDraftsByUser(this.props.currentUser.id))
  }

  createDraftTable = drafts => {
    let rows = drafts.map((draft, i) => {
      let date = new Date(draft.timeScheduled) 
      let dateString = dateFormat(date, "mmmm dS, yyyy, h:MM TT")
      return(
        <tr key={i}>
          <td>{draft.name}</td>
          <td>{dateString}</td>
        </tr>   
      )
    })
    return (
      <table className="listDrafts">
        <tbody>
          <tr>
            <th><div className="draftColHeader">Draft Name</div></th>
            <th><div className="draftColHeader">Time Scheduled</div></th>
          </tr>
          {rows}
        </tbody>
      </table>
    )
  }

  
  render() {
    let draftTable
    if (this.props.ownDrafts) {
      draftTable = this.createDraftTable(this.props.ownDrafts)
    } else {
      draftTable = <div></div>
    }
    return (
      <div className="displayData">
        <div className="myDrafts">
          <h3>My Drafts</h3>
          <Button className="createDraftBtn">
            Create New
          </Button>
          {draftTable}
        </div>
        <div className="myTeams">
          <h3>My Teams</h3>
          <Button className="createTeamBtn">
            Create New
          </Button>
          <table className="listTeams">
            <tbody>
              <tr>
                <th><div className="teamColHeader">Team Name</div></th>
                <th><div className="teamColHeader">Draft</div></th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default DisplayData;