// src/components/PartnerList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getpartners } from '../../store/partnerSlice'; // Replace with the actual path
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress, Typography, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import { IconEdit } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const PartnerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { partnersData, status, error } = useSelector((state) => state.partners);

  useEffect(() => {
    dispatch(getpartners())
      .unwrap()
      .catch(() => toast.error('Failed to load partner data'));
  }, [dispatch]);

  const handleEdit = (id) => {
    navigate(`/edit-partner/${id}`);
  };

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'failed') {
    return <Typography color="error">Error: {error}</Typography>;
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'street', headerName: 'Street', width: 150 },
    { field: 'zip_code', headerName: 'ZIP Code', width: 110 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'mic_number', headerName: 'MIC Number', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <IconButton onClick={() => handleEdit(params.id)} aria-label="edit">
          <IconEdit />
        </IconButton>
      ),
    },
  ];

  const rows = partnersData?.map((partner) => ({
    id: partner.id,
    name: partner.name,
    city: partner.city,
    street: partner.street,
    zip_code: partner.zip_code,
    state: partner.state,
    mic_number: partner.mic_number,
  }));

  return (
    <div style={{ height: 600, width: '100%' }}>
      <Typography marginBottom={3} variant="h2" gutterBottom>
        Partner List
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        disableSelectionOnClick
      />
    </div>
  );
};

export default PartnerList;
