import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import Snackbar from '@material-ui/core/Snackbar';
import AddTraining from './AddTraining';
import Button from '@material-ui/core/Button';
import Trainingslist from './Trainingslist';


function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    const openSnackBar = () => {
        setOpen(true);
    }

    const closeSnackBar = () => {
        setOpen(false);
    }

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (url) => {
        console.log(url)
        if(window.confirm('Are you sure?')) {
            console.log(url)
        fetch(url, { method: 'DELETE' })
        .then(response => {
            if(response.ok) {
                fetchCustomers();
                openSnackBar();
            }
            else {
                alert('Something went wrong');
            }
        })
        .catch(err => console.log(err))
    }
    }

    const addCustomer = newCustomer => {
        fetch('https://customerrest.herokuapp.com/api/customers',
        {
            method: 'POST',
            body: JSON.stringify(newCustomer),
            headers: { 'Content-type' : 'application/json' }
        })
        .then(response => fetchCustomers())
        .catch(err => console.error(err))
    
    }

    const updateCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(updatedCustomer),
            headers: { 'Content-type' : 'application/json' }
        })
        .then(_  => fetchCustomers())
        .catch(err => console.error(err))
    }

    const addTraining = newTraining => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
        {
            method: 'POST',
            body: JSON.stringify(newTraining),
            headers: { 'Content-type' : 'application/json' }
        })
        .then(response => fetchTrainings())
        .catch(err => console.error(err))

    }


    const columns = [
        { field: 'firstname', sortable: true, filter: true },
        { field: 'lastname', sortable: true, filter: true },
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true },
        { field: 'city', sortable: true, filter: true },
        { field: 'email', sortable: true, filter: true },
        { field: 'phone', sortable: true, filter: true },
        { 
            headerName: '',
            field: 'links.0.href',
            width: 100,
            cellRendererFramework: params => <EditCustomer link={params.value} customer={params.data} updateCustomer={updateCustomer}/>
        },
        { 
            headerName: '',
            field:  'links.0.href',
            width: 100,
            cellRendererFramework: params => <IconButton color="secondary" 
            onClick={() => deleteCustomer(params.value)}><DeleteIcon /></IconButton>
        },
        { 
            headerName: '',
            field:  'links.0.href',
            width: 200,
            cellRendererFramework: params => <AddTraining link={params.value} training={params.data} addTraining={addTraining} />
        }
    ]

return(
    <div>
        <AddCustomer addCustomer={addCustomer}/>
         <div className='ag-theme-material' style={{ height: 600, width: '90%', margin: 'auto' }}>
                    <AgGridReact
                        rowData={customers}
                        columnDefs={columns}
                        pagination={true}
                        paginationPageSize={10}
                        floatingFilter={true}
                        suppressCellSelection={true}
                    />
        </div>
        <Snackbar 
                    open={open}
                    message="Customer deleted"
                    autoHideDuration={3000}
                    onClose={closeSnackBar}

                />
    </div>

    )
}

export default Customerlist;