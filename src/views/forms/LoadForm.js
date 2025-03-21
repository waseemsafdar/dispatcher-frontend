import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDispatchers, fetchPartner, fetchTrailer } from '../../store/partnerSlice';
import { fetchloadById, resetStatus, saveLoad, updateLoad, restLoad } from '../../store/loadSlice';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';
import DeliveryFormRow from './DeliveryForm';
import '@fortawesome/fontawesome-free/css/all.min.css';

const validationSchema = Yup.object({
  customer_load: Yup.string().required('Required'),
  partner_name: Yup.string(),
  expected_dispatcher: Yup.string().required('Required'),
  trailerType: Yup.array().min(1, 'At least one trailer type is required').required('Required'),
  freight_amount: Yup.number().required('Required').positive('Must be positive'),
  cpm: Yup.number().required('Required').positive('Must be positive'),
  expected_vehicle: Yup.string().required('Required'),
});

const LoadForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tarilerData, partnerData, dispatchersData } = useSelector((state) => state.partners);
  const { loadData } = useSelector((state) => state.load);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPartner());
    dispatch(fetchTrailer());
    dispatch(fetchDispatchers());
  }, [dispatch]);

  const handleResetLoad = () => {
    console.log('Resetting load...');
    dispatch(restLoad({id}))
    .unwrap().then(() => {
      formik.resetForm();
      toast.success('Updated successfully!');
      navigate('/dashboard');
    }).catch((err) => {
      toast.error('Failed to update');
    });
    setResetDialogOpen(false);
  }

  const handleResetDialogOpen = () => {
    setResetDialogOpen(true);
  };

  const handleResetDialogClose = () => {
    setResetDialogOpen(false);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchloadById(id)).then((action) => {
        const data = action.payload;
        formik.setValues({
          customer_load: data?.customer_load || '',
          partner_id: data?.partner.id || '',
          partner_name: data?.partner.name || '',
          expected_dispatcher: data?.expected_dispatcher || '',
          trailerType: data?.trailer_type.map(t => t.id) || [],
          freight_amount: data?.freight_amount || '',
          cpm: data?.cpm || '',
          expected_vehicle: data?.expected_vehicle || '',
          pickup_city: data?.pickup_city || '',
          pickup_state: data?.pickup_state || '',
          delivery_city: data?.delivery_city || '',
          delivery_state: data?.delivery_state || '',
          planned_start_time: data?.planned_start_time || '',
          planned_end_time: data?.planned_end_time || '',
          load_type: data?.load_type || '',
          temperature: data?.temperature || '',
          weight: data?.weight || '',
          length: data?.length || '',
          load_comments: data?.load_comments || '',
          odoo_load_stage: data?.odoo_load_stage || '',
          owner_operator_rate: data?.owner_operator_rate || 0,
          company_driver_rate: data?.company_driver_rate || 0,
          status: data?.is_archived ? 'Covered' : 'Open',
          
        });
        setDeliveryForms(
          data?.delivery_ids?.map((delivery, index) => ({
            id: index + 1,
            data: delivery,
          })) || []
        );
      });
    }
  }, [id, dispatch]);

  const [deliveryForms, setDeliveryForms] = useState([{ id: 1, data: {} }]);
  const addDeliveryRow = () => setDeliveryForms([...deliveryForms, { id: deliveryForms.length + 1, data: {} }]);
  const deleteDeliveryRow = (id) => setDeliveryForms(deliveryForms?.filter(form => form.id !== id));

  const handleFormChange = (id, updatedData) => {
    setDeliveryForms(deliveryForms.map(form => (form.id === id ? { ...form, data: updatedData } : form)));
  };

  const formik = useFormik({
    initialValues: {
      customer_load: '',
      partner_name: '',
      expected_dispatcher: '',
      trailerType: [],
      freight_amount: '',
      cpm: '',
      expected_vehicle: '',
      pickup_city: '',
      pickup_state: '',
      delivery_city: '',
      delivery_state: '',
      planned_start_time: '',
      planned_end_time: '',
      load_type: '',
      temperature: '',
      weight: '',
      length: '',
      odoo_load_stage: '',
      load_comments: '',
      company_driver_rate: 0,
      owner_operator_rate: 0
    },
    //validationSchema: validationSchema,
    onSubmit: (values) => {
      const loadData = { ...values, delivery_info: deliveryForms?.map(form => form.data) };
      console.log('Load Form Data:', loadData);
      if (id) {
        dispatch(updateLoad({ id, loadData }))
          .unwrap().then(() => {
            formik.resetForm();
            toast.success('Updated successfully!');
            navigate('/dashboard');
          }).catch((err) => {
            toast.error('Failed to update');
          });
      } else {
        dispatch(saveLoad(loadData))
          .unwrap().then(() => {
            toast('Load saved successfully');
            formik.resetForm();
            navigate('/dashboard');
            setDeliveryForms([{ id: 1, data: {} }]);
            dispatch(resetStatus());
          })
          .catch((err) => {
            toast('Failed to save load', err);
            dispatch(resetStatus());
          });
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Reset Load Confirmation Dialog */}
      {resetDialogOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Reset Load Confirmation
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to reset the dispatcher and truck assigment for this load? This action will make load available again and can not be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  onClick={handleResetLoad}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Yes, Reset
                </button>
                <button 
                  type="button" 
                  onClick={handleResetDialogClose}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header id="header" className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800">Update Load</h1>
          <div className="flex gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              onClick={handleResetDialogOpen}
            >
              <i className="fa-solid fa-arrow-rotate-left mr-2"></i>Reset Load Assignment
            </button>
            <button
              type="submit"
              form="load-form"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <i className="fa-solid fa-save mr-2"></i>Save Load
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-6">
        <form id="load-form" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column (2/3 width on large screens) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Load Information */}
              <section className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <i className="fa-solid fa-circle-info text-blue-600 mr-2"></i>
                  Basic Load Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Partner</label>
                    <input
                      type="text"
                      id="partner_name"
                      name="partner_name"
                      disabled
                      value={formik.values.partner_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                    />
                    {formik.touched.partner_name && formik.errors.partner_name && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.partner_name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <div className="mt-1 flex items-center">
                    <span className={`px-3 py-1 rounded-full text-sm ${loadData.is_archived ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {loadData.is_archived ? 'Covered' : 'Open'}
                      </span>
                    
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Customer Load Number</label>
                    <input
                      type="text"
                      id="customer_load"
                      name="customer_load"
                      disabled
                      value={formik.values.customer_load}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                    />
                    {formik.touched.customer_load && formik.errors.customer_load && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.customer_load}</p>
                    )}
                  </div>
                 
                  
                </div>
              </section>

              {/* Route Information */}
              <section className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <i className="fa-solid fa-route text-blue-600 mr-2"></i>
                  Route Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Origin</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="pickup_city"
                        name="pickup_city"
                        disabled
                        value={`${formik.values.pickup_city}, ${formik.values.pickup_state}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                      />
                      
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Destination</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="delivery_city"
                        name="delivery_city"
                        disabled
                        value={`${formik.values.delivery_city}, ${formik.values.delivery_state}`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                      />
                      
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Planned Start Time</label>
                    <input
                      type="text"
                      id="planned_start_time"
                      name="planned_start_time"
                      disabled
                      value={formik.values.planned_start_time}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                    />
                    {formik.touched.planned_start_time && formik.errors.planned_start_time && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.planned_start_time}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Planned End Time</label>
                    <input
                      type="text"
                      id="planned_end_time"
                      name="planned_end_time"
                      disabled
                      value={formik.values.planned_end_time}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                    />
                    {formik.touched.planned_end_time && formik.errors.planned_end_time && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.planned_end_time}</p>
                    )}
                  </div>
                </div>
              </section>

              {/* Stops Timeline */}
              <section className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <i className="fa-solid fa-timeline text-blue-600 mr-2"></i>
                  Stops Timeline
                </h2>
                <div className="space-y-4">
                  {deliveryForms?.map((form, index) => (
                    <div key={form.id} className={`flex items-start border-l-4 ${form.data.type === 'Pickup' ? 'border-blue-600' : 'border-green-600'} pl-4 pb-6`}>
                      <div className="w-full">
                        <div className="flex items-center justify-between">
                          <span className={`${form.data.type === 'Pickup' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'} text-sm px-3 py-1 rounded-full`}>
                            Stop {index + 1} - {form.data.type || "Unknown"}
                          </span>
                          <span className="text-sm text-gray-500">{form.data.delivery_date || "No date"}</span>
                        </div>
                        <p className="mt-2 text-gray-700">{form.data.location_id || "No location"}</p>
                        <div className="mt-1 text-sm text-gray-500">
                          {form.data.delivery_start_time || "No start time"} - {form.data.delivery_end_time || "No end time"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

             
            </div>

            {/* Right Column (1/3 width on large screens) */}
            <div className="space-y-6">
              {/* Load Specifications */}
              <section className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <i className="fa-solid fa-box text-blue-600 mr-2"></i>
                  Load Specifications
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Load Type</label>
                    <input
                      type="text"
                      id="load_type"
                      name="load_type"
                      disabled
                      value={formik.values.load_type}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                    />
                    {formik.touched.load_type && formik.errors.load_type && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.load_type}</p>
                    )}
                  </div>
                  <div>
  <label className="block text-sm font-medium text-gray-700">Trailer Type</label>
  <input
    type="text"
    disabled
    value={
      formik.values.trailerType && tarilerData
        ? tarilerData
            .filter(trailer => formik.values.trailerType.includes(trailer.id))
            .map(trailer => trailer.type)
            .join(', ')
        : ''
    }
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
  />
  {formik.touched.trailerType && formik.errors.trailerType && (
    <p className="mt-1 text-sm text-red-600">{formik.errors.trailerType}</p>
  )}
</div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Freight Amount</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        id="freight_amount"
                        name="freight_amount"
                        disabled
                        value={formik.values.freight_amount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="pl-7 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                      />
                    </div>
                    {formik.touched.freight_amount && formik.errors.freight_amount && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.freight_amount}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CPM</label>
                    <input
                      type="number"
                      id="cpm"
                      name="cpm"
                      disabled
                      value={formik.values.cpm}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                    />
                    {formik.touched.cpm && formik.errors.cpm && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.cpm}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Weight (lbs)</label>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      disabled
                      value={formik.values.weight}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                    />
                    {formik.touched.weight && formik.errors.weight && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.weight}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Length (Feet)</label>
                    <input
                      type="number"
                      id="length"
                      name="length"
                      disabled
                      value={formik.values.length}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                    />
                    {formik.touched.length && formik.errors.length && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.length}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Temperature (°F)</label>
                    <input
                      type="number"
                      id="temperature"
                      name="temperature"
                      disabled
                      value={formik.values.temperature}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                    />
                    {formik.touched.temperature && formik.errors.temperature && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.temperature}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Load Stage</label>
                    <select
                      id="odoo_load_stage"
                      name="odoo_load_stage"
                      value={formik.values.odoo_load_stage || ''}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    >
                      <option value="">None</option>
                      <option value="Planned">Planned</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Invoiced">Invoiced</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    {formik.touched.odoo_load_stage && formik.errors.odoo_load_stage && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.odoo_load_stage}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rate For Owner Operator</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        id="owner_operator_rate"
                        name="owner_operator_rate"
                        value={formik.values.owner_operator_rate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="pl-7 block w-full rounded-md border-gray-300 shadow-sm"
                      />
                    </div>
                    {formik.touched.owner_operator_rate && formik.errors.owner_operator_rate && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.owner_operator_rate}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rate For Company Driver</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        id="company_driver_rate"
                        name="company_driver_rate"
                        value={formik.values.company_driver_rate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="pl-7 block w-full rounded-md border-gray-300 shadow-sm"
                      />
                    </div>
                    {formik.touched.company_driver_rate && formik.errors.company_driver_rate && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.company_driver_rate}</p>
                    )}
                  </div>
                </div>
              </section>

              {/* Logistics Planning */}
              <section className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <i className="fa-solid fa-users text-blue-600 mr-2"></i>
                  Logistics Planning
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Planned Dispatcher</label>
                    <select
                      id="expected_dispatcher"
                      name="expected_dispatcher"
                      value={formik.values.expected_dispatcher}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    >
                      <option value="">Select Dispatcher</option>
                      {dispatchersData?.map((dispatcher) => (
                        <option key={dispatcher?.id} value={dispatcher?.name}>{dispatcher?.name}</option>
                      ))}
                    </select>
                    {formik.touched.expected_dispatcher && formik.errors.expected_dispatcher && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.expected_dispatcher}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Planned Vehicle</label>
                    <input
                      type="text"
                      id="expected_vehicle"
                      name="expected_vehicle"
                      value={formik.values.expected_vehicle}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {formik.touched.expected_vehicle && formik.errors.expected_vehicle && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.expected_vehicle}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Load Comments</label>
                    <textarea
                      id="load_comments"
                      name="load_comments"
                      rows="2"
                      value={formik.values.load_comments}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    ></textarea>
                    {formik.touched.load_comments && formik.errors.load_comments && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.load_comments}</p>
                    )}
                  </div>

                  
                </div>
              </section>

              {/* Submit Button (Mobile Only) */}
              <div className="lg:hidden">
                <button 
                  type="submit" 
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <i className="fa-solid fa-save mr-2"></i>Save Load
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default LoadForm;