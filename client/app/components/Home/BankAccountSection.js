import React from 'react';
import PropTypes from 'prop-types';

export const BANK_ACCOUNT_FORM_COUNTRY = 'country';
export const BANK_ACCOUNT_FORM_CURRENCY = 'currency';
export const BANK_ACCOUNT_FORM_ROUTING_NUMBER = 'routing_number';
export const BANK_ACCOUNT_FORM_ACCOUNT_NUMBER = 'account_number';
export const BANK_ACCOUNT_FORM_ACCOUNT_HOLDER_NAME = 'account_holder_name';
export const BANK_ACCOUNT_FORM_ACCOUNT_HOLDER_TYPE = 'account_holder_type';


const BankAccountForm = (props) => {
  const {
    inputWrapperStyle,
    labelStyle,
    inputStyle,
    onChangeFunc,
    countryValue,
    currencyValue,
    routingNumberValue,
    accountNumberValue,
    accountHolderNameValue,
    accountHolderTypeValue,
    countryKey,
    currencyKey,
    routingNumberKey,
    accountNumberKey,
    accountHolderNameKey,
    accountHolderTypeKey,
    countryLabel,
    currencyLabel,
    routingNumberLabel,
    accountNumberLabel,
    accountHolderNameLabel,
    accountHolderTypeLabel,
  } = props;
  return (
    <div>
      <div style={inputWrapperStyle}>
        <label
          htmlFor={countryKey}
          style={labelStyle}
        >
          {countryLabel}
        </label>
        <input
          type="text"
          id={countryKey}
          value={countryValue}
          onChange={(e) => onChangeFunc(e, countryKey)}
          style={inputStyle}
        />
      </div>
      <div style={inputWrapperStyle}>
        <label
          htmlFor={currencyKey}
          style={labelStyle}
        >
          {currencyLabel}
        </label>
        <input
          type="text"
          id={currencyKey}
          value={currencyValue}
          onChange={(e) => onChangeFunc(e, currencyKey)}
          style={inputStyle}
        />
      </div>
      <div style={inputWrapperStyle}>
        <label
          htmlFor={routingNumberKey}
          style={labelStyle}
        >
          {routingNumberLabel}
        </label>
        <input
          type="text"
          id={routingNumberKey}
          value={routingNumberValue}
          onChange={(e) => onChangeFunc(e, routingNumberKey)}
          style={inputStyle}
        />
      </div>
      <div style={inputWrapperStyle}>
        <label
          htmlFor={accountNumberKey}
          style={labelStyle}
        >
          {accountNumberLabel}
        </label>
        <input
          type="text"
          id={accountNumberKey}
          value={accountNumberValue}
          onChange={(e) => onChangeFunc(e, accountNumberKey)}
          style={inputStyle}
        />
      </div>
      <div style={inputWrapperStyle}>
        <label
          htmlFor={accountHolderNameKey}
          style={labelStyle}
        >
          {accountHolderNameLabel}
        </label>
        <input
          type="text"
          id={accountHolderNameKey}
          value={accountHolderNameValue}
          onChange={(e) => onChangeFunc(e, accountHolderNameKey)}
          style={inputStyle}
        />
      </div>
      <div style={inputWrapperStyle}>
        <label
          htmlFor={accountHolderTypeKey}
          style={labelStyle}
        >
          {accountHolderTypeLabel}
        </label>
        <input
          type="text"
          id={accountHolderTypeKey}
          value={accountHolderTypeValue}
          onChange={(e) => onChangeFunc(e, accountHolderTypeKey)}
          style={inputStyle}
        />
      </div>
    </div>
  );
};

BankAccountForm.propTypes = {
  // This function should be binded to the parent component
  onChangeFunc: PropTypes.func.isRequired,

  // Values below should be saved in the parent state
  countryValue: PropTypes.string.isRequired,
  currencyValue: PropTypes.string.isRequired,
  routingNumberValue: PropTypes.string.isRequired,
  accountNumberValue: PropTypes.string.isRequired,
  accountHolderNameValue: PropTypes.string.isRequired,
  accountHolderTypeValue: PropTypes.string.isRequired,

  // Below are not required but you can customize if you want
  countryKey: PropTypes.string,
  currencyKey: PropTypes.string,
  routingNumberKey: PropTypes.string,
  accountNumberKey: PropTypes.string,
  accountHolderNameKey: PropTypes.string,
  accountHolderTypeKey: PropTypes.string,

  // Below are not required but you can customize if you want
  countryLabel: PropTypes.string,
  currencyLabel: PropTypes.string,
  routingNumberLabel: PropTypes.string,
  accountNumberLabel: PropTypes.string,
  accountHolderNameLabel: PropTypes.string,
  accountHolderTypeLabel: PropTypes.string,

  // Optional styling
  inputWrapperStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  inputStyle: PropTypes.object,
};

BankAccountForm.defaultProps = {
  countryKey: BANK_ACCOUNT_FORM_COUNTRY,
  currencyKey: BANK_ACCOUNT_FORM_CURRENCY,
  routingNumberKey: BANK_ACCOUNT_FORM_ROUTING_NUMBER,
  accountNumberKey: BANK_ACCOUNT_FORM_ACCOUNT_NUMBER,
  accountHolderNameKey: BANK_ACCOUNT_FORM_ACCOUNT_HOLDER_NAME,
  accountHolderTypeKey: BANK_ACCOUNT_FORM_ACCOUNT_HOLDER_TYPE,
  countryLabel: BANK_ACCOUNT_FORM_COUNTRY,
  currencyLabel: BANK_ACCOUNT_FORM_CURRENCY,
  routingNumberLabel: BANK_ACCOUNT_FORM_ROUTING_NUMBER,
  accountNumberLabel: BANK_ACCOUNT_FORM_ACCOUNT_NUMBER,
  accountHolderNameLabel: BANK_ACCOUNT_FORM_ACCOUNT_HOLDER_NAME,
  accountHolderTypeLabel: BANK_ACCOUNT_FORM_ACCOUNT_HOLDER_TYPE,
  inputWrapperStyle: {},
  labelStyle: {},
  inputStyle: {},
};

export default BankAccountForm;