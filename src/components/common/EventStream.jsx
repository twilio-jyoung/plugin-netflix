import React from "react";
import { Heading } from "@twilio-paste/core/heading";
import { Paragraph } from "@twilio-paste/core/paragraph";
import { Button } from "@twilio-paste/core/button";
import SegmentLogo from "../../images/segment.png";
import { withTaskContext } from "@twilio/flex-ui";

const sourceImage = {
	float: "right",
};

const { SyncClient } = require("twilio-sync");

class EventStream extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			events: [],
			dataLoaded: false,
			list: null,
		};

		this.itemAddedHandler = this.itemAddedHandler.bind(this);
	}

	itemAddedHandler(item) {
		console.log(item);
		this.setState((prevState) => ({
			events: [...prevState.events, item.data],
		}));
	}

	componentDidMount() {
		fetch(`//cinereous-mallard-4959.twil.io/sync-token`)
			.then((resp) => resp.json())
			.then((data) => {
				var syncClient = new SyncClient(data.token);

				syncClient
					.list(this.props.task.attributes.segment_data.traits.id)
					.then((list) => {
						// get all of the
						list
							.getItems({ order: "desc" })
							.then((data) => {
								let rawEvents = [];
								data.items.forEach((segmentEvent) => {
									rawEvents.push(segmentEvent.data);
								});

								this.setState({
									events: rawEvents,
									dataLoaded: true,
									list: list,
								});
								this.forceUpdate();
							})
							.then(() => {})
							.catch(function (error) {
								console.error("List getItems() failed", error);
							});
					});
			});
	}

	render() {
		const { dataLoaded, events, list } = this.state;
		if (!dataLoaded) return <div>Loading event data...</div>;

		// attach to the itemAdded event and point it at our handler
		list.on("itemAdded", function (args) {
			console.log(args.item.data);

			// this.itemAddedHandler(args.item.data);
		});

		const segmentEventList = events.map((item) => (
			<Paragraph>{item.timestamp}</Paragraph>
		));

		return (
			<React.Fragment>
				<Heading as="h4" variant="heading40">
					<span>
						<img style={sourceImage} src={SegmentLogo} height="20px" />
					</span>
					<span>RealTime Event Stream</span>
				</Heading>

				<Paragraph>
					We populate real time events via webhook into a twilio sync document,
					and then connect to that document in flex and render real time data!
				</Paragraph>
				{segmentEventList}
			</React.Fragment>
		);
	}
}

export default withTaskContext(EventStream);
