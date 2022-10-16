export const formStyle = {
  container: {
    width: "fit-content",
    margin: "auto",
    background: "white",
    padding: 20,
    borderRadius: 8,
  },
  form: {
    display: "grid",
    gridTemplateColumns: "200px 300px",
    gap: 10,
  },
  formInputs: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  text: { textAlign: "center", gridColumn: "1/-1", marginTop: 30 },
}

export const tableStyle = {
  list: {
    padding: 20,
  },
  grid: { xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 3, gutter: 10 },
}

export const tableHeaderStyle = {
  container: {
    margin: "20px 20px -10px",
  },
  containerBody: {
    display: "grid",
    gridTemplateColumns: "0px 1fr 150px 0px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkbox: { marginRight: 10 },
}

export const tableRowStyle = {
  containerBody: {
    display: "grid",
    gridTemplateColumns: "0px 30px 1fr 1fr 32px",
    alignItems: "center",
  },
  input: { width: "calc(100% - 20px)" },
  button: { marginLeft: 10 },
}
