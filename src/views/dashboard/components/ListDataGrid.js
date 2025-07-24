import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteLoadById, getLoad } from '../../../store/loadSlice';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Box, IconButton, CircularProgress } from '@mui/material';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

import { 
  IconAlertCircle, 
  IconCheck, 
  IconCircleCheckFilled, 
  IconClock, 
  IconEdit, 
  IconEye, 
  IconQuestionMark, 
  IconTrash 
} from '@tabler/icons-react';

// Import AG Grid 
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Custom styles for border and header color
const customStyles = `
  /* Header styles with custom color */
  .bordered-table .ag-header {
    border: 1px solid #dde2eb;
    border-bottom: 2px solid #2c395e;
    background-color: #3C4A72 !important;
  }
  
  .bordered-table .ag-header-cell-text {
    color: white !important;
    font-weight: 500;
  }
  
  .bordered-table .ag-header-cell {
    border-right: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .bordered-table .ag-header-icon {
    color: white !important;
  }
  
  .bordered-table .ag-row {
    border-width: 1px;
    border-color: #dde2eb;
  }
  
  .bordered-table .ag-root {
    border: 1px solid #babfc7;
  }
  
  .bordered-table .ag-cell {
    border-right: 1px solid #dde2eb;
  }
  
  /* Make sure pagination controls are visible */
  .bordered-table .ag-paging-panel {
    color: #000;
    height: 50px;
    border-top: 1px solid #dde2eb;
    background-color: #f8f9fa;
  }
`;

const ListDataGrid = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    per_page: 100,
    page: 1,
    total_pages: 1
  });
