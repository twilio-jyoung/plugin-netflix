import { withTaskContext } from "@twilio/flex-ui";
import { Grid, Column } from "@twilio-paste/core/grid";
import { Card } from "@twilio-paste/core/card";
import { Heading } from "@twilio-paste/core/heading";
import InformationOutput from "../common/InformationOutput";

const md5 = require("md5");

const ProfileComponent = (props) => {
	let gravatarUrl = `https://www.gravatar.com/avatar/${md5(
		props.task.attributes.segment_data.traits.email
	)}?s=100`;

	return (
		<Card padding="space70">
			<Grid gutter="space40">
				<Column span={1}>
					<img src={gravatarUrl} alt="" />
				</Column>
				<Column span={2}>
					<Heading as="h2" variant="heading20" marginBottom="space0">
						{props.task.attributes.name}
					</Heading>
					<Heading as="h5" variant="heading50" marginBottom="space0">
						{props.task.attributes.segment_data.traits.phone}
					</Heading>
					<Heading as="h5" variant="heading50" marginBottom="space0">
						{props.task.attributes.segment_data.traits.email}
					</Heading>
				</Column>
				<Column span={2}>
					<InformationOutput
						title="Member Since"
						value={props.task.attributes.segment_data.traits.memberSince}
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
							props.task.attributes.segment_data.computed_traits.last_title
						}
					/>
					<InformationOutput
						title="Most Watched"
						value={
							props.task.attributes.segment_data.computed_traits.favorite_title
						}
					/>
				</Column>
			</Grid>
		</Card>
	);
};

export default withTaskContext(ProfileComponent);
