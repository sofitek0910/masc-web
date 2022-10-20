export const INITIAL_ELEMENTS = [
  {
    id: "1",
    // type: "input",
    data: { label: "Node 1" },
    position: { x: 0, y: 50 },
    className: "light",
  },
  {
    id: "2",
    data: { label: "Node 2" },
    position: { x: 100, y: 100 },
    className: "light",
  },
  {
    id: "3",
    data: { label: "Node 3" },
    position: { x: 400, y: 100 },
    className: "light",
  },
  {
    id: "4",
    data: { label: "Node 4" },
    position: { x: 400, y: 200 },
    className: "light",
  },
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3" },
];
