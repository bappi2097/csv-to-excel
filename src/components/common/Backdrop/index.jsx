import { Spin } from "antd"
import React from "react"

const backdrop = {
  display: "flex",
  position: "fixed",
  width: "100%",
  height: "100%",
  top: "0",
  background: "rgba(0,0,0,0.5)",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
}
export default function Backdrop() {
  return (
    <div style={backdrop}>
      <Spin size='large' />
    </div>
  )
}
