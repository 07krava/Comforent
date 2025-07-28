import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { TextField, Button, IconButton } from '@mui/material';
import HeaderRegister from '../components/Registration/HeaderRegister/HeaderRegister'
import DeleteIcon from '@mui/icons-material/Delete';
import UploadImage from '../assets/img/—Pngtree—file upload icon_4717174.png';

const AddHousingButton = styled(Button)(({ theme }) => ({
  background: '#1e90ff',
  marginTop: '10px',
  width: '300px',
  color: '#fff',
  fontFamily: 'Montserrat',
  textTransform: 'none',
  '&:hover': {
    background: '#1c86ee',
  }
}))

const UploadButton = styled('div')(({ theme }) => ({
  border: '1px solid #d1d0d0',
  width: '280px',
  height: '40px',
  borderRadius: '5px',
  marginTop: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left', // Align content to the left
  padding: '0 10px',
  cursor: 'pointer',
  '&:hover': {
    border: '1px solid black',
  },
}))

const FormStyle = styled('form')(({ theme }) => ({
  width: '320px',
  maxWidth: '400px',
  height: '500px',
  right: '-760px',
  position: 'relative',
  top: '50px',
  display: 'flex',
  flexDirection: 'column',
  padding: '0px',
}))

const TextFieldStyle = styled(TextField)(({ theme }) => ({
  width: '300px',
  marginBottom: '15px',
  '& .MuiInputBase-root': {
    height: '40px',
    top: '7px',
  },
}))

export default function RentOutPage () {

  const [selectedFiles, setSelectedFiles] = useState([]);

  const [housingData, setHousingData] = useState({
    title: '',
    description: '',
    maxAmountPeople: null,
    beds: null,
    bedRooms: null,
    bathRooms: null,
    price: null,
    housingType: '',
    active: true,
    location: {
      country: '',
      region: '',
      city: '',
      street: '',
      houseNumber: '',
      apartmentNumber: '',
      zipCode: '',
    },
    file: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHousingData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setHousingData((prevState) => ({
      ...prevState,
      location: {
        ...prevState.location,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    })));
  };

  const handleDelete = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  return (
    <div>
      <HeaderRegister />
      <div style={{ flex: 0.5, marginLeft: "-300px" }}>
        <FormStyle >
          <h1>Housing</h1>
          <TextFieldStyle
            type='text'
            name='title'
            placeholder="Title"
            value={housingData.title}
            onChange={handleChange}
          >
          </TextFieldStyle>

          <TextFieldStyle
            type='text'
            name='description'
            placeholder="Description"
            value={housingData.description}
            onChange={handleChange}
          >
          </TextFieldStyle>

          <TextFieldStyle
            type='number'
            name='price'
            placeholder="Price"
            value={housingData.price}
            onChange={handleChange}
          >
          </TextFieldStyle>

          <TextFieldStyle
            type='number'
            name='maxAmountPeople'
            placeholder="Max amount people"
            value={housingData.maxAmountPeople}
            onChange={handleChange}
          >
          </TextFieldStyle>

          <TextFieldStyle
            type='number'
            name='beds'
            placeholder="Beds"
            value={housingData.beds}
            onChange={handleChange}
          >
          </TextFieldStyle>

          <TextFieldStyle
            type='number'
            name='bedRooms'
            placeholder="Bed rooms"
            value={housingData.bedRooms}
            onChange={handleChange}
          >
          </TextFieldStyle>

          <TextFieldStyle
            type='number'
            name='bathRooms'
            placeholder="Bath rooms"
            value={housingData.bathRooms}
            onChange={handleChange}
          >
          </TextFieldStyle>

          <TextFieldStyle
            type='text'
            name='housingType'
            placeholder="Housing Type"
            value={housingData.housingType}
            onChange={handleChange}
          >
          </TextFieldStyle>
        </FormStyle>
      </div>

      <div style={{
        flex: 1,
        marginLeft: "100px",
        marginTop: '-500px'
      }}>
        <FormStyle>
          <h1>Location</h1>
          <TextFieldStyle
            type='text'
            name='country'
            placeholder="Country"
            value={housingData.location.country}
            onChange={handleLocationChange}
          >
          </TextFieldStyle>

          <TextFieldStyle
            type='text'
            name='region'
            placeholder="Region"
            value={housingData.location.region}
            onChange={handleLocationChange}
          >
          </TextFieldStyle>

          <TextFieldStyle
            type='text'
            name='city'
            placeholder="City"
            value={housingData.location.city}
            onChange={handleLocationChange}
          >
          </TextFieldStyle>

          <TextFieldStyle
            type='text'
            name='street'
            placeholder="Street"
            value={housingData.location.street}
            onChange={handleLocationChange}
          >
          </TextFieldStyle>

          <TextFieldStyle
            type='number'
            name='houseNumber'
            placeholder="House number"
            value={housingData.location.houseNumber}
            onChange={handleLocationChange}
          >
          </TextFieldStyle>

          <TextFieldStyle
            type='number'
            name='apartmentNumber'
            placeholder="Apartment number"
            value={housingData.location.apartmentNumber}
            onChange={handleLocationChange}
          >
          </TextFieldStyle>

          <TextFieldStyle
            type='text'
            name='zipCode'
            placeholder="Post code"
            value={housingData.location.zipCode}
            onChange={handleLocationChange}
          >
          </TextFieldStyle>

          <div>
            <UploadButton >
              <label htmlFor="upload-button" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', }}>
                <img
                  src={UploadImage}
                  alt="Upload"
                  style={{ 
                    width: '50px', 
                    height: '50px', 
                    cursor: 'pointer', 
                    marginTop: '1px', 
                  }}/>
                <span style={{
                  flexGrow: 1, 
                  textAlign: 'left', 
                  marginLeft: '10px', 
                  }}
                  >
                    Select a photo of housing
                    </span>
              </label>
              <input
                id="upload-button"
                type="file"
                multiple
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </UploadButton>

            {selectedFiles.map((file, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <TextFieldStyle
                  value={file.name}
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <IconButton onClick={() => handleDelete(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
          </div>

          <AddHousingButton>Create housing</AddHousingButton>
        </FormStyle>
      </div>
    </div>
  )
}
