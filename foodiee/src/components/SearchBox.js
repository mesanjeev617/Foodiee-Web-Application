import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';

export default function SearchBox() {
     const navigate = useNavigate();
    const [name, setName] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        navigate(`/search/name/${name}`);
    } 
    return(
            <div className='header__search' >
                    <input type="text" className="header__searchInput" onChange={(e)=> setName(e.target.value)}></input>
                    <button className='primary' onClick={submitHandler}>
                    <SearchIcon className="header__searchIcon" />
                    </button>
            </div>
    )
}