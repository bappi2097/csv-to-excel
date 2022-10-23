import React, { useState } from "react"
import Table from "../Table"
import FileForm from "../FileForm"
import Backdrop from "../common/Backdrop"

let rowsData = []

const Home = () => {
  const [loader, setLoader] = useState(false)
  const [formData, setFormData] = useState()

  const chunkArrayInGroups = (arr, length) => {
    const myArray = []
    let count = 0
    for (var i = 0; i < arr.length; i += length) {
      count++
      const data = arr.slice(i, i + length)
      myArray.push({
        name: `${formData?.prefix ?? ""}${count}`,
        length: data.length,
        data: data,
      })
    }
    return myArray
  }

  const generatedData = () =>
    rowsData.length > 0 && formData?.rowsLimit
      ? chunkArrayInGroups(rowsData, formData.rowsLimit ?? 0)
      : []

  const handleParseCsv = (data) => {
    rowsData = data
  }

  const handleGenerate = (data) => {
    setFormData(data)
  }

  return (
    <>
      <FileForm
        onParseCsv={handleParseCsv}
        setLoader={setLoader}
        onGenerate={handleGenerate}
      />
      <Table data={generatedData()} setLoader={setLoader} />
      {loader && <Backdrop />}
    </>
  )
}

export default Home
