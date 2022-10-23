import React, { useEffect, useState } from "react"
import { List } from "antd"
import TableHeader from "./TableHeader"
import TableRow from "./TableRow"
import { tableStyle } from "../../styles/style"
import * as xlsx from "xlsx"

const Table = ({ data, setLoader }) => {
  const [list, setList] = useState([])

  const handleDownload = () => {
    data.forEach((item, index) => {
      if (list[index].isChecked) {
        const worksheet = xlsx.utils.json_to_sheet(item.data, {
          skipHeader: true,
        })
        const workbook = xlsx.utils.book_new()
        xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1")
        xlsx.writeFile(workbook, `${list[index].name}.xlsx`)
      }
    })
  }

  const checkedData = list.filter((item) => item.isChecked) ?? []

  const onAllSelect = () => {
    setList((data) =>
      data.map((item) => ({
        ...item,
        isChecked: checkedData.length !== data.length,
      }))
    )
  }

  useEffect(() => {
    setList(data.map((item) => ({ name: item.name, isChecked: false })) ?? [])
  }, [data])

  return (
    <>
      <TableHeader
        checkedLength={checkedData.length}
        onDownload={handleDownload}
        dataLength={data.length}
        onAllSelect={onAllSelect}
      />
      <List
        style={tableStyle.list}
        grid={tableStyle.grid}
        loading={false}
        dataSource={data}
        renderItem={(item, index) => (
          <TableRow
            item={item}
            data={list?.[index] ?? { name: "", isChecked: false }}
            setList={setList}
            index={index}
            setLoader={setLoader}
          />
        )}
      />
    </>
  )
}

export default Table
