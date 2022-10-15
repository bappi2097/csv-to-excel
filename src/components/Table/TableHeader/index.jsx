import React from "react"
import { DownloadOutlined } from "@ant-design/icons"
import { Button, Typography, Card, Checkbox } from "antd"
const { Text } = Typography
const TableHeader = () => {
  return (
    <Card
      bodyStyle={{
        display: "grid",
        gridTemplateColumns: "0px 1fr 150px 0px",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      style={{
        margin: "20px 20px -10px",
      }}
    >
      <Text>
        <Checkbox checked={false} style={{ marginRight: 10 }} />
        10 Rows selected
      </Text>
      <Button type='primary' icon={<DownloadOutlined />}>
        Download
      </Button>
    </Card>
  )
}

export default TableHeader
