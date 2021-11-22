import React from 'react'
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@twilio-paste/core/tabs'
import BillingHistory from '../billing/BillingHistory'
import { withTaskContext } from '@twilio/flex-ui'
import DevicePage from '../devices/DevicePage'

const HorizontalTabs = (props) => {
  // set tab based on intent
  const selectedId = props.task.attributes.conversations.content

  return (
    <Tabs selectedId={selectedId} baseId="horizontal-tabs-example">
      <TabList aria-label="My tabs">
        <Tab id="billing">Billing History</Tab>
        {/* <Tab id="account">Account Management</Tab> */}
        {/* <Tab id="devices">Devices</Tab> */}
        <Tab id="support">Technical Support</Tab>
      </TabList>
      <TabPanels paddingTop="space20">
        <TabPanel>
          <BillingHistory key="billing-history" />
        </TabPanel>
        <TabPanel>
          <DevicePage key="map" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default withTaskContext(HorizontalTabs)
