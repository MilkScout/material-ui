/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { TextFieldProps as OriginalTextFieldProps } from '@material-ui/core/TextField/TextField';
import { NumberFieldArrow } from './NumberFieldArrow';

export interface NumberFieldProps extends TextFieldProps {
  value?: number;
  decimalPlaces?: number;
  allowDecimalPadding?: boolean;
  decimalCharacter?: string;
  thousandCharacter?: string;
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
    variant?: 'outlined' | 'filled' | 'standard';
  }>;

interface NumberFieldState {
  focus: boolean;
  hover: boolean;
  innerValue: string;
}

export const DEFAULT_DECIMAL_CHARACTER = '.';
export const DEFAULT_THOUSAND_CHARACTER = ',';
export const DEFAULT_DECIMAL_PLACES = 2;
export const DEFAULT_STEP_SIZE = 1;
export const MINIMUM_VALUE = 0;

export class NumberField extends Component<NumberFieldProps, NumberFieldState> {
  private inputRef!: HTMLInputElement;

  private changeValue!: number | undefined;

  private lastKey!: number | undefined;

  constructor(props: NumberFieldProps) {
    super(props);
    this.state = {
      hover: false,
      focus: false,
      innerValue: '',
    };
    this.changeValue = props.value;
  }

  componentDidMount() {
    const { value: currentValue } = this.props;

    this.inputRef.addEventListener('mouseover', this.onMouseOver);
    this.inputRef.addEventListener('mouseout', this.onMouseOut);
    this.inputRef.addEventListener('focus', this.onFocus);
    this.inputRef.addEventListener('blur', this.onBlur);
    this.inputRef.addEventListener('keydown', this.onKeyDown);
    this.inputRef.addEventListener('input', this.onInput);
    this.formatNumber(this.convertToStringValue(currentValue), 0);
  }

  componentDidUpdate(prevProps: Readonly<NumberFieldProps>) {
    const { value: currentValue } = this.props;
    const { value: lastValue } = prevProps;
    if (this.changeValue !== currentValue && currentValue !== lastValue) {
      this.formatNumber(this.convertToStringValue(currentValue), this.inputRef.selectionStart || 0);
      this.changeValue = currentValue;
    }
  }

  componentWillUnmount() {
    this.inputRef.removeEventListener('mouseover', this.onMouseOver);
    this.inputRef.removeEventListener('mouseout', this.onMouseOut);
    this.inputRef.removeEventListener('focus', this.onFocus);
    this.inputRef.removeEventListener('blur', this.onBlur);
    this.inputRef.removeEventListener('keydown', this.onKeyDown);
    this.inputRef.removeEventListener('input', this.onInput);
  }

  onMouseOver = () => {
    this.setState((prevState) => ({ ...prevState, hover: true }));
  };

  onMouseOut = () => {
    this.setState((prevState) => ({ ...prevState, hover: false }));
  };

  onFocus = () => {
    this.setState((prevState) => ({ ...prevState, focus: true }));
  };

  onBlur = () => {
    this.setState((prevState) => ({ ...prevState, focus: false }));
    this.formatNumber(this.inputRef.value, this.inputRef.selectionStart || 0, true);
  };

  onInput = () => {
    if (!this.mobileKeyPressFix()) {
      this.formatNumber(this.inputRef.value, this.inputRef.selectionStart || 0);
    }
  };

  mobileKeyPressFix = (): boolean => {
    if (typeof this.lastKey !== 'undefined' && this.lastKey !== 46 && this.lastKey !== 8) {
      const inputValue = this.inputRef.value;
      const { focus } = this.state;
      const { disabled, InputProps, decimalPlaces } = this.props;
      // Get cursor position
      const { selectionStart } = this.inputRef;
      const charIndex = (selectionStart || 0) - 1;
      const lastChar = String.fromCharCode(inputValue.charCodeAt(charIndex));

      if (lastChar === '.' || lastChar === ',') {
        if (decimalPlaces === 0) {
          const updateValue = this.formatLeftSide(inputValue.substring(0, charIndex));
          this.inputRef.value = updateValue;

          const newStartPosition = updateValue.length;

          if (focus && !disabled && !InputProps?.readOnly) {
            this.inputRef.setSelectionRange(newStartPosition, newStartPosition);
          }
        } else {
          const { decimalCharacter = DEFAULT_DECIMAL_CHARACTER } = this.props;

          const updateValue =
            this.formatLeftSide(inputValue.substring(0, charIndex) || '0') +
            decimalCharacter +
            this.formatRightSide(inputValue.substring(charIndex + 1));
          this.inputRef.value = updateValue;
          const newStartPosition = updateValue.indexOf(decimalCharacter) + 1;

          if (focus && !disabled && !InputProps?.readOnly) {
            this.inputRef.setSelectionRange(newStartPosition, newStartPosition);
          }
        }
        this.update();
        return true;
      }
    }
    return false;
  };

