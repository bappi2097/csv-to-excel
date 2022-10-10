import "./App.css";
import * as xlsx from "xlsx";
import * as Papa from "papaparse";
import * as React from "react";
function App() {
  const [size, setSize] = React.useState();
  const [extType, setExtType] = React.useState("");
  const [generatedArray, setGeneratedArray] = React.useState([]);

  const csvToJson = (e) => {
    const files = e.target.files;
    let data = [];
    if (files) {
      console.log(files[0]);
      Papa.parse(files[0], {
        complete: (results) => {
          data = results.data;
          setGeneratedArray(data);
        },
      });
    }
  };

  const excelToCsv = (e) => {
    const files = e.target.files;
    let data = [];
    if (files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData = e.target.result;
        const workbook = xlsx.read(fileData, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        data = xlsx.utils.sheet_to_json(worksheet);
        setGeneratedArray(data);
      };
      reader.readAsArrayBuffer(files[0]);
    }
  };

  const readUploadFile = (e) => {
    e.preventDefault();
    const fileName = e.target?.value?.split(".");
    const fileExt = fileName?.[fileName.length - 1] ?? "";
    if (fileExt) {
      setExtType(fileExt);
      if (fileExt === "csv") {
        csvToJson(e);
      } else if (fileExt === "xlsx" || fileExt === "xls") {
        excelToCsv(e);
      }
    } else {
    }
  };

  const chunkArrayInGroups = (arr, length) => {
    const myArray = [];
    for (var i = 0; i < arr.length; i += length) {
      myArray.push(arr.slice(i, i + length));
    }
    return myArray;
  };

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  const downloadExcel = (tableData) => {
    tableData.forEach((item, index) => {
      const worksheet = xlsx.utils.json_to_sheet(item);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      //let buffer = xlsx.write(workbook, { bookType: "xlsx", type: "buffer" });
      //xlsx.write(workbook, { bookType: "xlsx", type: "binary" });
      xlsx.writeFile(workbook, `${index + 1}.xlsx`);
    });
  };

  const generateJSON = () => {
    let arr = [];
    if (extType === "csv") {
      arr = chunkArrayInGroups(
        generatedArray.map((data) => ({ ...data })),
        Number(size)
      );
    } else {
      arr = chunkArrayInGroups(generatedArray, Number(size));
    }
    downloadExcel(arr);
  };

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        <label htmlFor="upload">Upload File</label>
        <input
          type="file"
          name="upload"
          id="upload"
          onChange={readUploadFile}
        />
        <input type="text" value={size} onChange={handleChange} />
        <button onClick={generateJSON}>Genarate</button>
      </div>
    </div>
  );
}

export default App;
