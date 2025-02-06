import React from 'react'
import "./styles/ModalCharacterSelection.css"

function ModalCharacterSelection({setModal, handlePrompts, aiPrompts}) {
  return (
    
    <div className='selection-wrapper'>
        <div className='modal'>
            <button className='close-button' onClick={()=>setModal(false)} >x</button>
            <h2>Customize your AI</h2>
            <p>name</p>
            <input onChange={handlePrompts} name='name' type="text" value={aiPrompts.name} placeholder='optional'/>
            <div>
                <p>choose a preset</p>
                <select name="preset" id="" onChange={handlePrompts} value={aiPrompts.preset}>
                    <option value={" "}></option>
                    <option value="you are a teacher serious and wise">Teacher</option>
                    <option value="you are a professor knows everithing">Professor</option>
                    <option value="you are a comedian funny and talkative">Comedian</option>
                    <option value="you are an actor decieving and can take any role">Actor</option>
                </select> 
            </div>
            <div>
                <p>customize your own</p>
                <input type="text" name='customPrompts' onChange={handlePrompts} value={aiPrompts.customPrompts} placeholder='ex. a 20 year old actor' />
            </div>
            <button onClick={()=> setModal(false)} >submit</button>
        </div>
    </div>
  
  )
}

export default ModalCharacterSelection