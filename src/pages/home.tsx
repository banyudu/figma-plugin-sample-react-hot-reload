import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, message } from 'antd'

const Home = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/about')
  }

  const showMessage = () => {
    message.success('Antd 的组件可以正常使用')
  }

  return (
    <div>
      <h2>Hello Figma Plugin</h2>
      <Button onClick={handleClick}>跳转 About 页</Button>
      <br />
      <br />
      <Button onClick={showMessage}>提示消息</Button>
      <br />
      <br />
      编辑 src/pages/home.tsx 查看热更新效果。
    </div>
  )
}

export default Home
