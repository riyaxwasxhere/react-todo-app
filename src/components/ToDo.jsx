import React, { useEffect, useState } from 'react'
import './ToDo.css'

import addIcon from '../assets/add.png'
import editIcon from '../assets/edit.png'
import trashIcon from '../assets/trash.png'
import saveIcon from '../assets/check.png'

const ToDo = () => {
  const [inputVal, setInputVal] = useState('')
  const [tasks,setTasks] = useState(()=>{
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks? JSON.parse(savedTasks) : []
  })
  const [editIndex,setEditIndex] = useState(null)

  useEffect(()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks))
  },[tasks])

  const handleInputval = (value) =>{
    setInputVal(value)
  }

  const handleAdd = ()=>{
    if(inputVal.trim() === ''){
      alert("You must write something!")
      return
    }
    if(editIndex ===  null){
      let updatedTasks = [...tasks,{text: inputVal, done: false}]
      setTasks(updatedTasks)
      setInputVal("")
    }else{
      let updatedTasks = [...tasks]
      updatedTasks[editIndex].text = inputVal
      setTasks(updatedTasks)
    }
    setInputVal('')
    setEditIndex(null)
  }

  const toggleCheck = (indexTocheck) =>{
    let updatedTasks = tasks.map((task,index)=>{
      if(index === indexTocheck){
        return { ...task, done: !task.done}
      }
      return task
    })
    setTasks(updatedTasks)
  }

  const handleEdit= (indexToEdit)=>{
    setInputVal(tasks[indexToEdit].text)
    setEditIndex(indexToEdit)
  }

  const handleDelete = (indexToDelete) => {
    let updatedTasks = tasks.filter((tasks,index)=>index!==indexToDelete)
    setTasks(updatedTasks)
    setEditIndex(null)
    setInputVal('')
  }

  return (
    <div id='container'>
      <h1 id='heading'>ToDo App</h1>
      <div id="inputArea">
        <input onChange={(event)=>{
          handleInputval(event.target.value)
        }} type="text" value={inputVal} placeholder='Enter new task'/>
        <button onClick={()=>{
          handleAdd(inputVal)
        }} id='add-btn'><img src={editIndex === null? addIcon: saveIcon} alt="add" /></button>
      </div>
      
      <div id="listArea">
        <ul>
          {
            tasks.map((task,index)=>(

              <li id='listItem' key={index}>

                <p onClick={()=>{
                  toggleCheck(index)
                }} id='task-description' style={{textDecoration: task.done? "line-through" : "none", cursor: "pointer"}}>{task.text}</p>

                <div id="updateSection">
                  <button onClick={()=>{
                    handleEdit(index)
                  }} ><img src={editIcon} alt="edit" /></button>

                  <button onClick={()=>{
                  handleDelete(index)
                }} id='delete-btn'><img src={trashIcon} alt="delete" /></button>
                </div>
                
              </li>
  
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default ToDo