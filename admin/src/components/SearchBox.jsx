import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { Search } from "lucide-react";

const SearchBox = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInput = useRef();

  const onChangeInput = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Handle both prop patterns
    if (props.setSearchQuery) {
      props.setSearchQuery(value);
      if (value === "" && props.setPage) {
        props.setPage(1);
      }
    } else if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className='w-full h-auto bg-[#f1f1f1] relative overflow-hidden'>
      <Search className='absolute top-[13px] left-[10px] z-50 pointer-events-none opacity-80 w-4 h-4' />
      <input 
        type="text" 
        className='w-full h-[40px] bg-[#f1f1f1] border border-[rgba(0,0,0,0.1)] p-2 pl-8 focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-md text-[13px]' 
        placeholder='Search here...' 
        value={props.value !== undefined ? props.value : searchQuery} 
        onChange={onChangeInput} 
        ref={searchInput}
      />
    </div>
  )
}

export default SearchBox
