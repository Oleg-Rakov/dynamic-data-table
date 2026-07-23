import { useTableData } from './features/data-table/model/useTableData';

function App() {
  const { loading, rows, columns } = useTableData();

  if (loading) {
    return <p>Loading…</p>;
  }

  return (
    <p>
      Loaded {rows.length} rows, columns: {columns.join(', ')}
    </p>
  );
}

export default App;
