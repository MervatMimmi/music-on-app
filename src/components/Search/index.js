import React, { useState } from 'react';
import SearchData from './SearchData';

const Search = () => {
    const [input, setInput] = useState('');

    const updateInput = (e) => {
        console.log('hej')
        console.log(e.target.value);
        setInput(e.target.value);
    }

    return (
        <SearchData input = {input} updateInput = {updateInput}/>
    )
}

export default Search;