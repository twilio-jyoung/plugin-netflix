import React from 'react'
import { useUID } from '@twilio-paste/core/uid-library'
import { Actions } from '@twilio/flex-ui'
import {
  Modal,
  ModalHeader,
  ModalHeading,
  ModalBody,
  ModalFooter,
  ModalFooterActions,
} from '@twilio-paste/core/modal'
import { Button } from '@twilio-paste/core/button'
import { Paragraph } from '@twilio-paste/core/paragraph'

const RefundTrigger = (props) => {
  // Modal properties
  const [isOpen, setIsOpen] = React.useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  const handleRefund = () => {
    // send refund email
    Actions.invokeAction('SendMessage', {
      body: 'Your refund for $' + props.refundAmount + ' has been processed.',
      conversationSid: props.conversationSid,
    })
    handleClose()
  }
  const modalHeadingID = useUID()

  return (
    <div>
      <Button onClick={handleOpen} variant="destructive_link">
        Refund
      </Button>
      <Modal
        ariaLabelledby={modalHeadingID}
        isOpen={isOpen}
        onDismiss={handleClose}
        size="default"
      >
        <ModalHeader>
          <ModalHeading as="h3" id={modalHeadingID}>
            Issue Refund
          </ModalHeading>
        </ModalHeader>
        <ModalBody>
          <Paragraph>
            Are you sure that you want to issue a refund of {props.refundAmount}
            ?
          </Paragraph>
        </ModalBody>
        <ModalFooter>
          <ModalFooterActions>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleRefund}>
              Refund
            </Button>
          </ModalFooterActions>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default RefundTrigger
