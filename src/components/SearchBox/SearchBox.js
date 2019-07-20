import React from 'react'; 
import './SearchBox.scss';


function SearchBox(props) {
    return (
        <div>
            <input onChange={props.handleInput} type="text" id="search-box" />

        </div>
    )
}

export default SearchBox;