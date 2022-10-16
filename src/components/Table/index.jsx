import React from "react"
import { List } from "antd"
import TableHeader from "./TableHeader"
import TableRow from "./TableRow"

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

const Table = () => {
  return (
    <>
      <TableHeader />
      <List
        style={{
          padding: 20,
        }}
        grid={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 3, gutter: 10 }}
        loading={false}
        dataSource={data}
        renderItem={(item) => <TableRow item={item} />}
      />
    </>
  )
}

export default Table
