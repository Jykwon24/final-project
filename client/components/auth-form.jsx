import React from 'react';

export const AuthForm = () => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  return (
    <>
      <form>
        <div>
          <h2>User Log In</h2>
        </div>
        <div>
          <label htmlFor="">
            Username:
          </label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">
            Password:
          </label>
          <input type="text" />
        </div>
        <div>
          <button>Register</button>
          <a href="">First time? Sign up here</a>
        </div>
      </form>
    </>
  );

};
