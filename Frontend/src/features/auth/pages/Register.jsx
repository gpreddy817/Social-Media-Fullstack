import React from 'react'
import { Link } from 'react-router'

const Register = () => {
  const handlesubmit=(e)=>{
    e.preventdefault()
  } 

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onsubmit={handlesubmit}>
          <input type="text" name='username' id='username' placeholder='Enter username'/>
          <input type="email" name='email' id='email' placeholder='Enter email'/>
          <input type="password" name='password' id='password' placeholder='Enter password'/>
          <button className='button primary-button' type="submit">Login</button>
        </form>
        <p>Already have an account? <Link to="/login">Login.</Link></p>
      </div>
    </main>
  )
}

export default Register