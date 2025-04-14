import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteLoadById, getLoad } from '../../../store/loadSlice';

import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  Box,
  Icon
} from '@mui/material';
import { IconAlertCircle, IconCheck, IconCircleCheckFilled, IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { IconCheckbox } from '@tabler/icons-react';
import { IconCircleDashed } from '@tabler/icons-react';

const ListDataGrid = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const { loadList, status, error , filters} = useSelector((state) => state.load);

  const handleEdit = (id) => {
    navigate(`/edit-load/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteLoadById(id)).unwrap()
      .then(() => {
        toast('Load deleted successfully!');
        dispatch(getLoad());
      })
      .catch((err) => {
        toast('Failed to delete load:', err);
      });
  };

  const handleRowClick = (id) => {
    navigate(`/load-detail/${id}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  };

  const computePickupStatus = (load) => {
    const { odoo_load_stage, planned_start_time } = load;
    
    const relevantPickupStages = ['Planned', 'Pending', 'Confirmed'];
    const now = new Date();

    if (relevantPickupStages.includes(odoo_load_stage) && new Date(planned_start_time) < now) {
      return (<div style={{ display: 'flex', alignItems: 'center', color: 'red' }}>
          <IconAlertCircle  style={{ color: 'red' }} />
          <span style={{ marginLeft: '8px' }}>Late</span>
    </div>)
    }
    return (<div style={{ display: 'flex', alignItems: 'center', color: 'green' }}>
          <IconCircleCheckFilled style={{ color: 'green' }} />

      <span style={{ marginLeft: '8px' }}>On Time</span>
</div>);
    
  };

  const computeDeliveryStatus = (load) => {
    const { odoo_load_stage, planned_end_time } = load;
    const completedStages = ['Delivered', 'Done', 'Closed'];
    const now = new Date();

    // New condition for "Invoiced" stage
    if (odoo_load_stage === 'Invoiced') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', color: 'green' }}>
          <IconCircleCheckFilled style={{ color: 'green' }} />
          <span style={{ marginLeft: '8px' }}>Delivered</span>
        </div>
      );
    }
    
    if (!completedStages.includes(odoo_load_stage) && new Date(planned_end_time) < now) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', color: 'red' }}>
          <IconAlertCircle style={{ color: 'red' }} />
          <span style={{ marginLeft: '8px' }}>Late</span>
        </div>
      );
    }
    
    return (
      <div style={{ display: 'flex', alignItems: 'center', color: 'green' }}>
        <IconCircleCheckFilled style={{ color: 'green' }} />
        <span style={{ marginLeft: '8px' }}>On Time</span>
      </div>
    );
};

  useEffect(() => {
    dispatch(getLoad(filters));
  }, [dispatch]);

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
    pickup_city: load?.pickup_city,
    pickup_state: load?.pickup_state,
    delivery_city: load?.delivery_city,
    delivery_state: load?.delivery_state,
    planned_start_time: load?.planned_start_time,
    planned_end_time: load?.planned_end_time,
    is_archived: load?.is_archived ? 'Covered' : <span style={{ color: "orange" }}>Open</span>,
    trailer_type: load.trailer_type.map(type => type.type).join(', '),
    load_type: load?.load_type,
    load_comments: load?.load_comments,
    sale_agent: load?.sale_agent,
    temperature: load?.temperature,
    odoo_load_stage: load?.odoo_load_stage,
    pickup_status: computePickupStatus(load),
    delivery_status: computeDeliveryStatus(load),
  })) || []; // Ensure rows is an empty array if loadList is undefined

  const columns = [
    { id: 'actions', label: 'Actions', minWidth: 100 },
    { id: 'cpm', label: 'CPM', minWidth: 90 },
    { id: 'customer_load', label: 'Customer Load', minWidth: 120 },
    { id: 'freight_amount', label: 'Freight Amount', minWidth: 120 },
    { id: 'expected_dispatcher', label: 'Planned Dispatcher', minWidth: 120 },
    { id: 'expected_vehicle', label: 'Planned Vehicle', minWidth: 120 },
    { id: 'partner_id', label: 'Partner', minWidth: 100 },
    { id: 'trailer_type', label: 'Equipment Type', minWidth: 120 },
    { id: 'pickup_city', label: 'Pickup City', minWidth: 120 },
    { id: 'pickup_state', label: 'Pickup State', minWidth: 120 },
    { id: 'delivery_city', label: 'Delivery City', minWidth: 120 },
    { id: 'delivery_state', label: 'Delivery State', minWidth: 120 },
    { id: 'planned_start_time', label: 'Planned DateTime Start', minWidth: 120 },
    { id: 'planned_end_time', label: 'Planned DateTime End', minWidth: 120 },
    { id: 'is_archived', label: 'Status', minWidth: 100 },
    { id: 'load_type', label: 'Load Type', minWidth: 120 },
    { id: 'load_comments', label: 'Comments', minWidth: 120 },
    { id: 'sale_agent', label: 'Sale Agent', minWidth: 120 },
    { id: 'pickup_status', label: 'Pickup Status', minWidth: 120 },
    { id: 'delivery_status', label: 'Delivery Status', minWidth: 120 },
    { id: 'odoo_load_stage', label: 'Load Stage', minWidth: 120 },

   // { id: 'weight', label: 'Weight', minWidth: 120 },
    //{ id: 'length', label: 'Length', minWidth: 120 },
  ];

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{
                    minWidth: column.minWidth,
                    border: '1px solid rgba(48, 51, 61, 0.24)',
                    backgroundColor: '#303f69f0',
                    color: 'white !important',
                    fontWeight: 'bold',
                    padding: '5px',
                    lineHeight: '20px'
                  }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleRequestSort(column.id)}
                    sx={{
                      color: 'white',
                      '&.MuiTableSortLabel-root:hover': {
                        color: 'white',
                      },
                      '&.MuiTableSortLabel-root.Mui-active': {
                        color: 'white',
                      },
                      '& .MuiTableSortLabel-icon': {
                        color: 'white !important',
                      },
                    }}
                  >
                    {column.label}
                    {orderBy === column.id ? (
                      <Box component="span" sx={{ visuallyHidden: true }}>
                        {order === 'desc' ? '' : ''}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} sx={{ border: '1px solid #d3d3d3', padding: '5px' }}>
                        {column.id === 'actions' ? (
                          <>
                            {/* <IconButton onClick={() => handleEdit(row.id)} aria-label="edit">
                              <IconEdit />
                            </IconButton> */}
                            {/* <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
                              <IconTrash />
                            </IconButton> */}
                            <IconButton onClick={() => handleRowClick(row.id)} aria-label="detail">
                              <IconEye />
                            </IconButton>
                          </>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[50, 100, 200]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default ListDataGrid;