  getValue = (): number | undefined => {
    const { decimalCharacter = DEFAULT_DECIMAL_CHARACTER } = this.props;
    const inputValue = this.inputRef.value;
    if (inputValue === '') {
      return undefined;
    }
    if (inputValue.indexOf(decimalCharacter) >= 0) {
      const decimalPosition = inputValue.indexOf(decimalCharacter);

      const leftSideOfDecimal = inputValue.substring(0, decimalPosition).replace(/\D/g, '');
      const rightSideOfDecimal = inputValue.substring(decimalPosition).replace(/\D/g, '');
      return parseFloat(`${leftSideOfDecimal}.${rightSideOfDecimal}`);
    }
    return parseFloat(inputValue.replace(/\D/g, ''));
  };

  correctValue = (corValue: number): number | undefined => {
    const { min = MINIMUM_VALUE, max } = this.props;
    let newValue = corValue;

    // if newValue is smaller than min set min value
    if (newValue < min || newValue < MINIMUM_VALUE) {
      newValue = min;
    }
    // if newValue is bigger than max value
    if (typeof max !== 'undefined' && max < newValue) {
      newValue = max;
    }

    return newValue;
  };

  convertToStringValue = (value: number | undefined): string => {
    const { decimalCharacter = DEFAULT_DECIMAL_CHARACTER, decimalPlaces = DEFAULT_DECIMAL_PLACES } = this.props;
    let innerValue = '';
    if (typeof value !== 'undefined') {
      const stringValue = value.toFixed(decimalPlaces);
      const decimalPosition = stringValue.indexOf('.');
      if (decimalPosition >= 0) {
        const leftSideOfDecimal = stringValue.substring(0, decimalPosition);
        const rightSideOfDecimal = stringValue.substring(decimalPosition + 1);
        innerValue = leftSideOfDecimal + decimalCharacter + rightSideOfDecimal;
      } else {
        innerValue = stringValue;
      }
    }
    this.setState((prevState) => ({ ...prevState, innerValue }));
    return innerValue;
  };

  update = () => {
    const { onChange = () => {} } = this.props;
    const currentValue = this.getValue();

    if (this.changeValue !== currentValue) {
      this.changeValue = currentValue;
      onChange(currentValue);
    }
  };

  onUpClick = () => {
    const { step = DEFAULT_STEP_SIZE, disabled, InputProps } = this.props;
    if (!disabled && !InputProps?.readOnly) {
      const newValue = (this.getValue() || 0) + step;
      this.formatNumber(
        this.convertToStringValue(this.correctValue(newValue)),
        this.inputRef.selectionStart || 0,
        false,
        false,
      );
      this.update();
    }
  };

  onDownClick = () => {
    const { step = DEFAULT_STEP_SIZE, disabled, InputProps } = this.props;
    if (!disabled && !InputProps?.readOnly) {
      const newValue = (this.getValue() || 0) - step;
      this.convertToStringValue(this.correctValue(newValue));
      this.formatNumber(
        this.convertToStringValue(this.correctValue(newValue)),
        this.inputRef.selectionStart || 0,
        false,
        false,
      );
      this.update();
    }
  };

  onKeyDown = (event: any) => {
    const { key, which, keyCode } = event;
    this.lastKey = which || keyCode;

    switch (key) {
      case 'ArrowDown':
        event.preventDefault();
        this.onDownClick();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.onUpClick();
        break;
      default:
        break;
    }
  };

