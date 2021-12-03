import { useState } from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';

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
    {
      field: 'albumId',
      headerName: 'Album ID',
      flex: 1,
      width: 100,
      sortable: false,
      resizable: false,
    },
    { field: 'id', headerName: 'ID', flex: 1, width: 100, sortable: false, resizable: false },
    {
      field: 'title',
      headerName: 'Title',
      flex: 4,
      minWidth: 100,
      sortable: false,
      editable: true,
      resizable: false,
    },
    {
      field: 'remove',
      headerName: 'Remove',
      flex: 1,
      width: 100,
      resizable: false,
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
      flex: 1,
      width: 100,
      sortable: false,
      resizable: false,
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
    <DataGridPro
      sx={{ width: '100%' }}
      columns={columns}
      rows={photos}
      pageSize={20}
      rowsPerPageOptions={[20]}
      disableColumnMenu
      isCellEditable={(params) => params.row.id === editId}
      pagination
    />
  );
};
