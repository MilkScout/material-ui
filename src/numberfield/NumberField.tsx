import React, { useCallback, useEffect, useRef, useState } from 'react';
import AutoNumeric from 'autonumeric';
import { TextField } from '@material-ui/core';
import { TextFieldProps as OriginalTextFieldProps } from '@material-ui/core/TextField/TextField';
import { NumberFieldArrow } from './NumberFieldArrow';

export interface NumberFieldProps extends TextFieldProps {
  value?: number;
  decimalPlaces?: number;
  allowDecimalPadding?: boolean;
  decimalCharacter: string;
  thousandCharacter: string;
  decimalPlacesShownOnBlur?: number | null;
  modifyValueOnWheel?: boolean;
  showArrow?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

export type TextFieldProps = Omit<
  OriginalTextFieldProps,
  'type' | 'onChange' | 'onFocus' | 'onBlur' | 'onKeyPress' | 'onKeyUp' | 'onKeyDown' | 'value' | 'variant'
> &
  Partial<{
    onChange: (value: number | undefined) => void;
    onFocus: (value: number | undefined) => void;
    onBlur: (value: number | undefined) => void;
    onKeyPress: (value: number | undefined) => void;
    onKeyUp: (value: number | undefined) => void;
    onKeyDown: (value: number | undefined) => void;
    variant?: 'outlined' | 'filled' | 'standard';
  }>;

export const NumberField = ({
  classes,
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  onKeyPress = () => {},
  onKeyUp = () => {},
  onKeyDown = () => {},
  value,
  InputProps,
  decimalPlaces = 2,
  allowDecimalPadding = false,
  decimalPlacesShownOnBlur = null,
  modifyValueOnWheel = false,
  showArrow = true,
  decimalCharacter = '.',
  thousandCharacter = ',',
  variant,
  min,
  max,
  step = 1,
  ...othersProps
}: NumberFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [autoNumeric, setAutoNumeric] = useState<AutoNumeric | undefined>(undefined);
  const [prevChangeValue, setPrevChangeValue] = useState<number | undefined>(undefined);
  const [hover, setHover] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);

  const onMouseOver = useCallback(() => {
    if (!hover) {
      setHover(true);
    }
  }, [hover, setHover]);
  const onMouseOut = useCallback(() => {
    if (hover) {
      setHover(false);
    }
  }, [hover, setHover]);

  const onInputFocus = useCallback(() => {
    if (!focus) {
      setFocus(true);
    }
  }, [setFocus, focus]);

  const onInputBlur = useCallback(() => {
    if (focus) {
      setFocus(false);
    }
  }, [setFocus, focus]);

  useEffect(() => {
    const { current } = inputRef;
    if (current) {
      current.addEventListener('mouseover', onMouseOver);
      current.addEventListener('mouseout', onMouseOut);
      current.addEventListener('focus', onInputFocus);
      current.addEventListener('blur', onInputBlur);
    }
    return () => {
      if (current) {
        current.removeEventListener('mouseover', onMouseOver);
        current.removeEventListener('mouseout', onMouseOut);
        current.removeEventListener('focus', onInputFocus);
        current.removeEventListener('blur', onInputBlur);
      }
    };
  }, [inputRef, onMouseOut, onMouseOver]);

  useEffect(() => {
    if (inputRef.current && typeof autoNumeric === 'undefined') {
      setAutoNumeric(
        new AutoNumeric(inputRef.current, value, {
          outputFormat: 'number',
          decimalPlaces,
          digitGroupSeparator: thousandCharacter,
          decimalCharacter,
          decimalPlacesShownOnBlur,
          modifyValueOnWheel,
        }),
      );
    }
  }, [
    autoNumeric,
    decimalCharacter,
    decimalPlaces,
    allowDecimalPadding,
    thousandCharacter,
    setAutoNumeric,
    decimalPlacesShownOnBlur,
    modifyValueOnWheel,
    value,
  ]);