  formatLeftSide = (number: string) => {
    const { thousandCharacter = DEFAULT_THOUSAND_CHARACTER } = this.props;
    let parsedNumber = number.replace(/\D/g, '');
    if (parsedNumber !== '') {
      parsedNumber = `${parseInt(parsedNumber, 10)}`;
    }
    return parsedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, thousandCharacter);
  };

  formatRightSide = (number: string) => number.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '');

  getZeroPadding = (): string => {
    const { decimalPlaces = DEFAULT_DECIMAL_PLACES } = this.props;
    return Array(decimalPlaces + 1).join('0');
  };

  formatNumber = (inputValue: string, caretStartPosition: number, isBlur = false, setSelection = true) => {
    const { decimalPlaces = DEFAULT_DECIMAL_PLACES, decimalCharacter = DEFAULT_DECIMAL_CHARACTER } = this.props;

    // appends $ to value, validates decimal side
    // and puts cursor back in right position.

    // don't validate empty input
    if (inputValue === '') {
      this.inputRef.value = '';
      this.setState((prevState) => ({ ...prevState, innerValue: '' }));
      this.update();
      return;
    }

    // original length
    const originalLength = inputValue.length;

    // initial caret position
    const zeroPadding = this.getZeroPadding();

    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    const decimalPosition = inputValue.indexOf(decimalCharacter);

    // check for decimal
    if (decimalPosition >= 0) {
      const isInDecimal = caretStartPosition > decimalPosition;
      // split number by decimal point
      let leftSideOfDecimal = inputValue.substring(0, decimalPosition);
      let rightSideOfDecimal = inputValue.substring(decimalPosition + 1);

      // add commas to left side of number
      leftSideOfDecimal = this.formatLeftSide(leftSideOfDecimal);

      // validate right side
      rightSideOfDecimal = this.formatRightSide(rightSideOfDecimal);

      // On blur make sure 2 numbers after decimal
      if (isBlur) {
        leftSideOfDecimal = leftSideOfDecimal || '0';
        rightSideOfDecimal += zeroPadding;
      }

      if (isInDecimal) {
        caretStartPosition += 1;
      }

      // Limit decimal to only 2 digits
      rightSideOfDecimal = rightSideOfDecimal.substring(0, decimalPlaces);

      // join number by .
      inputValue = `${leftSideOfDecimal}${decimalCharacter}${rightSideOfDecimal}`;
    } else {
      // no decimal entered
      // add commas to number
      // remove all non-digits
      inputValue = this.formatLeftSide(inputValue);
      inputValue = `${inputValue}`;

      // final formatting
      if (isBlur && decimalPlaces > 0) {
        inputValue += decimalCharacter + zeroPadding;
      }
    }

    // send updated string to input
    this.inputRef.value = inputValue;

    // put caret back in the right position
    const updateLength = inputValue.length;
    caretStartPosition = updateLength - originalLength + caretStartPosition;

    const { focus } = this.state;
    const { disabled, InputProps } = this.props;

    // fix for safari
    if (focus && !disabled && !InputProps?.readOnly && setSelection) {
      this.inputRef.setSelectionRange(caretStartPosition, caretStartPosition);
    }

    this.setState((prevState) => ({ ...prevState, innerValue: inputValue }));
    this.update();
  };

  render = () => {
    const {
      onChange,
      value,
      disabled,
      decimalPlaces = DEFAULT_DECIMAL_PLACES,
      decimalCharacter,
      thousandCharacter,
      variant,
      inputProps,
      InputProps,
      showArrow,
      InputLabelProps,
      ...otherProps
    } = this.props;
    const { hover, focus, innerValue } = this.state;
    return (
      <TextField
        type="text"
        inputRef={(ref) => {
          this.inputRef = ref;
        }}
        disabled={disabled}
        variant={variant}
        InputLabelProps={{
          ...InputLabelProps,
          shrink: focus || innerValue !== '',
        }}
        inputProps={{
          ...inputProps,
          inputMode: decimalPlaces <= 0 ? 'numeric' : 'decimal',
        }}
        InputProps={{
          ...InputProps,
          endAdornment: (
            <>
              {!InputProps?.readOnly && !disabled && (
                <NumberFieldArrow
                  hide={showArrow === false}
                  show={!!showArrow || hover || focus}
                  onUpClick={() => {
                    this.onUpClick();
                    this.update();
                  }}
                  onDownClick={() => {
                    this.onDownClick();
                    this.update();
                  }}
                />
              )}
              {!!InputProps?.endAdornment && <>{InputProps.endAdornment}</>}
            </>
          ),
        }}
        {...otherProps}
      />
    );
  };
}
