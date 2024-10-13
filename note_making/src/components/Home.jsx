import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPaste } from '../redux/pasteSlice';
import { useDispatch, useSelector } from 'react-redux';

export const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState('') ;
  const [searchParams, setSearchParams] = useSearchParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  const pasteId = searchParams.get("paste._id");
  const dispatch = useDispatch(); 
  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.filter((p) => p._id === pasteId);
        setTitle(title );  
        setValue(value);  
      }
  },[pasteId]);
  

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
   



    if (pasteId) { // We want to update as the pasteId already exists
      dispatch(updateToPaste(paste));
    } else { // Create new paste
      dispatch(addToPastes(paste));
    }
    // Reset the state after updating and adding
    setValue('');
    setTitle('');
    setSearchParams({});
  }

  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
        <input 
          className='p-1 rounded-2xl mt-2 w-[67%] pl-4' 
          type='text'
          placeholder='Enter title here'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className='p-2 rounded-2xl mt-2' onClick={createPaste}>
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <div>
        <textarea 
          className='rounded-2xl mt-4 min-w-[500px] p-4'
          value={value}
          placeholder='Enter content here'
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};
