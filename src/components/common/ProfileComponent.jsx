import React from 'react'
import { withTaskContext } from '@twilio/flex-ui'
import { Grid, Column } from '@twilio-paste/core/grid'
import { Card } from '@twilio-paste/core/card'
import { Heading } from '@twilio-paste/core/heading'
import InformationOutput from '../common/InformationOutput'

const md5 = require('md5')

const ProfileComponent = (props) => {
  let traits = props.task.attributes?.segment_data?.traits
  if (!traits?.email || !traits?.phone) {
    console.warn('setting to static user')
    traits = {
      email: 'jyoung@twilio.com',
      phone: props.task.attributes.from,
      memberSince: '02/2015',
      planLevel: 'basic',
      id: '123123',
    }
  }
  const computed_traits = props.task.attributes?.segment_data?.computed_traits
  if (!computed_traits?.last_title) {
    traits.last_title = 'n/a'
    traits.favorite_title = 'n/a'
  }
  const {
    email,
    phone,
    memberSince,
    id,
    planLevel,
    last_title,
    favorite_title,
  } = traits

  let defaultLogo = encodeURI(`https://cinereous-mallard-4959.twil.io/assets/default-avatar.png`);

  let gravatarUrl = `https://www.gravatar.com/avatar/${md5(email)}?s=100&d=${defaultLogo}`

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
            {phone}
          </Heading>
          <Heading as="h5" variant="heading50" marginBottom="space0">
            {email}
          </Heading>
        </Column>
        <Column span={2}>
          <InformationOutput title="Member Since" value={memberSince} />
          <InformationOutput title="Member ID" value={id} />
        </Column>
        <Column span={2}>
          <InformationOutput
            title="Plan level"
            value={planLevel.toUpperCase()}
          />
        </Column>
        <Column span={2}>
          <InformationOutput title="Last Watched" value={last_title} />
          <InformationOutput title="Most Watched" value={favorite_title} />
        </Column>
      </Grid>
    </Card>
  )
}

export default withTaskContext(ProfileComponent)
