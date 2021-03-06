import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectFloor, selectContent } from '../../actions/index';
import RoomList from './room-list';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

class FloorList extends Component {
  renderFloors(floorNumber) {
    if (!this.props.selectedFloor) { return }
    if (this.props.selectedFloor.number == floorNumber) {
      return <RoomList />
    }
  }
  renderList() {
    return this.props.floors.map((floor) => {
      return (
        <li
          className="list-group-item"
          key={floor.number + "floor"}>
          <a
            onClick={() => { this.props.selectFloor(floor), this.props.selectContent('floor') }}
            className="list-group-item">
            {floor.number} Floor
          </a>
          {this.renderFloors(floor.number)}
        </li>
      );

    });
  }
  render() {
    return (
      <ul className="list-group">
        {this.renderList()}
        {this.props.floor}
      </ul>
    )
  }
}
function mapStateToProps(state) {
  return {
    floors: state.floors,
    selectedFloor: state.cloudSensorMonitor.floor_selected,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectFloor: selectFloor, selectContent: selectContent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FloorList);

