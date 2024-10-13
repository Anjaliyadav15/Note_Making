import React, { useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { removeFromPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

 const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  console.log(pastes);
  const [searchTerm , setSearchTerm] = useState("") ;
  const dispatch = useDispatch();
  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function handleDelete(pasteId){
      dispatch(removeFromPaste(pasteId));
  }

  return (
    <div>
   
   <input className='p-2 rounded-2xl min-w-[600px] mt-5'
   value={searchTerm}
   placeholder='search here'
   type='search'
   onChange={(e) => setSearchTerm(e.target.value)}
   ></input>
<div className='mt-5'>
      {
        filteredData.length > 0 && filteredData.map(
          (paste) =>{
            return(
              <div className='border' key={paste?._id}>
                <div>
                  {paste.title}</div>
                  <div>{paste.content}</div>  
                  <div className='flex flex-row gap-4 place-content-evenly mt-5'>
                    <button> 
                    <a href={`/?pasteId=${paste?.pasteId}`}>
                 Edit
                    </a>
                    </button>
                    <button>
                    <a href={`/pastes/${paste?.pasteId}`}>
                    View
                    </a>
                    </button>   
                    <button onClick={() => handleDelete(paste?._id)}>Delete</button>
                    <button onClick={() => {
                      navigator.clipboard.writeText(paste?.content)
                      toast.success("Copied to clipboard")
                    }
                    }
                    >Copy</button>
                  
                    <button>Share 
                      </button> 
                  </div>
                  <div>{paste.createAt}</div>
                   </div>
            )
      
          }
        )
      }
</div>
</div>
  )
}
export default Paste ;