// app/page.tsx
import { Stack } from "@mui/material"
import List from "./modules/list"
import Header from "./modules/header"
import { getPumpList } from "common/api"
import "./style.scss"
import Detail from "./modules/list/detail"

export async function getServerSideProps() {
  const data = await getPumpList(); // Fetch data on each request
  return {
    props: { data }, // Pass the fetched data as props
  };
}

export default function App({ data }) {
  return (
    <Stack className="app" pt={7}>
      <Header />
      <List data={data} />
      <Detail />
    </Stack>
  );
}
