import React, { useState } from 'react';
import { InputAdornment } from '@material-ui/core';
import { NumberField } from '@milkscout/material-ui';
import './style.css';

export const App = () => {
  const [value, setValue] = useState<number | undefined>(12);
  return (
    <div className="App">
      <img src="https://assets.milkscout.eu/logo/logo.svg" className="Logo" alt="logo milkscout" />
      <div className="Container">
        <div>Current value: {typeof value === 'undefined' ? 'undefined' : value}</div>
      </div>
      <div className="Container">
        <div className="Text">Default NumberField with end adroment</div>
        <NumberField
          className="Numberfield"
          value={value}
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
          onChange={(newValue) => setValue(newValue)}
        />
      </div>
      <div className="Container">
        <div className="Text">NumberField different decimal and thousand character</div>
        <NumberField
          className="Numberfield"
          value={value}
          decimalCharacter=","
          thousandCharacter="."
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
          onChange={(newValue) => setValue(newValue)}
        />
      </div>
      <div className="Container">
        <div className="Text">NumberField with 6 decimal places</div>
        <NumberField
          className="Numberfield"
          value={value}
          decimalPlaces={6}
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
          onChange={(newValue) => setValue(newValue)}
        />
      </div>
      <div className="Container">
        <div className="Text">NumberField with 3 decimal places on blur</div>
        <NumberField
          className="Numberfield"
          value={value}
          decimalPlaces={6}
          decimalPlacesShownOnBlur={3}
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
          onChange={(newValue) => setValue(newValue)}
        />
      </div>
      <div className="Container">
        <div className="Text">NumberField with showArrow only (desktop)</div>
        <NumberField
          className="Numberfield"
          value={value}
          showArrow
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
          onChange={setValue}
        />
      </div>
      <div className="Container">
        <div className="Text">NumberField step 0.1 </div>
        <NumberField
          className="Numberfield"
          value={value}
          showArrow={true}
          step={0.1}
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
          onChange={setValue}
        />
      </div>
    </div>
  );
};