const gridApiRef = useRef();

  const [isTableLoading, setIsTableLoading] = useState(true);

  const { loadList, status, error, filters } = useSelector((state) => state.load);

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

  const computePickupStatus = (load) => {
    const { delivery_ids } = load;
    
    // Find the first delivery with type "pick up"
    const pickupDelivery = delivery_ids?.find(delivery => delivery.type == 'Pickup');
     
    
    if (!pickupDelivery) {
      // No pickup delivery found
      return {
        icon: <IconQuestionMark style={{ color: 'gray' }} />,
        text: 'Unknown',
        color: 'gray'
      };
    }
  
    // Use the status of the pickup delivery
    if (pickupDelivery.stop_status == true) {
      return {
        icon: <IconCircleCheckFilled style={{ color: 'green' }} />,
        text: 'On Time',
        color: 'green'
      };
    } else {
      if (pickupDelivery.stop_status == false) {
        return {
          icon: <IconAlertCircle style={{ color: 'red' }} />,
          text: 'Late',
          color: 'red'
        };
      } else {
        return {
          icon: null,
          text: '-',
          color: 'gray'
        };
      }
    }
  };

  const computeDeliveryStatus = (load) => {
    const { delivery_ids, odoo_load_stage } = load;
  
    const deliveryRecord = delivery_ids?.find(delivery => delivery.type == 'Delivery');
    
    if (!deliveryRecord) {
      // No delivery found
      return {
        icon: <IconQuestionMark style={{ color: 'gray' }} />,
        text: 'Pending',
        color: 'gray'
      };
    }
  
    // Use the status of the delivery
    if (deliveryRecord.stop_status == true) {
      return {
        icon: <IconCircleCheckFilled style={{ color: 'green' }} />,
        text: 'Delivered',
        color: 'green'
      };
    } else {
      if (deliveryRecord.stop_status == false) {
        return {
          icon: <IconClock style={{ color: 'orange' }} />,
          text: 'Late',
          color: 'orange'
        };
      } else {
        return {
          icon: null,
          text: '-',
          color: 'gray'
        };
      }
    }
  };

  // AG Grid Column Definitions
  const columnDefs = useMemo(() => [
    {
      headerName: 'Actions',
      field: 'actions',
      width: 100,
      sortable: false,
      filter: false,
      cellRenderer: params => {
        return (
          <div>
            <IconButton onClick={() => handleRowClick(params.data.id)} aria-label="detail">
              <IconEye />
            </IconButton>
          </div>
        );
      }
    },
    { headerName: 'CPM', field: 'cpm', width: 90, sortable: true, filter: true },
    { headerName: 'Customer Load', field: 'customer_load', width: 150, sortable: true, filter: true },
    { headerName: 'Freight Amount', field: 'freight_amount', width: 150, sortable: true, filter: true },
    { headerName: 'Planned Dispatcher', field: 'expected_dispatcher', width: 180, sortable: true, filter: true },
    { headerName: 'Planned Vehicle', field: 'expected_vehicle', width: 150, sortable: true, filter: true },
    { headerName: 'Partner', field: 'partner_id', width: 200, sortable: true, filter: true },
    { headerName: 'Equipment Type', field: 'trailer_type', width: 200, sortable: true, filter: true },
    { headerName: 'Pickup City', field: 'pickup_city', width: 150, sortable: true, filter: true },
    { headerName: 'Pickup State', field: 'pickup_state', width: 120, sortable: true, filter: true },
    { headerName: 'Delivery City', field: 'delivery_city', width: 150, sortable: true, filter: true },
    { headerName: 'Delivery State', field: 'delivery_state', width: 120, sortable: true, filter: true },
    { headerName: 'Planned DateTime Start', field: 'planned_start_time', width: 200, sortable: true, filter: true },
    { headerName: 'Planned DateTime End', field: 'planned_end_time', width: 200, sortable: true, filter: true },
    { 
      headerName: 'Status', 
      field: 'is_archived', 
      width: 120, 
      sortable: true, 
      filter: true,
      cellRenderer: params => {
        return params.value === 'Covered' ? params.value : <span style={{ color: "orange" }}>Open</span>;
      }
    },
    { headerName: 'Load Type', field: 'load_type', width: 150, sortable: true, filter: true },
    { headerName: 'Comments', field: 'load_comments', width: 200, sortable: true, filter: true },
    { headerName: 'Sale Agent', field: 'sale_agent', width: 150, sortable: true, filter: true },
    { 
      headerName: 'Pickup Status', 
      field: 'pickup_status', 
      width: 160, 
      sortable: true, 
      filter: true,
      cellRenderer: params => {
        const status = params.value;
        if (!status) return '-';
        return (
          <div style={{ display: 'flex', alignItems: 'center', color: status.color }}>
            {status.icon}
            <span style={{ marginLeft: '8px' }}>{status.text}</span>
          </div>
        );
      }
    },
    { 
      headerName: 'Delivery Status', 
      field: 'delivery_status', 
      width: 160, 
      sortable: true, 
      filter: true,
      cellRenderer: params => {
        const status = params.value;
        if (!status) return '-';
        return (
          <div style={{ display: 'flex', alignItems: 'center', color: status.color }}>
            {status.icon}
            <span style={{ marginLeft: '8px' }}>{status.text}</span>
          </div>
        );
      }
    },
    { headerName: 'Load Stage', field: 'odoo_load_stage', width: 150, sortable: true, filter: true },
    { headerName: 'Appointment TYpe', field: 'appointment_type', width: 150, sortable: true, filter: true },

  ], []);

  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    filter: true,
    autoHeight: true
  }), []);

  // AG Grid onGridReady event handler
  const onGridReady = (params) => {
  gridApiRef.current = params.api;
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    
    // Add the style element for borders and header color
    const styleElement = document.createElement('style');
    styleElement.innerHTML = customStyles;
    document.head.appendChild(styleElement);
    
    // Resize columns on window resize
    window.addEventListener('resize', () => {
      setTimeout(() => {
        params.api.sizeColumnsToFit();
      });
    });
  };

  // Function to auto-size columns to fit content
  const sizeToFit = () => {
    if (gridColumnApi) {
      gridColumnApi.autoSizeAllColumns();
    }
  };

  useEffect(() => {
    dispatch(getLoad(filters)).then(({ payload: { data, total, page,per_page, total_pages} }) => {
      console.log('Data loaded:', total,data);
      setIsTableLoading(false);
      // Add pagination state
      setPagination({
        total,
        per_page,
        page,
        total_pages
      });
    })
    setIsTableLoading(true);
  }, [dispatch, filters]);
