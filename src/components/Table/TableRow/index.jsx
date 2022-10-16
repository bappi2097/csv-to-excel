import React, { useState } from "react"
import { abbreviateNumber } from "js-abbreviation-number"
import { DownloadOutlined, EditFilled } from "@ant-design/icons"
import { Button, Typography, List, Card, Checkbox, Input, Tooltip } from "antd"
import { tableRowStyle } from "../../../styles/style"
import * as xlsx from "xlsx"
const { Text } = Typography

const TableRow = ({ item, data, setList, index }) => {
  const [clicked, setClicked] = useState(false)
  const handleDownload = async () => {
    const worksheet = xlsx.utils.json_to_sheet(item.data, {
      skipHeader: true,
    })
    const workbook = xlsx.utils.book_new()
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1")
    xlsx.writeFile(workbook, `${data?.name ?? "dummy"}.xlsx`)
  }

  return (
    <List.Item>
      <Card bodyStyle={tableRowStyle.containerBody} hoverable>
        <Checkbox
          checked={data?.isChecked}
          onClick={() => {
            setList((prev) =>
              prev.map((item, i) => {
                if (i === index) {
                  return {
                    ...item,
                    isChecked: !item.isChecked,
                  }
                }
                return item
              })
            )
          }}
        />
        {clicked ? (
          <Input
            style={tableRowStyle.input}
            value={data?.name ?? ""}
            onBlur={() => setClicked(false)}
            onChange={(event) => {
              const { value } = event.target
              setList((prev) =>
                prev.map((item, i) => {
                  if (i === index) {
                    return {
                      ...item,
                      name: value,
                    }
                  }
                  return item
                })
              )
            }}
          />
        ) : (
          <Text>
            {data?.name}.xlsx
            <Tooltip title='Double click to edit'>
              <Button
                type='text'
                shape='circle'
                icon={<EditFilled />}
                style={tableRowStyle.button}
                onDoubleClick={() => setClicked(true)}
              />
            </Tooltip>
          </Text>
        )}
        <Text>{abbreviateNumber(item.length, 2)}</Text>
        <Button icon={<DownloadOutlined />} onClick={handleDownload} />
      </Card>
    </List.Item>
  )
}

export default TableRow
