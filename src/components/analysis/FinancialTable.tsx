export interface TableColumn {
  key: string;
  header: string;
  align?: "left" | "right";
}

export interface TableRow {
  cells: Record<string, { value: string; color?: "green" | "red" | "amber" | "neutral"; arrow?: "up" | "down" | "neutral" }>;
}

interface FinancialTableProps {
  title?: string;
  columns: TableColumn[];
  rows: TableRow[];
}

function cellColor(color?: string): string {
  switch (color) {
    case "green": return "text-success";
    case "red": return "text-danger";
    case "amber": return "text-accent";
    default: return "";
  }
}

function arrowPrefix(arrow?: string): string {
  switch (arrow) {
    case "up": return "\u2191 ";
    case "down": return "\u2193 ";
    case "neutral": return "\u2192 ";
    default: return "";
  }
}

export default function FinancialTable({ title, columns, rows }: FinancialTableProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 overflow-x-auto">
      {title && (
        <div className="text-[11px] font-mono uppercase tracking-wider text-primary mb-4">{title}</div>
      )}
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`py-2 px-3 text-[10px] font-mono uppercase tracking-wider text-muted border-b border-border font-normal ${col.align === "left" || col.key === columns[0].key ? "text-left" : "text-right"}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-card-hover transition-colors">
              {columns.map((col) => {
                const cell = row.cells[col.key];
                if (!cell) return <td key={col.key} className="py-2 px-3">—</td>;
                const isFirst = col.key === columns[0].key;
                return (
                  <td
                    key={col.key}
                    className={`py-2 px-3 border-b border-border/30 font-mono text-xs ${isFirst ? "text-left font-sans text-sm text-foreground" : "text-right"} ${cellColor(cell.color)}`}
                  >
                    {arrowPrefix(cell.arrow)}{cell.value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
