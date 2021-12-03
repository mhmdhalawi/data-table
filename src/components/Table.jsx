import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { Button } from '@mui/material';
import { useStore } from '../store';

export const Table = ({ photos }) => {
  const [rows, setRows] = useState(photos);
  let selected;
  let toggleUpdateRow = false;

  const [toggleUpdateRows, setToggleUpdateRows] = useState(true);

  const [editId, setEditId] = useState('');

  const updatePhoto = useStore((state) => state.updatePhoto);

  const handleUpdatePhoto = (params) => {
    if (params.field !== 'id' && params.field !== 'albumId') {
      return;
    }
    if (toggleUpdateRow === true) toggleUpdateRow = false;
    else toggleUpdateRow = true;
    setToggleUpdateRows(false);
    let interval;
    if (toggleUpdateRow) {
      selected = params.id;
      interval = setInterval(() => {
        updatePhoto(selected);
      }, 2000);
    } else {
      clearInterval(interval);
    }
  };

  const updatePhotos = useStore((state) => state.updatePhotos);
  useEffect(() => {
    let interval;
    if (toggleUpdateRows) {
      interval = setInterval(() => {
        updatePhotos();
      }, 2000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [toggleUpdateRows]);

  useEffect(() => {
    setRows(photos);
  }, [photos]);

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
    <ClickAwayListener
      onClickAway={() => {
        setToggleUpdateRows(!toggleUpdateRows);
        toggleUpdateRow = false;
      }}
    >
      <DataGrid
        sx={{ width: '100%' }}
        columns={columns}
        rows={rows}
        pageSize={20}
        rowsPerPageOptions={[20]}
        disableColumnMenu
        isCellEditable={(params) => params.row.id === editId}
        onCellClick={handleUpdatePhoto}
        // onCellFocusOut={() => setToggleUpdateRow(false)}
      />
    </ClickAwayListener>
  );
};
