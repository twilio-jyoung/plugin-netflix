import React from 'react'
import { withTaskContext } from '@twilio/flex-ui'
import HorizontalTabs from './HorizontalTabs'
import { CustomizationProvider } from '@twilio-paste/core/customization'
import { Grid, Column } from '@twilio-paste/core/grid'
import { Card } from '@twilio-paste/core/card'
import { Heading } from '@twilio-paste/core/heading'
import { Paragraph } from '@twilio-paste/core/paragraph'
import ProfileComponent from './ProfileComponent'
import EventStream2 from './EventStream2'

// this is going to get chopped into a million components, but just trying to put everything together first.

const customStyles = {
  panel2Container: {
    borderLeft: '1px solid #d0d0d0',
    position: 'relative',
    backgroundSize: 'cover',
    backgroundColor: '#fff',
    minHeight: '100vh',
    padding: '20px',
  },
  gridContainer: {
    marginBottom: '20px',
  },
  sourceImage: {
    float: 'right',
  },
}

const Panel2Container = (props) => {
  if (props.task && props.task.attributes !== undefined) {
    return (
      <div style={customStyles.panel2Container}>
        <CustomizationProvider baseTheme="Default" theme={props.theme.tokens}>
          <div style={customStyles.gridContainer}>
            <Grid gutter="space40">
              <Column span={12}>
                <ProfileComponent key="profile" />
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
                  <EventStream2 key="events" />
                </Card>
              </Column>
            </Grid>
          </div>
        </CustomizationProvider>
      </div>
    )
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
    )
  }
}

export default withTaskContext(Panel2Container)
