import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  TextField, Button,
  Grid, IconButton,
  FormControlLabel,
  InputAdornment,
  Autocomplete,
  MenuItem,
  Paper,
  Box,
  Typography,
  FormControl
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeckIcon from '@mui/icons-material/Deck';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Switch from '@mui/material/Switch';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const BlueRemoveIcon = styled(RemoveIcon)({
  color: 'blue ',
});


// Пример данных для часто вводимых запросов
const frequentQueries = [
  'Hotel in New York',
  'Flight to Paris',
  'Vacation in Bali',
  'Restaurant in Tokyo',
  'Beach Resort in Miami',
];

// Стили для выпадающего меню
const CustomPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '4px',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(1),
}));

const CountPeopleButton = styled(Button)(({ theme }) => ({
  width: '80%',
  margin: '10px',
  right: '-15px',
  height: '30px',
  bottom: '15px',
  fontFamily: 'Montserrat',
  fontSize: '15px',
  textTransform: 'none',
  borderColor: '#1e90ff',
  color: '#1e90ff',
}));

const FormContainer = styled(Grid)(({ theme }) => ({
  borderColor: 'orange',
  borderTopLeftRadius: '10px',
  borderBottomLeftRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  margin: '50px auto',
  padding: '20px',
  width: '100%',
  maxWidth: '1200px',
}));

const PeopleTextField = styled(Select)(({ theme }) => ({
  left: '0px',
  width: '256px',
  top: '1px',
  height: '55px',
  fontFamily: 'Montserrat',
  background: '#fff',
  borderRadius: '5px',
  transform: 'none',
  '&:hover': {
    transform: 'none', // Убираем любые трансформации
  },

}));

const FirstTextField = styled(TextField)(({ theme }) => ({
  right: '3px',
  border: '3px solid orange',
  borderRadius: '10px',
  top: '-2px',
  background: '#fff',
  fontFamily: 'Montserrat',
  height: '55px',
  '& .MuiInputLabel-root': {
    transform: 'translate(70px, 15px) scale(1)',
    transition: 'transform 0.1s ease-out',
    fontSize: '1.2rem',
    color: '#222',
  },
  '& .MuiInputBase-root': {
    paddingLeft: '20px', // Space for icon
  },
  '& .MuiInputLabel-shrink': {
    transform: 'translate(0, -7px) scale(0.75)',
    fontSize: '1rem',
    left: '15px',
  },
  '& .MuiInputBase-input': {
    color: 'black',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: `1px solid red`,
      borderTopLeftRadius: '6px',
      borderBottomLeftRadius: '6px',
      borderTopRightRadius: '6px',
      borderBottomRightRadius: '6px',
    },
  },
}));

const CustomPickerDate = styled(DatePicker)(({ theme }) => ({
  border: `none`,
  width: '210px',
  padding: '20.5px',
  background: '#fff',
  borderRadius: '5px',
  marginLeft: '-3px',
  fontFamily: 'Montserrat',
  height: '14px',
  fontSize: '17px',
  position: 'relative',
  transition: 'border-color 0.0s ease-in-out', // Плавный переход
  '&:hover': {
    border: '1px solid red', // Красная рамка при наведении
    top: '-1px',
  },

  '&:focus': {
    outline: 'none', // Уберите стандартное выделение фокуса, если нужно
  },
}));

const StyledDiv = styled('div')(({ theme }) => ({
  border: '1px solid orange',
  position: 'relative',
  width: '504px',
  marginLeft: '-17px',
  height: '54px',
  margin: '0',
  background: 'orange',
}));

