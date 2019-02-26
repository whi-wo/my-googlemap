import React, { Component } from 'react';
import '../App.css';

class Sidebar extends Component {




  componentDidMount() {

	}

	render() {
    return (
				<div id="sidebar">

					<input placeholder="Type here to Filter Sites" id="filter" value={this.props.query}
						onChange={(e) => {this.props.filterVenues(e.target.value)}}/>
						{/* will only run if there are venues in the state

							the buttons should have their OWN COMPONENT TOO!
						*/}

						{this.props.filteredVenues && this.props.filteredVenues.length > 0
							&& this.props.filteredVenues.map((venue, index) => (
							<button key={index} className="venue-item" onClick={() =>
								{this.props.listItemClick(venue)}}
								>
								{venue.name}
							</button>
						))
						}
				</div>
			);
		}
}

export default Sidebar;
