import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';


const Search = ({ setAlert }) => {
    const githubContext = useContext(GithubContext);

    const [text, setText] = useState('');

    const onSubmit = e => {
            e.preventDefault();
            if(text === '') {
                setAlert('Please enter a query in yon field below for it would be goodly and just.', 'light');
            } else {
                githubContext.searchUsers(text);
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
                    {githubContext.users.length > 0 && ( 
                        <button 
                        className="button.btn.btn-light btn-block" 
                        onClick={githubContext.clearUsers}>
                        Clear Yon Users
                        </button>
                        )}
                </div>
            )
}

Search.propTypes = {
    setAlert: PropTypes.func.isRequired   
};

export default Search
