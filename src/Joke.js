import React, { Component } from "react";
import "./Joke.css";

export default class Joke extends Component {
	//for now let's hardcode the ratings
	/**
"#4CAF50"
"#8BC34A"
"#CDDC39"
"#FFEB3B"
"#FFC107"
"#FF9800"
"#f44336"
"em em-rolling_on_the_floor_laughing"
"em em-laughing"
"em em-smiley"
"em em-slightly_smiling_face"
"em em-neutral_face"
"em em-confused"
"em em-angry"
*/
	//TODO dynamically calculate rating based on average votes across current jokes

	// getColor () {
	// 	let rating = 30;

	// 	if (this.props.averageVotes > 0) {
	// 		rating = this.props.votes / this.props.averageVotes * 100;
	// 	}

	// 	if (rating >= 80) {
	// 		return "#4CAF50";
	// 	}
	// 	else if (rating >= 60) {
	// 		return "#8BC34A";
	// 	}
	// 	else if (rating >= 40) {
	// 		return "#CDDC39";
	// 	}
	// 	else if (rating >= 30) {
	// 		return "#FFEB3B";
	// 	}
	// 	else if (rating >= 20) {
	// 		return "#FFC107";
	// 	}
	// 	else if (rating >= 10) {
	// 		return "#FF9800";
	// 	}
	// 	else {
	// 		return "#f44336";
	// 	}
	// }

	// getEmoji () {
	// 	let rating = 30;

	// 	if (this.props.averageVotes > 0) {
	// 		rating = this.props.votes / this.props.averageVotes * 100;
	// 	}

	// 	if (rating >= 80) {
	// 		return "em em-rolling_on_the_floor_laughing";
	// 	}
	// 	else if (rating >= 60) {
	// 		return "em em-laughing";
	// 	}
	// 	else if (rating >= 40) {
	// 		return "em em-smiley";
	// 	}
	// 	else if (rating >= 30) {
	// 		return "em em-slightly_smiling_face";
	// 	}
	// 	else if (rating >= 20) {
	// 		return "em em-neutral_face";
	// 	}
	// 	else if (rating >= 10) {
	// 		return "em em-confused";
	// 	}
	// 	else {
	// 		return "em em-angry";
	// 	}
	// }

	getColor () {
		if (this.props.votes >= 15) {
			return "#4CAF50";
		}
		else if (this.props.votes >= 12) {
			return "#8BC34A";
		}
		else if (this.props.votes >= 9) {
			return "#CDDC39";
		}
		else if (this.props.votes >= 6) {
			return "#FFEB3B";
		}
		else if (this.props.votes >= 3) {
			return "#FFC107";
		}
		else if (this.props.votes >= 0) {
			return "#FF9800";
		}
		else {
			return "#f44336";
		}
	}
	getEmoji () {
		if (this.props.votes >= 15) {
			return "em em-rolling_on_the_floor_laughing";
		}
		else if (this.props.votes >= 12) {
			return "em em-laughing";
		}
		else if (this.props.votes >= 9) {
			return "em em-smiley";
		}
		else if (this.props.votes >= 6) {
			return "em em-slightly_smiling_face";
		}
		else if (this.props.votes >= 3) {
			return "em em-neutral_face";
		}
		else if (this.props.votes >= 0) {
			return "em em-confused";
		}
		else {
			return "em em-angry";
		}
	}

	render () {
		return (
			<div className="Joke">
				<div className="Joke-btn">
					<i className="fas fa-arrow-up" onClick={this.props.upvote} />
					<span className="Joke-votes" style={{ borderColor: this.getColor() }}>
						{this.props.votes}
					</span>
					<i className="fas fa-arrow-down" onClick={this.props.downvote} />
				</div>

				<div className="Joke-text">{this.props.joke}</div>

				<div className="Joke-emoji">
					<i className={this.getEmoji()} aria-label="SMILING FACE WITH OPEN MOUTH AND SMILING EYES" />
				</div>
			</div>
		);
	}
}
