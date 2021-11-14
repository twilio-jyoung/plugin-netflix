import {
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
} from "@twilio-paste/core/tabs";
import { useUID } from "@twilio-paste/core/uid-library";
import BillingHistory from "../billing/BillingHistory";

const HorizontalTabs = () => {
	const selectedId = useUID();
	return (
		<Tabs selectedId={selectedId} baseId="horizontal-tabs-example">
			<TabList aria-label="My tabs">
				<Tab id={selectedId}>Billing History</Tab>
				<Tab>Devices</Tab>
				<Tab>Technical Support</Tab>
				<Tab>Account Management</Tab>
			</TabList>
			<TabPanels paddingTop="space20">
				<TabPanel>
					<BillingHistory key="billing-history" />
				</TabPanel>
				<TabPanel>Tab 2</TabPanel>
				<TabPanel>Tab 3</TabPanel>
				<TabPanel>Tab 4</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default HorizontalTabs;
