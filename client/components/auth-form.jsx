import React from 'react';

export const AuthForm = () => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  return (

    <>
      <form>
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
          <a href="">Already have an account?</a>
        </div>
      </form>
    </>
  );

};
