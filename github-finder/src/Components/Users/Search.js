import React, {useState} from 'react';
import PropTypes from 'prop-types';


const Search = ({searchUsers, showClear, clearUsers, setAlert}) => {
  const [text, setText] = useState('');


const onSubmit = e => {
        e.preventDefault();
        if(text === '') {
            setAlert('Please enter a query in yon field below for it would be goodly and just.', 'light');
        } else {
            searchUsers(text);
            setText('');
        }
    };

const onChange = (e) => setText(e.target.value);

        return (
            <div>
                <form onSubmit={onSubmit} className="form">
                    <input 
                    type="text" 
                    name="text" 
                    placeholder="Entereth Thine Query" 
                    value={text} 
                    onChange={onChange}
                    />
                    <input 
                    type="submit" 
                    value="Search Yon Users" 
                    className="btn btn-dark btn-block" 
                    />
                </form>
                {showClear && ( 
                    <button 
                    className="button.btn.btn-light btn-block" 
                    onClick={clearUsers}>
                    Clear Yon Users
                    </button>
                    )}
            </div>
        )
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired   
};

export default Search
