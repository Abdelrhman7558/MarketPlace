'use client';

export interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onRowClick?: (item: T) => void;
}

export default function DataTable<T extends { id: string | number }>({ data, columns, onRowClick }: DataTableProps<T>) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                        {columns.map((col, idx) => (
                            <th key={idx} className={`px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider ${col.className || ''}`}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {data.map((item) => (
                        <tr key={item.id} onClick={() => onRowClick && onRowClick(item)} className={onRowClick ? "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800" : ""}>
                            {columns.map((col, colIdx) => (
                                <td key={colIdx} className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-gray-100">
                                    {typeof col.accessor === 'function' ? col.accessor(item) : (item[col.accessor] as React.ReactNode)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
