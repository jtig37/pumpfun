// app/page.tsx
import { Stack } from "@mui/material"
import List from "./modules/list"
import Header from "./modules/header"
import { getPumpList } from "common/api"
import "./style.scss"
import Detail from "./modules/list/detail"

// In the App Router, you can directly fetch data inside the component
export default async function App() {
  const data = await getPumpList(); // Fetch data on the server

  return (
    <Stack className="app" pt={7}>
      <Header />
      <List data={data} />
      <Detail />
    </Stack>
  );
}
