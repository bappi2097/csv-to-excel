import * as Papa from "papaparse"
self.onmessage = ({ data }) => {
  try {
    Papa.parse(data.data, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        self.postMessage(results.data)
      },
    })
  } catch (error) {
    self.postMessage(textFromFileLoaded)
  }
}
