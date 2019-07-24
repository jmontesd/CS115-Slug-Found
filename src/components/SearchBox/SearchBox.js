import React from 'react'; 
import './SearchBox.scss';



export function SearchBox(props) {
    return (
            // creates search box to showcase on homepage
           <div>
               <input onChange={props.handleInput} type="text" id="search-box" placeholder="Search Item . . ."/>
            </div> 
    )
}

export default SearchBox;