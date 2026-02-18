'use client';

export interface Column<T> {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    className?: string;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onRowClick?: (row: T) => void;
}

export default function DataTable<T extends { id: string | number }>({ data, columns, onRowClick }: DataTableProps<T>) {
    return (
        <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} className={`py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider ${col.className || ''}`}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {data.length > 0 ? (
                        data.map((row) => (
                            <tr
                                key={row.id}
                                onClick={() => onRowClick && onRowClick(row)}
                                className={`
                                    hover:bg-slate-50 transition-colors
                                    ${onRowClick ? 'cursor-pointer' : ''}
                                `}
                            >
                                {columns.map((col, idx) => (
                                    <td key={idx} className="py-4 px-6 text-sm text-slate-700 font-medium">
                                        {typeof col.accessor === 'function'
                                            ? col.accessor(row)
                                            : (row[col.accessor] as React.ReactNode)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="py-12 text-center text-slate-500">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Simple Pagination */}
            {data.length > 0 && (
                <div className="border-t border-slate-50 px-6 py-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Showing {data.length} results</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-slate-200 rounded text-xs font-bold text-slate-500 disabled:opacity-50" disabled>Prev</button>
                        <button className="px-3 py-1 border border-slate-200 rounded text-xs font-bold text-slate-500 hover:bg-slate-50">Next</button>
                    </div>
                </div>
            )}
        </div>
    );
}
