import React from 'react'; 
import './SearchBox.scss';



function SearchBox(props) {
    return (
      

           <div>
               <input onChange={props.handleInput} type="text" id="search-box" placeholder="Search Item . . ."/>
            </div> 
    
     
        

    )
}

export default SearchBox;