import { Button, message } from 'antd';
import React from 'react'

function Message({}) {
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';
    const openMessage = () => {
      messageApi.open({
        key,
        type: 'loading',
        content: 'Loading...',
      });
      setTimeout(() => {
        messageApi.open({
          key,
          type: 'success',
          content: 'Loaded!',
          duration: 2,
        });
      }, 1000);
    };
  return (
    <div> 
    {contextHolder}
    <Button type="primary" onClick={openMessage}>
      Open the message box
    </Button>
  </div>
  )
}

export default Message