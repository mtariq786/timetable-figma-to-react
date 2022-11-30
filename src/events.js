const events = [
  {
    title: "09-10",
    description: "Speaking Class",
    start: getDate("YEAR-MONTH-02"),
    backgroundColor: "#B4B4B4",
    borderColor: "#B4B4B4",
    color: "",
   
  },
  {
    title: " 10-11",
    start: getDate("YEAR-MONTH-06"),
    backgroundColor: "#B4B4B4",
    borderColor: "#B4B4B4",
    description: "Listening Class",
  },
  {
    title: "12-13",
    start: getDate("YEAR-MONTH-08"),
    backgroundColor: "#B4B4B4",
    borderColor: "#B4B4B4",
    description: "Drawing Class",
  },
];

function getDate(dayString) {
  const today = new Date();
  const year = today.getFullYear().toString();
  let month = (today.getMonth() + 1).toString();

  if (month.length === 1) {
    month = "0" + month;
  }

  return dayString.replace("YEAR", year).replace("MONTH", month);
}

export default events;
