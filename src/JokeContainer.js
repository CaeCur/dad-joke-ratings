import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeContainer.css";

export default class JokeContainer extends Component {
	static defaultProps = {
		numJokes : 5
	};

	constructor (props) {
		super(props);
		this.state = {
			jokes : JSON.parse(window.localStorage.getItem("jokes") || "[]")
		};
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
		let jokes = [];

		while (jokes.length < this.props.numJokes) {
			let res = await axios.get("https://icanhazdadjoke.com/", { headers: { Accept: "application/json" } });
			jokes.push({ joke: res.data.joke, id: res.data.id, votes: 0 });
		}

		this.setState({ jokes });
		//store jokes in local memory
		window.localStorage.setItem("jokes", JSON.stringify(jokes));
	}

	handleVote (id, delta) {
		this.setState(
			(st) => ({
				jokes : st.jokes.map((j) => (j.id === id ? { ...j, votes: j.votes + delta } : j))
			}),
			() => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
		);

		setTimeout(() => {
			this.setState({ averageVotes: this.getAverageVotes() });
		}, 1000);
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
		this.getJokes();
	}

	render () {
		const jokesList = this.state.jokes.map((j) => {
			return (
				<Joke
					key={j.id}
					joke={j.joke}
					votes={j.votes}
					averageVotes={this.state.averageVotes}
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
