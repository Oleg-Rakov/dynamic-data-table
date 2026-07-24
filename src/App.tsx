import { DataTable } from './features/data-table/ui/DataTable';
import { GlobalStyle, Page, PageTitle } from './features/data-table/ui/styles';

function App() {
  return (
    <>
      <GlobalStyle />
      <Page>
        <PageTitle>Dynamic data table</PageTitle>
        <DataTable />
      </Page>
    </>
  );
}

export default App;
