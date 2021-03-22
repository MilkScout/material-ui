import React, { useEffect, useState } from 'react';
import { InputAdornment } from '@material-ui/core';
import { NumberField } from '@milkscout/material-ui';
import './style.css';
let render = 0;

export const App = () => {
  const [value, setValue] = useState<number | undefined>(1234567.89);
  useEffect(() => {
    render = render + 1;
  });
  return (
    <div className="App">
      <img src="https://assets.milkscout.eu/logo/logo.svg" className="Logo" alt="logo milkscout" />
      <div className="Container">
        <div>Current value: {typeof value === 'undefined' ? 'undefined' : value}</div>
      </div>
      <div className="Container">
        <div>Render amount: {render}</div>
      </div>
      <div className="Container">
        <div className="Text">Uncontrolled value</div>
        <NumberField
          decimalPlaces={0}
          className="Numberfield"
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
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
      <div className="Container">
        <div className="Text">NumberField label</div>
        <NumberField
          label={'MilkScout'}
          className="Numberfield"
          value={value}
          showArrow={true}
          step={100}
          InputProps={{
            endAdornment: <InputAdornment position="end">€</InputAdornment>,
          }}
          onChange={setValue}
        />
      </div>
      <div className="Container">
        <div className="Text">Readonly</div>
        <NumberField
          label={'MilkScout'}
          className="Numberfield"
          value={value}
          showArrow={true}
          step={100}
          InputProps={{
            readOnly: true,
            endAdornment: <InputAdornment position="end">€</InputAdornment>,
          }}
          onChange={setValue}
        />
      </div>
      <div className="Container">
        <div className="Text">Disabled</div>
        <NumberField
          label={'MilkScout'}
          className="Numberfield"
          value={value}
          showArrow={true}
          step={100}
          disabled={true}
          InputProps={{
            endAdornment: <InputAdornment position="end">€</InputAdornment>,
          }}
          onChange={setValue}
        />
      </div>
    </div>
  );
};
