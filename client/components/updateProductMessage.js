import React from 'react'
import {Message, Button} from 'semantic-ui-react'

const UpdateProductMessage = props => {
  const {show, userMessage, messageToggle} = props
  return show ? (
    <div className="backdrop">
      <div>
        <Message className="message-container">
          <Message.Header className="message" style={{marginBottom: '25px'}}>
            {userMessage}
          </Message.Header>
          <Button onClick={messageToggle}>OK</Button>
        </Message>
      </div>
    </div>
  ) : null
}

export default UpdateProductMessage
