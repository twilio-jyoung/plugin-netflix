import React, { useMemo } from 'react'
import { withTaskContext } from '@twilio/flex-ui'
import { Table, THead, Tr, Th, Td, TBody } from '@twilio-paste/core/table'
import RefundTrigger from './RefundTrigger'
import { CheckboxCheckIcon } from '@twilio-paste/icons/esm/CheckboxCheckIcon'

var moment = require('moment')

const BillingHistory = (props) => {
  const { channelSid } = props.task.attributes
  let traits = props.task.attributes?.segment_data?.traits
  if (!traits?.planLevel) {
    traits = {
      planLevel: 'basic',
      createdAt: '01/14/2016',
    }
  }

  const tableRows = useMemo(() => {
    let rate = 6.99
    switch (traits.planLevel.toLowerCase()) {
      case 'basic':
        rate = 8.99
        break
      case 'standard':
        rate = 13.99
        break
      case 'premium':
        rate = 17.99
        break
    }

    let taxRate = 0.0825
    let taxTotal = roundToTwo(rate * taxRate)
    let total = rate + taxTotal

    let today = moment(Date.now())
    let startDate = moment(traits.createdAt)

    let diff = today.diff(startDate, 'months')

    let tableRows = []

    if (diff == 0) {
      tableRows.push(generateRow(today, rate, taxTotal, total, channelSid))
    } else {
      for (let index = 0; index < Math.min(diff, 18); index++) {
        tableRows.push(
          generateRow(
            moment(Date.now()).subtract(index, 'months'),
            rate,
            taxTotal,
            total,
            channelSid,
          ),
        )
      }
    }
    return tableRows
  }, [traits])

  return (
    <Table tableLayout="fixed" variant="default" striped>
      <THead>
        <Tr verticalAlign="middle">
          <Th width="size20">Billing Period</Th>
          <Th>Rate</Th>
          <Th>Tax</Th>
          <Th>Total</Th>
          <Th>Paid?</Th>
          <Th>Devices Active</Th>
          <Th>Hours Active</Th>
          <Th>Titles Played</Th>
          <Th>Actions</Th>
        </Tr>
      </THead>
      <TBody>{tableRows}</TBody>
    </Table>
  )
}

export default withTaskContext(BillingHistory)

function roundToTwo(num) {
  return +(Math.round(num + 'e+2') + 'e-2')
}

function generateRow(date, sub, tax, tot, channelSid) {
  let devicesActive = Math.floor(Math.random() * 10) + 1
  let hoursActive = (Math.floor(Math.random() * 240) + 1) * devicesActive
  let titlesPlayed = Math.floor(hoursActive / 50)

  return (
    <Tr>
      <Td>{date.format("'YY MMMM")}</Td>
      <Td>{sub}</Td>
      <Td>{tax}</Td>
      <Td>{tot}</Td>
      <Td>
        <CheckboxCheckIcon
          decorative={false}
          title="Description of icon"
          color="colorTextIconSuccess"
        />
      </Td>
      <Td>{devicesActive}</Td>
      <Td>{hoursActive}</Td>
      <Td>{titlesPlayed}</Td>
      <Td>
        <RefundTrigger refundAmount={tot} conversationSid={channelSid} />
      </Td>
    </Tr>
  )
}