const mapLoadToRow = (load) => ({
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
  is_archived: load?.is_archived ? 'Covered' : 'Open',
  trailer_type: Array.isArray(load.trailer_type)
    ? load.trailer_type.map(t => t.type).join(', ')
    : (load.trailer_type ?? ''),
  load_type: load?.load_type,
  load_comments: load?.load_comments,
  sale_agent: load?.sale_agent,
  temperature: load?.temperature,
  odoo_load_stage: load?.odoo_load_stage,
  appointment_type: load?.appointment_type,
  pickup_status: computePickupStatus(load),
  delivery_status: computeDeliveryStatus(load),
});

const normalize = (rows) => rows.map(mapLoadToRow);

  useEffect(() => {
    console.log('Load list updated:', loadList);
    if (loadList && loadList.data && loadList.data.length > 0) {
     setRowData(normalize(loadList.data));
      setIsTableLoading(false);
      
      // After data is loaded, size columns
      if (gridApi && gridColumnApi) {
        setTimeout(() => {
          sizeToFit();
        }, 100);
      }
    }
  }, [loadList, gridApi, gridColumnApi]);

  const fetchLoadData = async (page = 1, perPage = pagination.per_page) => {
  setIsTableLoading(true);
  const { payload: { data, total, page: currentPage, per_page, total_pages } } =
    await dispatch(getLoad({ filters, perPage, page }));

      setRowData(normalize(data));

  setPagination({
    total,
    page: currentPage,
    per_page,
    total_pages
  });
  setIsTableLoading(false);
};



  function OnChangePage(newPerPage) { 
    setPagination(prev => ({
    ...prev,
    per_page: newPerPage,
  }));
  console.log('Dispatching with:', filters, pagination.per_page, pagination.page);
  fetchLoadData(pagination.page,newPerPage);
    
  }
  // If still loading and no grid API yet, show loading spinner
  if (status === 'loading' && !gridApi) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <Box 
      className="ag-theme-alpine bordered-table" 
      sx={{ 
        width: '100%',
        height: 'calc(100vh - 200px)', 
        minHeight: '500px',
        position: 'relative',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        border: '1px solid #dde2eb',
        borderRadius: '4px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {isTableLoading && (
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99
        }}>
          <CircularProgress />
        </Box>
      )}
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        onGridReady={onGridReady}
        pagination={false}
        paginationPageSize={100}
        paginationPageSizeSelector={[25,50, 100,300,500,700,1000]}
        suppressCellFocus={true}
        enableCellTextSelection={true}
        headerHeight={40}
        rowHeight={40}
        domLayout="normal"
        suppressHorizontalScroll={false}
        suppressScrollOnNewData={false}
        // onPaginationChanged={onPaginationChanged}
        // onPaginationPageSizeChanged={onPaginationChanged}
        onFirstDataRendered={sizeToFit}
      />
      <div className="custom-grid-footer flex items-center justify-between mt-3 px-2.5 pb-2.5">
  {/* Page Info + Buttons */}
  <div className="flex items-center space-x-2">
    <button
      className="px-2 py-1 border rounded disabled:opacity-50"
      disabled={pagination.page <= 1}
      onClick={() => fetchLoadData(pagination.page - 1, pagination.per_page)}
    >
      Prev
    </button>
    <span>Page {pagination.page} of {pagination.total_pages}</span>
    <button
      className="px-2 py-1 border rounded disabled:opacity-50"
      disabled={pagination.page >= pagination.total_pages}
      onClick={() => fetchLoadData(pagination.page + 1, pagination.per_page)}
    >
      Next
    </button>
  </div>

  {/* Page Size Selector */}
  <div>
    <select
      value={pagination.per_page}
      onChange={e => OnChangePage(Number(e.target.value))}
      className="border rounded p-1"
    >
      {[50,100,200,300, 400,500, 700, 1000].map(size => (
        <option key={size} value={size}>
          {size} per page
        </option>
      ))}
    </select>
  </div>
</div>

    </Box>
  );
};

export default ListDataGrid;