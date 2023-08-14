import { randomId } from "@mui/x-data-grid-generator";
export const expData = [
  {
    id: randomId(),
    expName: "Ed Sheeran Concert",
    expDescription: "Subtract Concert",
    expLocation: "Los Angeles",
    expCost: 10,
    expQuantity: 99,
  },
  {
    id: randomId(),
    expName: "Cold Play Concert",
    expDescription: "Subtract Concert",
    expLocation: "Los Angeles",
    expCost: 10,
    expQuantity: 99,
  },
  {
    id: randomId(),
    expName: "Taylor Concert",
    expDescription: "Subtract Concert",
    expLocation: "Los Angeles",
    expCost: 10,
    expQuantity: 99,
  },
];
export const expColumns = [
  { field: "expName", headerName: "Name", width: 180, editable: true },
  {
    field: "expDescription",
    headerName: "Description",
    type: "singlesheet",
    width: 180,
    align: "left",
    headerAlign: "left",
    editable: true,
    flex:1,
  },
  {
    field: "expLocation",
    headerName: "Location",
    type: "singlesheet",
    width: 180,
    editable: true,
    flex:1,
  },
  {
    field: "expCost",
    headerName: "Cost",
    width: 100,
    editable: true,
    type: "number",
    flex:1
  },
  {
    field: "expQuantity",
    headerName: "Quantity",
    width: 100,
    editable: true,
    type: "number",
    flex:1
  },
];
