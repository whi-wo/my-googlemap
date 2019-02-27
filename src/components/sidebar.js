import React, { Component } from 'react';
import '../App.css';

class Sidebar extends Component {




  componentDidMount() {

	}

	render() {
    return (
				<nav id="nav" aria-label="Filtered Venues" role="list">
					<label htmlFor="filter"aria-label="filter"></label>
					<input tabIndex="1" type="text" placeholder="Type here to Filter Sites" id="filter" value={this.props.query}
						onChange={(e) => {this.props.filterVenues(e.target.value)}}/>
            <div id="btncontainer">
						{this.props.filteredVenues && this.props.filteredVenues.length > 0
							&& this.props.filteredVenues.map((venue, index) => (
							<button id="button" aria-label="Venue Name" tabIndex="2" key={index} onClick={() =>
								{this.props.listItemClick(venue)}}
								>
								{venue.name}
							</button>

						))
						}
            </div>
				</nav>
			);
		}
}

export default Sidebar;
