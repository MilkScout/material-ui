import React, { useState } from 'react';
import { InputAdornment } from '@material-ui/core';
import { NumberField } from '@milkscout/material-ui';

export const App = () => {
  const [value, setValue] = useState<number | undefined>(12);
  return (
    <div>
      <div>value: {value}</div>
      <div style={{ margin: 'auto' }}>
        <NumberField
          value={value}
          step={20}
          min={-200}
          max={200}
          decimalPlaces={2}
          decimalCharacter={','}
          thousandCharacter={'.'}
          InputProps={{ endAdornment: <InputAdornment position={'end'}>€</InputAdornment> }}
          onChange={(newValue) => {
            console.log('newValue change', newValue);
            setValue(newValue);
          }}
        />
      </div>
    </div>
  );
};
