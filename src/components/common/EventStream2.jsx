import { Heading } from "@twilio-paste/core/heading";
import { Paragraph } from "@twilio-paste/core/paragraph";
import { Button } from "@twilio-paste/core/button";
import SegmentLogo from "../../images/segment.png";
import { withTaskContext } from "@twilio/flex-ui";
import { Timeline, TimelineEvent, TimelineBlip } from "react-event-timeline";
import { withStyles } from "@material-ui/core/styles";
import { EventStream2Styles } from "./EventStream2.Styles";
import moment from "moment";

import WebIcon from "@mui/icons-material/Web";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import PersonIcon from "@mui/icons-material/Person";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import React from "react";
const { SyncClient } = require("twilio-sync");

const styles = (theme) => ({
	root: {
		flexGrow: 1,
	},
});

const sourceImage = {
	float: "right",
};

class EventStream extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			status: "connecting...",
			errorMessage: "",
			events: [],
			dataLoaded: false,
			syncToken: null,
			updateMessage: null,
		};
	}

	componentDidMount() {
		// fetch an access token from the localhost server
		this.retrieveToken();
	}

	async retrieveToken() {
		fetch(`//cinereous-mallard-4959.twil.io/sync-token`)
			.then((response) => response.json())
			.then((result) => {
				this.setState({ syncToken: result.token });

				let accessToken = result.token;
				if (accessToken != null) {
					if (this.client) {
						// update the sync client with a new access token
						this.refreshSyncClient(accessToken);
					} else {
						// create a new sync client
						this.createSyncClient(accessToken);
					}
				} else {
					this.setState({ errorMessage: "No access token found in result" });
				}
			});
	}

	createSyncClient(token) {
		const client = new SyncClient(token);
		var component = this;
		client.on("connectionStateChanged", function (state) {
			if (state === "connected") {
				component.client = client;
				component.setState({ status: "connected", errorMessage: "" });
				component.loadFormData();
				// component.subscribeToNewEvents();
			} else {
				component.setState({
					status: "error",
					errorMessage: `Error: expected connected status but got ${state}`,
				});
			}
		});
		client.on("tokenAboutToExpire", function () {
			component.retrieveToken();
		});
		client.on("tokenExpired", function () {
			component.retrieveToken();
		});
	}

	refreshSyncClient(token) {
		this.client.updateToken(token);
	}

	async getAllItems(list) {
		const result = [];
		let page = await list.getItems();
		result.push(...page.items);

		while (page.hasNextPage) {
			page = await page.nextPage();
			result.push(...page.items);
		}
		return result;
	}

	async loadFormData() {
		let component = this;

		component.setState({ updateMessage: "loading data" });

		this.client
			.list(this.props.task.attributes.segment_data.traits.id)
			.then(function (list) {
				list
					.getItems({ order: "desc" })
					.then((data) => {
						let rawEvents = [];
						data.items.forEach((segmentEvent) => {
							rawEvents.push(segmentEvent.data);
						});

						component.setState({
							events: rawEvents,
							dataLoaded: true,
							list: list,
							updateMessage: "fetched data",
						});
					})
					.catch(function (error) {
						console.error("List getItems() failed", error);
					});

				list.on("itemAdded", function (args) {
					if (!args.isLocal) {
						console.log("Sync Updated Data, adding to state.", args.item.data);

						component.setState((prevState) => ({
							events: [args.item.data, ...prevState.events],
						}));
					}
				});
			});
	}

	getImage(item) {
		let titleType = "films";

		try {
			return (
				<img
					src={require(`./../../images/${titleType}/${item.properties.cardItem.genre}/${item.properties.cardItem.slug}/small.jpg`)}
				/>
			);
		} catch (error) {
			try {
				titleType = "series";
				return (
					<img
						src={require(`./../../images/${titleType}/${item.properties.cardItem.genre}/${item.properties.cardItem.slug}/small.jpg`)}
					/>
				);
			} catch (error) {
				return null;
			}
		}
	}

	render() {
		const { dataLoaded, events } = this.state;
		if (!dataLoaded) return <div>Loading event data...</div>;

		const segmentEventList = events.map((item) => (
			<React.Fragment>
				{item.type == "identify" && (
					<TimelineEvent
						className="timeline"
						title={item.userId}
						subtitle={moment(item.timestamp).fromNow()}
						icon={<PersonIcon />}
					/>
				)}

				{item.type == "page" && (
					<TimelineEvent
						className="timeline"
						title={item.properties.path}
						subtitle={moment(item.timestamp).fromNow()}
						icon={<WebIcon />}
					/>
				)}

				{item.type == "track" && item.event == "Title Preview" && (
					<TimelineEvent
						className="timeline"
						title={item.event + " - " + item.properties.cardItem.title}
						subtitle={moment(item.timestamp).fromNow()}
						icon={<PlayArrowIcon />}
					>
						{this.getImage(item) && "image placeholder"}
					</TimelineEvent>
				)}

				{item.type == "track" && item.event != "Title Preview" && (
					<TimelineEvent
						className="timeline"
						title={item.event}
						subtitle={moment(item.timestamp).fromNow()}
						icon={<LabelImportantIcon />}
					/>
				)}
			</React.Fragment>
		));

		return (
			<React.Fragment>
				<Heading as="h4" variant="heading40">
					<span>
						<img style={sourceImage} src={SegmentLogo} height="20px" />
					</span>
					<span>RealTime Event Stream</span>
				</Heading>

				<EventStream2Styles>
					<div className="timelineContainer">
						<Timeline className="timeline">{segmentEventList}</Timeline>
					</div>
				</EventStream2Styles>
			</React.Fragment>
		);
	}
}

export default withTaskContext(EventStream);
