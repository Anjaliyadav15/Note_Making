import { createSlice } from '@reduxjs/toolkit'
import toast, { Toaster } from 'react-hot-toast'
const initialState = {
  pastes: localStorage.getItem("pastes")
  ? JSON.parse(localStorage.getItem("pastes")) //if details exists then those will be returned

  : []   // else the empty array will be returned .

}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes:  (state,action) => {
    const paste  = action.payload;
    //add a check -> paste already exists wala case
    state.pastes.push(paste);
    localStorage.setItem("pastes",JSON.stringify(state.pastes)); 
    toast("Paste Created Successfully");
     
    },
    updateToPaste:  (state,action) => {
      const paste = action.payload ;
    
      const index = state.pastes.findIndex((item) =>
     item.id == paste._id) ;
      if(index >= 0)
      {
       state.pastes[index] = paste;
       localStorage.setItem("pastes" ,JSON.stringify(state.pastes));
       toast.success("Pastes updated") ;
      }
     
    },
    removeFromPaste : (state,action) => {
       const pasteId = action.payload ;
       console.log(pasteId);
       const index = state.pastes.findIndex((item) =>
      item._id === pasteId) ;
       if(index >= 0)
       {
        state.pastes.splice(index,1);
        localStorage.setItem("pastes" ,JSON.stringify(state.pastes));
        toast.success("Pastes deleted") ;
       }
    } ,
    resetAllPastes: (state, action) => {
      state.pastes = [] ;
      localStorage.removeItem("pastes");
    },
  },
})


export const {addToPastes , updateToPaste , removeFromPaste ,resetAllPastes} = pasteSlice.actions

export default pasteSlice.reducer