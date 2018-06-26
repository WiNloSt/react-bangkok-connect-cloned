import React from 'react'

function InputByType(prop) {
  const {
    type,
    name,
    label,
    value,
    handleInputChanged,
    children,
    ...optionalProp
  } = prop

  switch (type) {
    case 'textarea':
      return (
        <textarea
          className="form-control"
          name={name}
          value={value}
          onChange={handleInputChanged}
          {...optionalProp}
        />
      )
    case 'select':
      return (
        <select
          className="form-control"
          name={name}
          value={value}
          onChange={handleInputChanged}
          {...optionalProp}
        >
          {children}
        </select>
      )
    default:
      return (
        <input
          type={type}
          className="form-control"
          name={name}
          value={value}
          onChange={handleInputChanged}
          {...optionalProp}
        />
      )
  }
}

function Input(prop) {
  const { name, label } = prop

  return (
    <div className="form-group">
      {!label || (
        <label htmlFor={name} className="col-form-label">
          {label}
        </label>
      )}
      {InputByType(prop)}
    </div>
  )
}

export default Input
