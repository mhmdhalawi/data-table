import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { Button } from '@mui/material';
import { useStore } from '../store';

export const Table = ({ photos }) => {
  const [rows, setRows] = useState(photos);

  const [toggleUpdateRows, setToggleUpdateRows] = useState(true);
  const [toggleRow, setToggleRow] = useState(false);
  const [newIndex, setNewIndex] = useState(null);
  const [rowInterval, setRowInterval] = useState();

  const [editId, setEditId] = useState('');

  const updatePhoto = useStore((state) => state.updatePhoto);

  const handleUpdatePhoto = (params) => {
    if (params.field !== 'id' && params.field !== 'albumId') {
      return;
    }
    setNewIndex(photos.findIndex((row) => row.id === params.id));
    setToggleUpdateRows(false);
    if (params.id === photos[newIndex]?.id) {
      setToggleRow(!toggleRow);
    } else {
      clearInterval(rowInterval);
      setToggleRow(true);
    }
  };

  useEffect(() => {
    if (toggleRow) {
      setRowInterval(
        setInterval(() => {
          updatePhoto(photos[newIndex].id);
        }, 2000)
      );
    } else {
      clearInterval(rowInterval);
    }

    return () => {
      clearInterval(rowInterval);
    };
  }, [toggleRow, newIndex, photos]);

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
    setToggleRow(false);
    setEditId(cellValues.id);
  };

  const handleDelete = (cellValues) => {
    setToggleRow(false);
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
        setToggleRow(false);
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
        onCellClick={(params) => handleUpdatePhoto(params)}
        // onCellFocusOut={() => setToggleUpdateRow(false)}
      />
    </ClickAwayListener>
  );
};
