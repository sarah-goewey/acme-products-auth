import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createUser} from './store'

const Register = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const create = async(ev) => {
    ev.preventDefault()
    try {
      await dispatch(createUser({username, password}))
    }
    catch(ex) {
      console.log(ex)
    }
  }

 return (
  <form onSubmit={ create }>
      <input placeholder='username' value={ username } onChange={ ev => setUsername(ev.target.value)}/>
      <input placeholder='password' value={ password } onChange={ ev => setPassword(ev.target.value)}/>
      <button>Register</button>
  </form>
 )
}

export default Register