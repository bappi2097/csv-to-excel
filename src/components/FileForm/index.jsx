import React, { useState } from "react"
import { InboxOutlined } from "@ant-design/icons"
import { Form, Button, InputNumber, Typography, Card, Input } from "antd"
import Dragger from "antd/lib/upload/Dragger"
import { formStyle } from "../../styles/style"
import { abbreviateNumber } from "js-abbreviation-number"
const { Text } = Typography

const FileForm = ({ onParseCsv, setLoader, onGenerate }) => {
  const [formData, setFormData] = useState({ rowsLimit: 320000, prefix: "" })
  const [rowsLength, setRowsLength] = useState(0)

  const draggerProps = {
    name: "file",
    accept: ".csv",
    customRequest: ({ onSuccess, file, onError }) => {
      try {
        setLoader(true)
        const worker = new Worker(
          new URL("../../../worker.js", import.meta.url),
          { type: "module" }
        )
        worker.onmessage = (ev) => {
          console.time("Parse")
          const parseWorker = new Worker(
            new URL("../../../parseWorker.js", import.meta.url),
            { type: "module" }
          )
          parseWorker.onmessage = (results) => {
            onParseCsv(results.data)
            setRowsLength(results.data.length)
            parseWorker.terminate()
            setLoader(false)
            console.timeEnd("Parse")
          }
          parseWorker.postMessage({ data: ev.data })
          worker.terminate()
          onSuccess("Ok")
        }
        worker.postMessage({ file })
      } catch (error) {
        console.log(error)
        onError({ error })
      }
    },
  }

  const handleChange = ({ name, value }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Card style={formStyle.container} hoverable>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout='horizontal'
        style={formStyle.form}
      >
        <Dragger {...draggerProps}>
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>Click or drag to upload</p>
          <p className='ant-upload-hint'>Only .csv file</p>
        </Dragger>

        <div style={formStyle.formInputs}>
          <div>
            <span>No of Rows</span>
            <InputNumber
              name='rowsLimit'
              placeholder='100000'
              onChange={(value) => {
                handleChange({ name: "rowsLimit", value })
              }}
              style={{ width: "100%" }}
              value={formData.rowsLimit}
            />
          </div>
          <div>
            <span>Prefix</span>
            <Input
              name='prefix'
              placeholder='output_'
              onChange={(event) => {
                const { name, value } = event.target
                handleChange({ name, value })
              }}
              value={formData.prefix}
              style={{ width: "100%" }}
            />
          </div>
          <Button
            type='primary'
            disabled={formData.rowsLimit <= 0 || rowsLength === 0}
            onClick={() => {
              onGenerate(formData)
            }}
          >
            Generate
          </Button>
        </div>
        <Text style={formStyle.text}>
          {rowsLength > 0 &&
            `${abbreviateNumber(rowsLength, 2)} Rows in this file`}
        </Text>
      </Form>
    </Card>
  )
}

export default FileForm
