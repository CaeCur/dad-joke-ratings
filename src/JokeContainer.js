import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeContainer.css";

export default class JokeContainer extends Component {
	static defaultProps = {
		numJokes : 10
	};

	constructor (props) {
		super(props);
		this.state = {
			jokes     : JSON.parse(window.localStorage.getItem("jokes") || "[]"),
			isLoading : false
		};
		this.seenJokes = new Set(this.state.jokes.map((j) => j.id));
		console.log(this.seenJokes);
		// this.getAverageVotes = this.getAverageVotes.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount () {
		//if we don't have any jokes, get some
		if (this.state.jokes.length === 0) {
			this.getJokes();
		}

		//once we have jokes, set the average votes state
		// this.setState({ averageVotes: this.getAverageVotes() });
	}

	async getJokes () {
		try {
			let jokes = [];

			while (jokes.length < this.props.numJokes) {
				let res = await axios.get("https://icanhazdadjoke.com/", { headers: { Accept: "application/json" } });

				if (!this.seenJokes.has(res.data.id)) {
					jokes.push({ joke: res.data.joke, id: res.data.id, votes: 0 });
				}
				else {
					console.log("Duplicate joke found and discarded.");
				}
			}

			this.setState({ jokes, isLoading: false });
			//store jokes in local memory
			window.localStorage.setItem("jokes", JSON.stringify(jokes));
		} catch (e) {
			alert(`New jokes couldn't be found: ${e}`);
			this.setState({ isLoading: false });
		}
	}

	handleVote (id, delta) {
		this.setState(
			(st) => ({
				jokes : st.jokes.map((j) => (j.id === id ? { ...j, votes: j.votes + delta } : j))
			}),
			() => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
		);
	}

	// getAverageVotes () {
	// 	//calc sum of current votes
	// 	let votesArray = [];

	// 	this.state.jokes.map((j) => {
	// 		return votesArray.push(j.votes);
	// 	});

	// 	console.log(votesArray);

	// 	let sumVotes = votesArray.reduce((t, c) => {
	// 		return (t += c);
	// 	}, 0);

	// 	//calc average
	// 	console.log(sumVotes, this.props.numJokes);
	// 	const averageVotes = sumVotes / this.props.numJokes;
	// 	return averageVotes;
	// }

	handleClick () {
		this.setState({ isLoading: true }, this.getJokes);
	}

	render () {
		let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
		if (this.state.isLoading) {
			return (
				<div className="JokeContainer-loader">
					<i className="far fa-laugh fa-9x fa-spin" />
					<h1 className="JokeContainer-title">Loading...</h1>
				</div>
			);
		}
		const jokesList = jokes.map((j) => {
			return (
				<Joke
					key={j.id}
					joke={j.joke}
					votes={j.votes}
					upvote={() => this.handleVote(j.id, 1)}
					downvote={() => this.handleVote(j.id, -1)}
				/>
			);
		});

		return (
			<div className="JokeContainer">
				<div className="JokeContainer-sidebar">
					<h1 className="JokeContainer-title">
						<span>Dad</span> Jokes
					</h1>
					<img
						src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
						alt="Dad Jokes"
					/>
					<button className="JokeContainer-getmore" onClick={this.handleClick}>
						New Jokes
					</button>
				</div>
				<div className="JokeContainer-jokes">{jokesList}</div>
			</div>
		);
	}
}
