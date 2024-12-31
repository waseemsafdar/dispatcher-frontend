import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { deleteLoadById, getLoad } from '../../../store/loadSlice';
import { IconButton } from '@mui/material';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { height } from '@mui/system';

const ListDataGrid = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loadList, status, error } = useSelector((state) => state.load);

  const handleEdit = (id) => {
    navigate(`/edit-load/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteLoadById(id)).unwrap()
      .then(() => {
        toast('Load deleted successfully!');
        dispatch(getLoad()); // Refresh the list after deletion
      })
      .catch((err) => {
        toast('Failed to delete load:', err);
      });
  };

  const handleRowClick = (id) => {
    navigate(`/load-detail/${id}`);
  };

  const columns = [
    { field: 'cpm', headerName: 'CPM', width: 90 },
    { field: 'customer_load', headerName: 'Customer Load', width: 180 },
    { field: 'freight_amount', headerName: 'Freight Amount', width: 150 },
    { field: 'expected_dispatcher', headerName: 'Expected Dispatcher', width: 180 },
    { field: 'expected_vehicle', headerName: 'Expected Vehicle', width: 180 },
    { field: 'partner_id', headerName: 'Partner', width: 130 },
    { field: 'trailer_type', headerName: 'Trailer Type', width: 150 },
    { field: 'is_archived', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handleEdit(params.id)}
            aria-label="edit"
          >
            <IconEdit />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.id)}
            aria-label="delete"
          >
            <IconTrash />
          </IconButton>
          <IconButton
            onClick={() => handleRowClick(params.id)}
            aria-label="detail"
          >
            <IconEye />
          </IconButton>
        </>
      ),
    },
  ];


  useEffect(() => {
    if (status === 'idle') {
      dispatch(getLoad());
    }
  }, [dispatch, status]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  const rows = loadList?.map((load) => ({
    id: load.id,
    cpm: load.cpm,
    customer_load: load.customer_load,
    freight_amount: load.freight_amount,
    expected_dispatcher: load.expected_dispatcher,
    expected_vehicle: load.expected_vehicle,
    partner_id: load?.partner?.name,
    is_archived: load?.is_archived ? 'InActive' : 'Active',
    trailer_type: load.trailer_type.map(type => type.type).join(', '),
  }));

  return (
    <div style={{ height:"400px", width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        disableSelectionOnClick
        scrollbarSize={10}
        style={{ overflowX: 'auto' }}
      />

    </div>
  );
};

export default ListDataGrid;
