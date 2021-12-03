import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { Button } from '@mui/material';
import { useStore } from '../store';

export const Table = ({ photos }) => {
  const [editId, setEditId] = useState('');

  const deletePhoto = useStore((state) => state.deletePhoto);

  const handleEdit = (cellValues) => {
    setEditId(cellValues.id);
  };

  const handleDelete = (cellValues) => {
    deletePhoto(cellValues.id);
  };

  const columns = [
    { field: 'albumId', headerName: 'Album ID', width: 100, sortable: false },
    { field: 'id', headerName: 'ID', width: 100, sortable: false },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      minWidth: 100,
      sortable: false,
      editable: true,
    },
    {
      field: 'remove',
      headerName: 'Remove',
      width: 100,
      sortable: false,
      renderCell: (row) => (
        <Button onClick={() => handleDelete(row)} size='small' variant='contained' color='error'>
          Remove
        </Button>
      ),
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      sortable: false,
      renderCell: (row) => {
        if (!editId || editId !== row.id) {
          return (
            <Button
              onClick={() => handleEdit(row)}
              size='small'
              variant='contained'
              color='success'
            >
              Edit
            </Button>
          );
        } else {
          return (
            <Button onClick={() => setEditId('')} size='small' variant='contained' color='primary'>
              Done
            </Button>
          );
        }
      },
    },
  ];

  return (
    <DataGrid
      sx={{ width: '100%' }}
      columns={columns}
      rows={photos}
      pageSize={20}
      rowsPerPageOptions={[20]}
      disableColumnMenu
      isCellEditable={(params) => params.row.id === editId}
    />
  );
};
