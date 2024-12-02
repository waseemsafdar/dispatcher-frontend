import React from 'react';

const Dashboard = () => {
    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Dashboard</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="row">
                <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                    <div className="sidebar-sticky">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">
                                    Dashboard
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Orders
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Products
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Dashboard</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">Box 1</h5>
                                    <p className="card-text">Some content for box 1.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">Box 2</h5>
                                    <p className="card-text">Some content for box 2.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2>List</h2>
                    <ul className="list-group mb-4">
                        <li className="list-group-item">Item 1</li>
                        <li className="list-group-item">Item 2</li>
                        <li className="list-group-item">Item 3</li>
                        <li className="list-group-item">Item 4</li>
                        <li className="list-group-item">Item 5</li>
                    </ul>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
