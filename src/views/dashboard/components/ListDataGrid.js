import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { getLoad } from '../../../store/loadSlice';

// Column definitions based on the data structure
const columns = [
  { field: 'cpm', headerName: 'CPM', width: 90 },
  { field: 'customer_load', headerName: 'Customer Load', width: 180 },
  { field: 'freight_amount', headerName: 'Freight Amount', width: 150 },
  { field: 'expected_dispatcher', headerName: 'Expected Dispatcher', width: 180 },
  { field: 'expected_vehicle', headerName: 'Expected Vehicle', width: 180 },
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'partner_id', headerName: 'Partner ID', width: 130 },
  { field: 'trailer_type', headerName: 'Trailer Type', width: 150 },
  { field: 'delivery_ids', headerName: 'Delivery IDs', width: 200 },
];

const ListDataGrid = () => {
  const dispatch = useDispatch();
  const { loadList, status, error } = useSelector((state) => state.load);

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
    partner_id: load.partner_id,
    trailer_type: load.trailer_type.map(type => type.type).join(', '),  // Join trailer types if needed
    delivery_ids: load.delivery_ids.map(delivery => `${delivery.id}`).join(', '),
  }));

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
    </div>
  );
};

export default ListDataGrid;
