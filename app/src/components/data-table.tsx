import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PaginationControls from "./pagination-controls";
import type { Collection } from "../lib/interfaces/project";
import { TableHead } from "@mui/material";

/**
 * Based on  MUI documentation: https://mui.com/material-ui/react-table/
 */
export default function CollectionsDataTable({
  collection,
}: {
  collection: Collection;
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const rows = collection.data;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 500 }}
          aria-label="custom pagination table for fireRESTy"
        >
          {rows.length > 0 && (
            <TableHead>
              <TableRow>
                {Object.entries(rows[0]).slice(1).map(([key]) => {
                  return (
                    <TableCell key={key} scope="row" style={{ width: 160 }}>
                      {key} 
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => {
              const { id, ...rowData } = row;
              return (
                <TableRow key={id}>
                  {rowData &&
                    Object.entries(rowData).map(([key, value]) => {
                      return (
                        <TableCell key={key} scope="row" style={{ width: 160 }}>
                          {(typeof value === "string" ||
                            typeof value === "number" ||
                            typeof value === "boolean") && (
                            <span>{value.toString()}</span>
                          )}
                          {typeof value === "object" && (
                            <span className="monospace">
                              {JSON.stringify(value)}
                            </span>
                          )}
                        </TableCell>
                      );
                    })}
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={PaginationControls}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}
