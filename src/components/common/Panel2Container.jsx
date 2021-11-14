import React from "react";
import { withTaskContext } from "@twilio/flex-ui";
import HorizontalTabs from "./HorizontalTabs";
import { CustomizationProvider } from "@twilio-paste/core/customization";
import { Grid, Column } from "@twilio-paste/core/grid";
import { Card } from "@twilio-paste/core/card";
import { Heading } from "@twilio-paste/core/heading";
import { Paragraph } from "@twilio-paste/core/paragraph";
import { Button } from "@twilio-paste/core/button";
import SegmentLogo from "../../images/segment.png";
import InformationOutput from "../common/InformationOutput";

const md5 = require("md5");

const customStyles = {
	panel2Container: {
		borderLeft: "1px solid #d0d0d0",
		position: "relative",
		backgroundSize: "cover",
		backgroundColor: "#fff",
		// minHeight: "100%",
		padding: "20px",
	},
	gridContainer: {
		marginBottom: "20px",
	},
	sourceImage: {
		float: "right",
	},
};

const Panel2Container = (props) => {
	if (props.task && props.task.attributes !== undefined) {
		let gravatarUrl = `https://www.gravatar.com/avatar/${md5(
			props.task.attributes.segment_data.traits.email
		)}?s=100`;

		return (
			<div style={customStyles.panel2Container}>
				<CustomizationProvider baseTheme="Default" theme={props.theme.tokens}>
					<div style={customStyles.gridContainer}>
						<Grid gutter="space40">
							<Column span={12}>
								<Card padding="space70">
									<Grid gutter="space40">
										<Column span={1}>
											<img src={gravatarUrl} alt="" />
										</Column>
										<Column span={2}>
											<Heading
												as="h2"
												variant="heading20"
												marginBottom="space0"
											>
												{props.task.attributes.name}
											</Heading>
											<Heading
												as="h5"
												variant="heading50"
												marginBottom="space0"
											>
												{props.task.attributes.segment_data.traits.phone}
											</Heading>
											<Heading
												as="h5"
												variant="heading50"
												marginBottom="space0"
											>
												{props.task.attributes.segment_data.traits.email}
											</Heading>
										</Column>
										<Column span={2}>
											<InformationOutput
												title="Member Since"
												value={
													props.task.attributes.segment_data.traits.memberSince
												}
											/>
											<InformationOutput
												title="Member ID"
												value={props.task.attributes.segment_data.traits.id}
											/>
										</Column>
										<Column span={2}>
											<InformationOutput
												title="Plan level"
												value={props.task.attributes.segment_data.traits.planLevel.toUpperCase()}
											/>
										</Column>
										<Column span={2}>
											<InformationOutput
												title="Last Watched"
												value={
													props.task.attributes.segment_data.computed_traits
														.last_title
												}
											/>
											<InformationOutput
												title="Most Watched"
												value={
													props.task.attributes.segment_data.computed_traits
														.favorite_title
												}
											/>
										</Column>
									</Grid>
								</Card>
							</Column>
						</Grid>
					</div>
					<div style={customStyles.gridContainer}>
						<Grid gutter="space40">
							<Column span={8}>
								<Card padding="space70">
									<HorizontalTabs key="tabs" />
								</Card>
							</Column>
							<Column span={4}>
								<Card padding="space70">
									<Heading as="h4" variant="heading40">
										<span>
											<img
												style={customStyles.sourceImage}
												src={SegmentLogo}
												height="20px"
											/>
										</span>
										<span>RealTime Event Stream</span>
									</Heading>
									<Paragraph>
										We populate real time events via webhook into a twilio sync
										document, and then connect to that document in flex and
										render real time data!
									</Paragraph>
									<Button>Add to Plan</Button>
								</Card>
							</Column>
						</Grid>
					</div>
				</CustomizationProvider>
			</div>
		);
	} else {
		return (
			<div style={customStyles.panel2Container}>
				<CustomizationProvider baseTheme="Default" theme={props.theme.tokens}>
					<Grid gutter="space30">
						<Column span={4}></Column>
						<Column span={4}>
							<Card padding="space70">
								<Heading as="h4" variant="heading40">
									All Done!
								</Heading>
								<Paragraph>Nothing to work on right now!</Paragraph>
							</Card>
						</Column>
						<Column span={4}></Column>
					</Grid>
					<Grid gutter="space30"></Grid>
				</CustomizationProvider>
			</div>
		);
	}
};

export default withTaskContext(Panel2Container);
