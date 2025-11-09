import './style.css'
import SearchIcon from '../../assets/shape.svg?react'
import React from 'react';
type TProps = {
    value: string | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchEl = ({value, onChange}: TProps) => {
    return (
        <div className='card-search'>
            <input className="search-input" type="text" placeholder="Search for restaurants" value={value} onChange={(event) => onChange(event)}/>
            <SearchIcon className='search-input__icon'/>
        </div>
    )
}