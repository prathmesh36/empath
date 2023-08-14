import * as React from "react";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { apiCall } from "../../api/api";
import { ORDER_API_CONFIG } from "../../metadata/apiconfig";
import "../../stylesheets/App.css";
import { orderColumns } from "../../data/order-data";

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState([]);

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns = [
    ...orderColumns,
    {
      field: "actions",
      type: "actions",
      headerName: "Delete",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  React.useEffect(() => {
    apiCall({ ...ORDER_API_CONFIG }, setRows)
      .then((response) => {
        console.debug(response);
        if (!response[0]) {
          setRows([]);
        }
      })
      .catch((error) => {
        setRows([]);
      });
  }, []);

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        getRowId={(row) => row.userId}
        rows={rows}
        columns={columns}
        getRowHeight={() => "auto"}
      />
    </Box>
  );
}
