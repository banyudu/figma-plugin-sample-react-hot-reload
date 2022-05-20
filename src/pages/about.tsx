import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd'

const About = () => {
  const history = useHistory()

  const handleClick = () => {
    history.push('/')
  }

  return (
    <div>
      <h2>关于</h2>
      本仓库是一个支持 React 的 Figma 插件开发 Demo
      <br />
      <br />
      <Button onClick={handleClick}>返回首页</Button>
    </div>
  )
}

export default About
