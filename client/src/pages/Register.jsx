import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();


  const handleChange = (e)=> {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(!res.ok){
        return;
      }
      if(res.ok){
        navigate('/login')
        console.log(data)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Create Account
        </h1>
        <p className="text-gray-500 mb-6">
          Start tracking your finances with PocketTrack
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Username */}
          <div>
            <Label htmlFor="username" className="text-gray-700">
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
            <Label htmlFor="email" className="text-gray-700">
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
            <Label htmlFor="password" className="text-gray-700">
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
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 cursor-pointer"
          >
            Create Account
          </Button>

        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Sign in
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;