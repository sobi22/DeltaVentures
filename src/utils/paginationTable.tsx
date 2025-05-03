import * as React from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface TableProps {
  columns: GridColDef[];
  rows: any[];
  checkbox: boolean;
  onSelectionChange?: (selectionModel: any) => void;
}

const PaginationTable: React.FC<TableProps> = ({ columns, rows, checkbox, onSelectionChange }) => {
  const centeredColumns: GridColDef<any>[] = columns.map((column) => ({
    ...column,
    align: 'center',
    headerAlign: 'center',
  }));

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      {rows.length > 0 || rows == undefined ? (
        <Box sx={{ width: '100%', height: '100%' }}>
          <DataGrid
            rows={rows}
            columns={centeredColumns}
            onRowSelectionModelChange={onSelectionChange}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            checkboxSelection={checkbox}
            rowHeight={100}
            disableRowSelectionOnClick
            sx={{
                Margin:"5 5 5 5",
              '& .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
              '& .MuiDataGrid-cell:focus-within': {
                outline: 'none',
              },
              '& .MuiDataGrid-columnHeader:focus': {
                outline: 'none',
              },
              '& .MuiDataGrid-columnHeader:focus-within': {
                outline: 'none',
              },
              '& .MuiDataGrid-columnHeader': {
                fontWeight: 'bold',
                fontSize: '17px',
                backgroundColor: 'rgba(0, 0, 0, 0.03)',
              },
            }}
          />
        </Box>
      ) : (
        <Box sx={{ width: '100%', height: 200 }}>
          <DataGrid
            rows={[]}
            columns={centeredColumns}
            onRowSelectionModelChange={onSelectionChange}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            checkboxSelection={checkbox}
            disableRowSelectionOnClick
            sx={{
              '& .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
              '& .MuiDataGrid-cell:focus-within': {
                outline: 'none',
              },
              '& .MuiDataGrid-columnHeader:focus': {
                outline: 'none',
              },
              '& .MuiDataGrid-columnHeader:focus-within': {
                outline: 'none',
              },
              '& .MuiDataGrid-columnHeader': {
                fontWeight: 'bold',
                fontSize: '17px',
                backgroundColor: 'rgba(0, 0, 0, 0.03)',
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default PaginationTable;
