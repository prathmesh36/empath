export const clientData = [
  {
    id: "7faf363a-0c50-11ee-82d2-77b30b486b81",
    clientName: "H&M",
    clientDescription:
      "Hennes & Mauritz AB or H&M Group is a multinational clothing company based in Sweden that focuses on fast-fashion clothing for anyone, any gender",
    clientHostUrl: "http://www.h&msystem-dev.com/",
    createdTimestamp: "2023-06-16T14:17:17.000+00:00",
  },
  {
    id: "7faf363a-0c50-11ee-82d2-77b30b486b82",
    clientName: "M&S",
    clientDescription:
      "Marks and Spencer Group plc is a major British multinational retailer with headquarters in Paddington, London",
    clientHostUrl: "http://www.h&msystem-dev.com/",
    createdTimestamp: "2023-06-16T14:17:17.000+00:00",
  },
  {
    id: "7faf363a-0c50-11ee-82d2-77b30b486b83",
    clientName: "Zara",
    clientDescription:
      "ZARA is a Spanish multi-national retail clothing chain. It specialises in fast fashion, and sells clothing, accessories, shoes, beauty products and perfumes.",
    clientHostUrl: "http://www.h&msystem-dev.com/",
    createdTimestamp: "2023-06-16T14:17:17.000+00:00",
  },
];

export const clientColumns = [
  {
    field: "clientName",
    headerName: "Name",
    width: 70,
    editable: true,
    flex: 1,
  },
  {
    field: "clientDescription",
    headerName: "Description",
    type: "singlesheet",
    width: 950,
    align: "left",
    headerAlign: "left",
    editable: true,
    flex: 1,
  },
  {
    field: "clientHostUrl",
    headerName: "URL",
    type: "singlesheet",
    width: 250,
    editable: true,
    flex: 1,
  },
];
