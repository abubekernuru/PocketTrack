import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/user.slice";

function Register() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const {loading, error, currentUser} = useSelector((state)=>state.user);
  const dispatch = useDispatch();


  const handleChange = (e)=> {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(!res.ok){
        dispatch(signInFailure(data.message || "Registration failed!"))
        return;
      }
      if(res.ok){
        navigate('/login')
        console.log(data)
        dispatch(signInSuccess(data))
      }
    } catch (error) {
      console.log(error.message)
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 dark:bg-gray-900 dark:text-white">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 dark:bg-gray-800 dark:text-white">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-white">
          Create Account
        </h1>
        <p className="text-gray-500 mb-6 dark:text-gray-400">
          Start tracking your finances with PocketTrack
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Username */}
          <div>
            <Label htmlFor="username" className="text-gray-700 dark:text-gray-200">
              Username
            </Label>
            <TextInput
              id="username"
              type="text"
              placeholder="John Doe"
              required
              className="mt-1"
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">
              Email
            </Label>
            <TextInput
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              className="mt-1"
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="text-gray-700 dark:text-gray-200">
              Password
            </Label>
            <TextInput
              id="password"
              type="password"
              required
              className="mt-1"
              onChange={handleChange}
            />
          </div>

          {/* Button */}
          <Button
            type="submit"
            disabled={loading}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 cursor-pointer"
          >
            { loading ? "Loading..." : "Create Account"}
          </Button>
          <Alert color="failure" className={`${error ? "block" : "hidden"}`}>
            {error && error}
          </Alert>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-6 text-center dark:text-gray-400">
          Already have an account?{" "}
          <Link to={'/login'} className="text-blue-600 cursor-pointer hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;