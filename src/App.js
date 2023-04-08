import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {
  const [loading, setLoading] =  useState(true)
  const [person, setPerson] = useState(null)
  const [title, setTitle] = useState('name')
  const [value, setValue] = useState('random person')

  const handleValue = (e)=>{
    if(e.target.classList.contains('icon')){
      const newValue = e.target.dataset.label
      setValue(person[newValue])
      setTitle(newValue)
    }
  }

  const fetchPerson = async() =>{
    const resp = await fetch(url)
    const data = await resp.json()
    const person = data.results[0]
    const {phone, email} = person
    const {large:image} = person.picture
    const {login:{password}} = person 
    const {first, last} = person.name
    const {age} = person.dob
    const {street:{number, name}} = person.location
    const newPerson = {
      phone, email, image, password, name:`${first} ${last}`, age, street:`${number}${name}`
    }
    setPerson(newPerson)
    setLoading(false)
    setTitle('name')
    setValue(newPerson.name)
   }

  useEffect(()=>{
    fetchPerson()
  }, [])
  return <main>
    <div className='block bcg-black'>
    </div>
    <div className='block'>
      <div className='container'>
        <img src={(person && person.image) || defaultImage} alt='random user' className='user-img'/>
        <p className='user-title'>my {title} is</p>
        <p className='user-value'>{value}</p>
        <div className='values-list'>
          <button className='icon' data-label='name' onMouseMove={handleValue}><FaUser /></button>
          <button className='icon' data-label='email' onMouseMove={handleValue}><FaEnvelopeOpen /></button>
          <button className='icon' data-label='age' onMouseMove={handleValue}><FaCalendarTimes /></button>
          <button className='icon' data-label='street' onMouseMove={handleValue}><FaMap /></button>
          <button className='icon' data-label='phone' onMouseMove={handleValue}><FaPhone /></button>
          <button className='icon' data-label='password' onMouseMove={handleValue}><FaLock /></button>
        </div>
        <button className='btn' type='button' onClick={fetchPerson}>{loading ? 'loading...' : 'random user'}</button>
      </div>
    </div>
  </main>
}

export default App
