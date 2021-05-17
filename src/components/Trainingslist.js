import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddTraining from './AddTraining';
import Customerlist from './Customerlist';
import moment from 'moment';


function Trainingslist() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteTrainings = (id) => {
        if(window.confirm('Are you sure?')) {
        fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, { method: 'DELETE' })
        .then(response => {
            if(response.ok) {
                fetchTrainings();
            }
            else {
                alert('Something went wrong');
            }
        })
        .catch(err => console.log(err))
    }
}

    const columns = [
        { field: 'date', sortable: true, filter: true,
        valueFormatter: function (params) {
            return moment (params.value).format ('DD-MM-YYYY');
        } },
        { field: 'duration', sortable: true, filter: true },
        { field: 'activity', sortable: true, filter: true },
        { field: 'customer.firstname', sortable: true, filter: true },
        { field: 'customer.lastname', sortable: true, filter: true },
        { 
            headerName: '',
            field:  'id',
            width: 100,
            cellRendererFramework: params => <IconButton color="secondary" 
            onClick={() => deleteTrainings(params.value)}><DeleteIcon /></IconButton>
        }
    ]

return(
    <div>
         <div className='ag-theme-material' style={{ height: 600, width: '90%', margin: 'auto' }}>
                    <AgGridReact
                        rowData={trainings}
                        columnDefs={columns}
                        pagination={true}
                        paginationPageSize={10}
                        floatingFilter={true}
                        suppressCellSelection={true}
                    />
        </div>
    </div>

    )
}

export default Trainingslist;