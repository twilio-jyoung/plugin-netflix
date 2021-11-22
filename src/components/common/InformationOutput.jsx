import React from 'react'
import { Heading } from '@twilio-paste/core/heading'
import { Paragraph } from '@twilio-paste/core/paragraph'

const InformationOutput = (props) => {
  return (
    <Paragraph>
      <dl>
        <Heading as="h4" variant="heading40" marginBottom="space0">
          <dt>{props.title}</dt>
        </Heading>
        <dd>{props.value}</dd>
      </dl>
    </Paragraph>
  )
}

export default InformationOutput
