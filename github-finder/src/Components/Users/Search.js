import React, { Component } from 'react';
import PropTypes from 'prop-types';


export class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired   
    };

    onSubmit = e => {
        e.preventDefault();
        if(this.state.text === '') {
            this.props.setAlert('Please enter a query in yon field below for it would be goodly and just.', 'light');
        } else {
            this.props.searchUsers(this.state.text);
            this.setState({ text: ''});
        }
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    }
    render() {
        const {showClear, clearUsers} = this.props;

        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input 
                    type="text" 
                    name="text" 
                    placeholder="Entereth Thine Query" 
                    value={this.state.text} 
                    onChange={this.onChange}
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
}

export default Search
