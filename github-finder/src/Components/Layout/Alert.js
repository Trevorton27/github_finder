import React from 'react'

const Alert = ({alert}) => {
    return (
      alert !== null && (
          <div className={`alert alert-${alert.type}`}>
            <i className="i.fas.fa-info-cirle" ></i> {alert.message}
          </div>
      )
    )
}

export default Alert

