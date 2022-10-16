import React from "react"
import { abbreviateNumber } from "js-abbreviation-number"
import { DownloadOutlined, EditFilled } from "@ant-design/icons"
import { Button, Typography, List, Card, Checkbox, Input, Tooltip } from "antd"
const { Text } = Typography

const TableRow = ({ item }) => {
  return (
    <List.Item>
      <Card
        bodyStyle={{
          display: "grid",
          gridTemplateColumns: "0px 30px 1fr 1fr 32px",
          alignItems: "center",
        }}
      >
        <Checkbox checked={false} />
        {false ? (
          <Input style={{ width: "calc(100% - 20px)" }} />
        ) : (
          <Text>
            {item.name}.xlsx
            <Tooltip title='Double click to edit'>
              <Button
                type='text'
                shape='circle'
                icon={<EditFilled />}
                style={{ marginLeft: 10 }}
              />
            </Tooltip>
          </Text>
        )}
        <Text>{abbreviateNumber(item.rows, 2)}</Text>
        <Button icon={<DownloadOutlined />} />
      </Card>
    </List.Item>
  )
}

export default TableRow
