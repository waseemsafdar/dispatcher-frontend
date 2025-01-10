import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getpartners } from '../../store/partnerSlice'; // Replace with the actual path
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress, Typography, IconButton, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { IconEdit, IconEye } from '@tabler/icons-react';
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
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1 },
    { field: 'street', headerName: 'Street', flex: 1 },
    { field: 'zip_code', headerName: 'ZIP Code', flex: 1 },
    { field: 'state', headerName: 'State', flex: 1 },
    { field: 'mic_number', headerName: 'MIC Number', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <>
          {/* <IconButton onClick={() => handleEdit(params.id)} aria-label="edit">
            <IconEdit />
          </IconButton> */}
          <IconButton onClick={() => handleRowClick(params.id)} aria-label="detail">
            <IconEye />
          </IconButton>
        </>
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

  const handleRowClick = (id) => {
    navigate(`/partner-detail/${id}`);
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography marginBottom={3} variant="h2" gutterBottom>
        Partner List
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box
          sx={{
            flexGrow: 1,
            '& .MuiDataGrid-root': {
              border: '1px solid #ddd',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #ddd',
              borderRight: '1px solid #ddd',  // Vertical border
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: '1px solid #ddd',
              backgroundColor: '#f5f5f5',
            },
            '& .MuiDataGrid-columnSeparator': {
              display: 'none',
            },
            '& .MuiDataGrid-row': {
              borderBottom: '1px solid #ddd',
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            disableRowSelectionOnClick
            autoHeight
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PartnerList;