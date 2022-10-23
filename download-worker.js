import * as xlsx from "xlsx"
self.onmessage = (e) => {
  try {
    const { data } = e.data
    const worksheet = xlsx.utils.json_to_sheet(data.data, {
      skipHeader: true,
    })
    const workbook = xlsx.utils.book_new()
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1")
    self.postMessage(workbook)
  } catch (error) {
    self.postMessage("error")
  }
}
