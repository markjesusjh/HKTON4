import React, { useState, useEffect } from 'react';
import './profile.scss';
import axios from "axios";
import Form from 'devextreme-react/form';
import DataGrid, {
    Column,
    Pager,
    Paging,
    FilterRow,
} from "devextreme-react/data-grid";
import {fetchPersons} from "../../api/dataService";

export default function Profile() {

    const [persons, setPersons] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        fetchPersons();
    }, []);

    const fetchPersons = async () =>{
        try{
            const response = await axios.get("http://localhost:8080/persons");
            setPersons(response.data);
        }catch (error){
            console.error("Error fetching persons",error);
        }
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try{
            await axios.post("http://localhost:8080/persons",{
                name: name
            });
            setName("");
            fetchPersons();
        }catch (error){
            console.error("Error adding person: ",error);
        }

    }

  const [notes, setNotes] = useState(
    'Sandra is a CPA and has been our controller since 2008. She loves to interact with staff so if you`ve not met her, be certain to say hi.\r\n\r\nSandra has 2 daughters both of whom are accomplished gymnasts.'
  );
  const employee = {
    ID: 7,
    FirstName: 'Sandra',
    LastName: 'Johnson',
    Prefix: 'Mrs.',
    Position: 'Controller',
    Picture: 'images/employees/06.png',
    BirthDate: new Date('1974/11/5'),
    HireDate: new Date('2005/05/11'),
    Notes: notes,
    Address: '4600 N Virginia Rd.'
  };

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Profile</h2>

      <div className={'content-block dx-card responsive-paddings'}>
        <div className={'form-avatar'}>
          <img
            alt={''}
            src={`https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/${
              employee.Picture
            }`}
          />
        </div>
        <span>{notes}</span>
      </div>

      <div className={'content-block dx-card responsive-paddings'}>
        <Form
          id={'form'}
          defaultFormData={employee}
          onFieldDataChanged={e => e.dataField === 'Notes' && setNotes(e.value)}
          labelLocation={'top'}
          colCountByScreen={colCountByScreen}
        />
      </div>
    </React.Fragment>
  );
}

const colCountByScreen = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4
};