  const getValue = useCallback(() => {
    const { current } = inputRef;
    if (autoNumeric && current) {
      const rawValue = autoNumeric.getNumber();
      if (rawValue !== null && current.value !== '') {
        return rawValue;
      }
    }
    return undefined;
  }, [autoNumeric, inputRef]);

  useEffect(() => {
    if (autoNumeric && getValue() !== value) {
      if (typeof value !== 'undefined' && !Number.isNaN(value)) {
        if (value < 10000000000000 && value > -10000000000000) {
          autoNumeric.set(value);
          setPrevChangeValue(value);
        }
      } else {
        autoNumeric.set(null);
        setPrevChangeValue(undefined);
      }
    }
  }, [value, autoNumeric, getValue]);

  const setValue = useCallback(
    (newValue: number | undefined) => {
      if (autoNumeric) {
        if (typeof newValue !== 'undefined' && !Number.isNaN(newValue)) {
          if (newValue < 10000000000000 && newValue > -10000000000000) {
            autoNumeric.set(newValue);
          }
        } else {
          autoNumeric.set(null);
        }
      }
    },
    [autoNumeric],
  );

  const correctValue = useCallback(
    (corValue: number) => {
      let newValue = corValue;

      // if newValue is smaller than min set min value
      if (typeof min !== 'undefined' && newValue < min) {
        newValue = min;
      }
      // if newValue is bigger than max value
      if (typeof max !== 'undefined' && max < newValue) {
        newValue = max;
      }
      return newValue;
    },
    [max, min],
  );

  const onInnerChange = useCallback(() => {
    const currentValue = getValue();
    if (prevChangeValue !== currentValue) {
      setPrevChangeValue(currentValue);
      onChange(currentValue);
    }
  }, [onChange, setPrevChangeValue, prevChangeValue, getValue]);

  const onUpClick = useCallback(() => {
    const newValue = (getValue() || 0) + step;
    setValue(correctValue(newValue));
    onInnerChange();
  }, [correctValue, getValue, setValue, step]);

  const onDownClick = useCallback(() => {
    const newValue = getValue() || 0;
    setValue(correctValue(newValue - step));
    onInnerChange();
  }, [correctValue, getValue, setValue, step]);

  const onInputKeyDown = useCallback(
    (event: any) => {
      const { key } = event;
      switch (key) {
        case '+':
          if (typeof min !== 'undefined' && min >= 0) {
            event.preventDefault();
          }
          break;
        case '-':
          if (typeof min !== 'undefined' && min >= 0) {
            event.preventDefault();
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          onUpClick();
          break;
        case 'ArrowDown':
          event.preventDefault();
          onDownClick();
          break;
        default:
      }
    },
    [correctValue, onDownClick, onUpClick, min],
  );

  useEffect(() => {
    const { current } = inputRef;
    if (current) {
      current.addEventListener('keydown', onInputKeyDown);
    }
    return () => {
      if (current) {
        current.removeEventListener('keydown', onInputKeyDown);
      }
    };
  }, [inputRef, onInputKeyDown]);
  return (
    <TextField
      type="text"
      inputRef={inputRef}
      onChange={() => onInnerChange()}
      onFocus={() => onFocus(getValue())}
      onBlur={() => onBlur(getValue())}
      onKeyPress={() => onKeyPress(getValue())}
      onKeyUp={() => onKeyUp(getValue())}
      onKeyDown={() => onKeyDown(getValue())}
      variant={variant}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <>
            {!InputProps?.readOnly && (
              <NumberFieldArrow
                hide={!showArrow}
                show={hover || focus}
                onUpClick={onUpClick}
                onDownClick={onDownClick}
              />
            )}
            {!!InputProps?.endAdornment && <>{InputProps.endAdornment}</>}
          </>
        ),
      }}
      {...othersProps}
    />
  );
};
