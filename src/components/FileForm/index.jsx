import React from "react"
import { abbreviateNumber } from "js-abbreviation-number"
import { DownloadOutlined, EditFilled, InboxOutlined } from "@ant-design/icons"
import {
  Form,
  Button,
  InputNumber,
  Typography,
  List,
  Card,
  Checkbox,
  Input,
  Tooltip,
} from "antd"
import Dragger from "antd/lib/upload/Dragger"
const { Text } = Typography

const props = {
  name: "file",
  onChange(info) {},
  onDrop(e) {},
}

const data = [
  {
    name: "a",
    rows: 10000,
  },
  {
    name: "a",
    rows: 10000,
  },
  {
    name: "a",
    rows: 10000,
  },
]
export default function File() {
  return (
    <Card
      style={{
        width: "fit-content",
        margin: "auto",
        background: "white",
        padding: 20,
        borderRadius: 8,
      }}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout='horizontal'
        style={{
          display: "grid",
          gridTemplateColumns: "200px 300px",
          gap: 10,
        }}
      >
        <Dragger {...props}>
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>Click or drag to upload</p>
          <p className='ant-upload-hint'>Only .csv file</p>
        </Dragger>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "stretch",
          }}
        >
          <InputNumber placeholder='No of Rows' style={{ width: "100%" }} />
          <Input placeholder='Prefix' style={{ width: "100%" }} />
          <Button type='primary'>Generate</Button>
        </div>
        <Text
          style={{ textAlign: "center", gridColumn: "1/-1", marginTop: 20 }}
        >
          {(100000).toLocaleString()} Rows in this file
        </Text>
      </Form>
    </Card>
  )
}
