# Dynamic data table

React 17 + TypeScript (strict) + styled-components. Dynamic columns/rows, inline
edit, row delete, add-row modal. No table/form libraries.

## Run

```bash
npm install
npm run dev      # dev server
npm run build    # tsc + vite build
npm test         # model unit tests
npm run lint
npm run typecheck
```

First render shows `Loading…` for 5 s (mock request), then the table.

## Data format

```ts
interface TableRow {
  id: string;
  data: Record<string, string>;
}
// table receives TableRow[]
```

- Columns = `Object.keys(rows[0].data)` → dynamic columns for free.
- Add-row form is built from the same keys → one source of truth for "form
  fields come from the data".
- `id` outside `data` → stable React key / react-window `itemKey`, never a column.
- `string` values → text input + `trim()` "not empty" validation. Per-column
  typing is a natural extension, out of scope.

Rejected "array of arrays + header row": loses column names, so the form can't
be derived from the data.

## Mock API

`fetchTableData()` = `Promise` resolving after `setTimeout(5000)` with 1000 rows.
Satisfies "≥1 row" and makes virtualization actually necessary.

## Virtualization

`react-window` `FixedSizeList` mounts only visible rows. It decides **only which
row indices are in the DOM** — columns, layout, editing, validation, form, and
add/delete are written from scratch, so this is not a "ready-made table".

Trade-off: windowing is incompatible with native `<table>`, so rows are `div`s
with ARIA roles (`role="table"` → `rowgroup` → `row` → `columnheader`/`cell`).
Header and rows share one CSS Grid template and one horizontal-scroll container.

## Why edits don't re-render 1000 rows

1. Stable callbacks (functional `setState`, empty deps).
2. `TableRow` gets `row` + stable callbacks and closes over `row.id` itself — no
   `() => deleteRow(row.id)`, which would break the memo compare.
3. `useMemo` on `itemData` so the react-window wrapper can re-render without
   changing `TableRow` props.
4. `updateCellValue` is immutable + targeted: only the edited row gets a new
   reference.
5. `React.memo(TableRow)` then skips every unchanged row.

Step 5 is pointless without step 4; the reference-identity test pins it.

## Behavior

- **`itemKey`** by `row.id` is required — index keys would move an in-progress
  edit to another row after a delete.
- **Edit** (`EditableCell`): click → input, commit on blur (Enter blurs);
  empty/whitespace reverts + red border + `aria-invalid`.
- **Columns stored separately from rows** → header and form survive deleting
  every row.
- **Add** (`AddRowModal`): portal, focus-trapped, closes on overlay/Escape;
  every field required. New row prepended, list scrolls to top.

## Structure

```
features/data-table/{api,model,ui}   shared/{Toast,useNotice,useFocusTrap}
```

Tests cover the model only (pure functions): columns from first row, whitespace
validation, form validation, immutable update, untouched-row reference kept.
react-window itself is not tested.
