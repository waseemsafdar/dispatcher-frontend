import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { fetchloadById, setBackFromDetail } from '../../../store/loadSlice';
import RecommendedLoadForm from './RecommendedLoadForm';
import '@fortawesome/fontawesome-free/css/all.min.css';


const LoadDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loadData, status, error } = useSelector((state) => state.load);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchloadById(id));
    }
  }, [dispatch, id]);

  const handleClick = () => {
    dispatch(setBackFromDetail(true));
    navigate('/dashboard');
  };

  const handleTabChange = (newValue) => {
    console.log('handleTabChange(0)')
    setTabIndex(newValue);
  };

  if (status === 'loading') return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg">Loading...</div>
    </div>
  );
  
  if (status === 'failed') return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg text-red-600">Error: {error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header id="header" className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800">Load Details</h1>
          <div className="flex gap-4">
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={handleClick}
            >
              <i className="fa-solid fa-arrow-left mr-2"></i>Back
            </button>
            {tabIndex === 0 ? (
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => handleTabChange(1)}
              >
                <i className="fa-solid fa-thumbs-up mr-2"></i>Recommend Load
              </button>
            ) : null}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-6">
        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => handleTabChange(0)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                tabIndex === 0
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Load Details
            </button>
            <button
              onClick={() => handleTabChange(1)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                tabIndex === 1
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Recommend Loads
            </button>
          </div>
        </div>

        {tabIndex === 0 && loadData && (
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="col-span-2 space-y-6">
              {/* Basic Load Information */}
              <section className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <i className="fa-solid fa-circle-info text-blue-600 mr-2"></i>
                  Basic Load Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Customer Load ID</label>
                    <input type="text" value={loadData.customer_load || ''} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" readOnly />
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
                    <label className="block text-sm font-medium text-gray-700">Partner</label>
                    <input type="text" value={loadData.partner?.name || ''} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Comments</label>
                    <div className="mt-1">
                      <textarea className="w-full rounded-md border-gray-300 shadow-sm" readOnly value={loadData.load_comments || ''} rows="2"></textarea>
                    </div>
                  </div>
                </div>
              </section>

              {/* Route Information */}
              <section className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <i className="fa-solid fa-route text-blue-600 mr-2"></i>
                  Route Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Origin</label>
                    <input type="text" value={`${loadData.pickup_city}, ${loadData.pickup_state}`} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Destination</label>
                    <input type="text" value={`${loadData.delivery_city}, ${loadData.delivery_state}`} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Planned Start Time</label>
                    <input type="text" value={loadData.planned_start_time || ''} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Planned End Time</label>
                    <input type="text" value={loadData.planned_end_time || ''} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" readOnly />
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
                  {loadData?.delivery_ids?.map((delivery, index) => (
                    <div key={index} className={`flex items-start border-l-4 ${delivery.type === 'Pickup' ? 'border-blue-600' : 'border-green-600'} pl-4 pb-6`}>
                      <div className="w-full">
                        <div className="flex items-center justify-between">
                          <span className={`${delivery.type === 'Pickup' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'} text-sm px-3 py-1 rounded-full`}>
                            Stop {index + 1} - {delivery.type}
                          </span>
                          <span className="text-sm text-gray-500">{delivery.delivery_date}</span>
                        </div>
                        <p className="mt-2 text-gray-700">{delivery.location_id}</p>
                        <div className="mt-1 text-sm text-gray-500">{delivery.delivery_start_time} - {delivery.delivery_end_time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column */}
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
                    <input type="text" value={loadData.load_type || ''} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Trailer Type</label>
                    <input type="text" value={loadData.trailer_type?.map(type => type.type).join(', ') || ''} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Freight Amount</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input type="text" value={loadData.freight_amount || ''} className="pl-7 block w-full rounded-md border-gray-300 shadow-sm" readOnly />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CPM</label>
                    <input type="text" value={loadData.cpm || ''} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Weight (lbs)</label>
                    <input type="text" value={loadData.weight || ''} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Length (Feet)</label>
                    <input type="text" value={loadData.length || ''} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Temperature (°F)</label>
                    <input type="text" value={loadData.temperature || ''} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" readOnly />
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
                    <div className="mt-1 flex items-center">
                      {loadData.expected_dispatcher ? (
                        <span>{loadData.expected_dispatcher}</span>
                      ) : (
                        <span className="text-yellow-600">Awaiting assignment</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Planned Vehicle</label>
                    <div className="mt-1 flex items-center">
                      {loadData.expected_vehicle ? (
                        <span>{loadData.expected_vehicle}</span>
                      ) : (
                        <span className="text-yellow-600">Awaiting assignment</span>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {tabIndex === 1 && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">
              Recommend Load
            </h2>
            <RecommendedLoadForm load_id={id} setTabIndex={setTabIndex} />
          </div>
        )}
      </main>
    </div>
  );
};

export default LoadDetail;