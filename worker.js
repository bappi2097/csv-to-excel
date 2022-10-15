self.onmessage = (e) => {
  try {
    const file = e.data.file
    const reader = new FileReader()
    reader.onload = (fileLoadedEvent) => {
      const textFromFileLoaded = fileLoadedEvent.target.result
      self.postMessage(textFromFileLoaded)
    }
    reader.readAsText(file, "UTF-8")
  } catch (error) {
    self.postMessage(textFromFileLoaded)
  }
}