const LineDiv = styled('div')(({ theme }) => ({
  color: '#a0a0a0',
  left: '10px',
  marginTop: '-10px',
}));

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const SearchBlock = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [occupancy, setOccupancy] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [state, setState] = React.useState({jason: false,});
  const [count1, setCount1] = useState(1);
  const [count2, setCount2] = useState(1);


  const handleSearch = (e) => {
    e.preventDefault();
    // Implement your search logic here
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleChange = (event, newValue) => {
    if (newValue) {
      setSelectedValue(newValue);
      setInputValue('');
    }
  };

  const handleSelectChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleButtonClick = () => {
    // Закрытие меню при нажатии на кнопку
    setOccupancy('');
  };

  const handleIncrement1 = () => {
    setCount1(prevCount => prevCount + 1);
  };

  const handleDecrement1 = () => {
    setCount1(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
  };

  const handleIncrement2 = () => {
    setCount2(prevCount => prevCount + 1);
  };

  const handleDecrement2 = () => {
    setCount2(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
  };

  return (
    <form onSubmit={handleSearch} >
      <FormContainer container spacing={0} >
        <Grid container spacing={0} >
          {/* Destination Input */}
          <Grid item xs={12} sm={4} >
            <Autocomplete
              freeSolo
              value={selectedValue}
              onChange={handleChange}
              inputValue={inputValue}
              onInputChange={handleInputChange}
              options={frequentQueries}
              renderInput={(params) => (
                <div style={{
                  border: '3px solid orange',
                  borderTopLeftRadius: '10px',
                  borderBottomLeftRadius: '8px',
                  background: ' orange',
                  position: 'relative',
                  right: '20px',
                  height: '56px',
                }}>
                  <FirstTextField
                    {...params}
                    label="Where are you going?"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <DeckIcon />
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      shrink: false,
                      style: {
                        fontFamily: 'Montserrat',
                        visibility: inputValue || selectedValue ? 'hidden' : 'visible',
                        transition: 'visibility 0s ease-out',
                        color: 'grey',
                      },
                    }}
                  />
                </div>
              )}
              renderOption={(props, option) => (
                <MenuItem {...props} key={option}>
                  <Typography variant="body2">{option}</Typography>
                </MenuItem>
              )}
              PaperComponent={(props) => <CustomPaper {...props} />}
            />
          </Grid>

          {/* Dates Input */}
          <Grid item xs={12} sm={5}>
            <div
              style={{
                border: '3px solid orange',
                position: 'relative',
                width: '506px',
                marginLeft: '-20px',
                height: '56px',
              }}>
              <Grid container spacing={0} >
                <Grid item xs={6}>
                  <StyledDiv>
                    <CustomPickerDate
                      selected={checkInDate}
                      onChange={(date) => setCheckInDate(date)}
                      minDate={new Date()}
                      placeholderText="Start date"
                    />
                  </StyledDiv>
                </Grid>
                <Grid item xs={6}>
                  <div style={{
                    marginLeft: '2.85px',
                    border: 'none',
                    height: '53px',
                    width: '45px',
                    position: 'relative',
                    marginTop: '1px',
                  }}>
                    <CustomPickerDate
                      selected={checkOutDate}
                      onChange={(date) => setCheckOutDate(date)}
                      minDate={checkInDate || new Date()}
                      placeholderText="End date"
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>

          {/* Occupancy and Search Button */}
          <Grid item xs={12} sm={3} container spacing={0.5} alignItems="center" direction="row" >
            <Grid item xs={9} >
              <div style={{
                border: '3px solid orange',
                background: ' orange',
                position: 'relative',
                left: '6px',
                height: '56px',
                width: '262px',
              }}>
                <Box sx={{
                  display: 'flex',
                  width: '258px',
                  borderRadius: '7px',
                  height: '58px',
                  border: 'none', // Удаляем все границы по умолчанию
                  outline: 'none', // Удаляем контур при фокусировке
                  boxSizing: 'border-box', // Убеждаемся, что padding не влияет на размер элемента
                  position: 'relative', // Требуется для применения z-index
                  zIndex: 10, // Устанавливаем высокий z-index, чтобы элемент был поверх других
                  '& *': { // Применяем стили ко всем дочерним элементам
                    border: 'none',
                    outline: 'none',
                    color: 'grey',
                  },
                  '&:hover': {
                    border: '1px solid red',
                    bottom: '1px' // Красный контур при наведении

                  },
                }}
                >
                  <FormControl >
                    <InputLabel id='demo-simple-select-label' 
                    style={{
                      transform: 'none', 
                      top: '15px', 
                      left: '20px',
                      color: 'grey',
                      fontFamily: 'Montserrat',
                      }}>
                      {count1} adults - {count2} room</InputLabel>
                    <PeopleTextField
                      labelId="demo-simple-select-label"
                      id='demo-simple-select'
                      value={occupancy}
                      label={`${count1} adults - 1 room`}
                      onChange={(e) => setOccupancy(e.target.value)}
                     
                      MenuProps={{
                        disablePortal: true,
                        PaperProps: {
                          style: {
                            transform: 'translateY(20px)',
                            height: '250px',
                            width: '300px',
                            padding: '10px',
                            margin: '5px',
                            borderRadius: '10px',
                            maxWidth: '300px',
                          },
                        },
                      }}
                    >
              
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        width: '99%',
                        marginLeft: '10px'
                      }}>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography style={{ marginRight: '10px' }}>Adults</Typography>
                          <TextField
                            value={count1}
                            style={{
                              width: '100px',
                              border: '1px solid grey',
                              borderRadius: '5px',
                              right: '-120px',
                              height: '40px',
                            }}
                            onClick={(event) => event.stopPropagation()}
                            InputProps={{
                              readOnly: true,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <IconButton onClick={handleDecrement1} style={{
                                    width: '30px',
                                    right: '12px',
                                    //background: 'yellow',
                                    color: 'blue'
                                  }}>
                                    <BlueRemoveIcon style={{color: 'blue',}}/>
                                  </IconButton>
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton onClick={handleIncrement1} style={{
                                    width: '30px',
                                    left: '12px',
                                  }}>
                                    <AddIcon sx={{ color: 'blue !important' }} />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              '& .MuiInputBase-input': {
                                marginTop: '-8px',
                                marginLeft: '-15px',
                                color: '#222',
                              },
                              '& .MuiInputAdornment-positionStart .MuiIconButton-root': {
                                marginRight: '10px', // Регулирует положение иконки
                                bottom: '5px',
                              },
                              '& .MuiInputAdornment-positionEnd .MuiIconButton-root': {
                                marginLeft: '-10px', // Регулирует положение иконки
                                bottom: '5px',
                              },
                            }}
                          />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography style={{ marginRight: '10px' }}>Rooms</Typography>
                          <TextField
                            value={count2}
                            style={{
                              width: '100px',
                              border: '1px solid grey',
                              borderRadius: '5px',
                              right: '-115px',
                              height: '40px',

                            }}
                            onClick={(event) => event.stopPropagation()}
                            InputProps={{
                              readOnly: true,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <IconButton onClick={handleDecrement2} style={{
                                    width: '30px',
                                    right: '12px',
                                  }}>
                                    <RemoveIcon/>
                                  </IconButton >
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton onClick={handleIncrement2} style={{
                                    width: '30px',
                                    left: '12px',
                                  }}>
                                    <AddIcon style={{
                                      width: '30px',
                                    }} />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              '& .MuiInputBase-input': {
                                marginTop: '-8px',
                                marginLeft: '-15px',
                                color: '#222',
                              },
                              '& .MuiInputAdornment-positionStart .MuiIconButton-root': {
                                marginRight: '10px', // Регулирует положение иконки
                                bottom: '5px',
                              },
                              '& .MuiInputAdornment-positionEnd .MuiIconButton-root': {
                                marginLeft: '-10px', // Регулирует положение иконки
                                bottom: '5px',
                              },
                            }}
                          />
                        </div>

                        <LineDiv >
                          __________________________________
                        </LineDiv>

                        <CustomMenuItem>
                          <FormControlLabel style={{
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            alignItems: 'center',
                            justifyContent: 'space-between', // Распределяет пространство между меткой и ползунком
                            //width: '100%', // Занимает всю ширину контейнера
                            fontSize: '15px',
                            marginRight: '-20px'
                          }}

                            control={
                              <Switch
                                checked={state.jason}
                                onChange={(event) => {
                                  handleSelectChange(event);
                                }}
                                onClick={(event) => {
                                  event.stopPropagation(); // Остановите распространение события клика
                                }}
                                name="jason"

                              />
                            }
                            label={
                              <Typography style={{ marginRight: '85px', marginLeft: '-5px' }}>
                                Traveling with pets?
                              </Typography>
                            }
                            onClick={(event) => event.stopPropagation()}
                          />
                        </CustomMenuItem>
                        <CountPeopleButton variant="outlined" onClick={handleButtonClick}>
                          Done
                        </CountPeopleButton>
                      </div>
                    </PeopleTextField>
                  </FormControl>
                </Box>
              </div>
            </Grid>


            <Grid item xs={3}>
              <div style={{
                border: '3px solid orange',
                position: 'relative',
                right: '-51px',
                width: '110px',
                height: '56px',
                background: 'orange',
                borderTopRightRadius: '10px',
                borderBottomRightRadius: '10px',
              }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  endIcon={<SearchIcon />}
                  style={{
                    width: '120px',
                    height: '62px',
                    left: '-7px',
                    top: '-3px',
                    border: '4px solid orange',
                    fontFamily: 'Montserrat',
                    borderRadius: '10px',
                    boxShadow: 'none',
                    outline: 'none'
                  }}
                >
                  Search
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </FormContainer>
    </form>
  );
};

export default SearchBlock;
