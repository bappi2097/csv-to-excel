import React from "react"
import { DownloadOutlined } from "@ant-design/icons"
import { Button, Typography, Card, Checkbox } from "antd"
import { tableHeaderStyle } from "../../../styles/style"
const { Text } = Typography

const TableHeader = ({
  checkedLength,
  onDownload,
  dataLength,
  onAllSelect,
}) => {
  return (
    <Card
      bodyStyle={tableHeaderStyle.containerBody}
      style={tableHeaderStyle.container}
      hoverable
    >
      <Text>
        <Checkbox
          checked={checkedLength > 0 && checkedLength === dataLength}
          style={tableHeaderStyle.checkbox}
          onClick={onAllSelect}
        />
        {checkedLength > 0
          ? `${checkedLength} Rows selected`
          : "No row selected"}
      </Text>
      <Button
        type='primary'
        icon={<DownloadOutlined />}
        disabled={checkedLength === 0}
        onClick={onDownload}
      >
        Download
      </Button>
    </Card>
  )
}

export default TableHeader
