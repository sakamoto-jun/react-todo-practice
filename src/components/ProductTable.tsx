import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { getProducts } from "../services/productApi";
import { Product } from "../types";

const ProductTable = () => {
  const { data: { products = [] } = {}, isLoading } = useQuery<{
    products: Product[];
  }>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: products,
    columns,
    initialState: {
      sorting: [{ id: "title", desc: false }],
    },
    state: {
      pagination,
    },
    enableSortingRemoval: false, // 정렬해제 불가
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // render the product table
  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div
                    style={
                      header.column.getCanSort() ? { cursor: "pointer" } : {}
                    }
                    onClick={header.column.getToggleSortingHandler()} // `header.column.getToggleSortingHandler()` 전체 컬럼 정렬
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          type="button"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          ⏪
        </button>
        <button
          type="button"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          ◀️
        </button>
        {table.getPageOptions().map((pageIndex) => {
          const isActive = pageIndex === table.getState().pagination.pageIndex;

          return (
            <button
              type="button"
              key={pageIndex}
              style={{ backgroundColor: isActive ? "orange" : "#1a1a1a" }}
              onClick={() => table.setPageIndex(pageIndex)}
            >
              {pageIndex + 1}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          ▶️
        </button>
        <button
          type="button"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          ⏩
        </button>
      </div>
    </div>
  );
};

const columnHelper = createColumnHelper<Product>();
const columns = [
  columnHelper.accessor("id", {
    header: () => <div>ID</div>,
    cell: (info) => <div style={{ color: "orange" }}>{info.getValue()}</div>,
  }),
  columnHelper.accessor("title", {
    header: (table) => (
      <div onClick={() => table.column.toggleSorting()}>Title</div> // `() => table.column.toggleSorting()` 개별 컬럼 정렬
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => info.getValue(),
  }),
];

export default ProductTable;
