import React, { useEffect, useState } from 'react';
import SearchData from './SearchData';

const Search = () => {
    const [input, setInput] = useState('');

    const updateInput = (e) => {
        //console.log(e.target.value);
        setInput(e.target.value);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => console.log(
            `I can se your not tryping. I can see "${input}" now!`
            ), 2000);
        return () => clearTimeout(timeoutId);
    }, [input]);


    return (
        <SearchData input = {input} updateInput = {updateInput}/>
    )
}

export default Search;