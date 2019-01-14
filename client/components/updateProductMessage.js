import React from 'react'
import {Message, Button} from 'semantic-ui-react'

const UpdateProductMessage = props => {
  const {message} = props
  return (
    <div className="backdrop">
      <Message>
        <Message.Header>{message}</Message.Header>
      </Message>
      <Button>OK</Button>
    </div>
  )
}

export default UpdateProductMessage
