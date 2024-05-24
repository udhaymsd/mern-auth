import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const {loading, error} = useSelector ((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // setLoading(true); // using useState
      // setError(false);

      dispatch(signInStart()); // redux handling the error 
    const res = await fetch('/api/auth/signin', { // Added comma after URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
   if (data.success === false ) {
       dispatch(signInFailure(data))             // setError(true);
    return;

   }
   dispatch(signInSuccess(data))// setLoading(false)
   navigate('/')
  }
      
    catch (error) {

      dispatch(signInFailure(error))
      // setLoading(false);
      // setError(true);
      
    }
  
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* <input type="text" placeholder="Username" id="username" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} /> */}
        <input type="email" placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} />
        <input type="password" placeholder="Password" id="password" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading ? "loading" : "sign in"}</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p> Dont have an account?</p>
        <Link to='/sign-up'>
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error ? error.message || "something went wrong" : " " }</p>
    </div>
  );
}

