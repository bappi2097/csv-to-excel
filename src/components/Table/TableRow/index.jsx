import React, { useState } from "react"
import { abbreviateNumber } from "js-abbreviation-number"
import { DownloadOutlined, EditFilled } from "@ant-design/icons"
import { Button, Typography, List, Card, Checkbox, Input, Tooltip } from "antd"
import { tableRowStyle } from "../../../styles/style"
import * as xlsx from "xlsx"
const { Text } = Typography

const TableRow = ({ item, data, setList, index, setLoader }) => {
  const [clicked, setClicked] = useState(false)
  const handleDownload = async () => {
    setLoader(true)
    const worker = new Worker(
      new URL("../../../../download-worker.js", import.meta.url),
      { type: "module" }
    )
    try {
      worker.onmessage = (ev) => {
        if (ev.data !== "error") {
          xlsx.writeFile(ev.data, `${data?.name ?? "dummy"}.xlsx`)
        }
        worker.terminate()
        setLoader(false)
      }
      worker.postMessage({ data: item })
    } catch (error) {
      console.log(error)
    }
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
