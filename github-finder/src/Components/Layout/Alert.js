import React, { useContext } from 'react';
import AlertContext from '../../context/Alert/alertContext';

const Alert = () => {
    const alertContext = useContext(AlertContext);

    const { alert } = alertContext;

    return (
      alert !== null && (
          <div className={`alert alert-${alert.type}`}>
            <i className="i.fas.fa-info-cirle" ></i> {alert.message}
          </div>
      )
    )
}

export default Alert

