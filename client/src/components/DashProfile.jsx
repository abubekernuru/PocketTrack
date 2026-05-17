import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserStart, updateSuccess, updateFailure } from "../redux/user/user.slice";

function DashProfile() {
  const [formData, setFormData] = useState({});
  const {loading, error, currentUser} = useSelector((state)=>state.user);
  const dispatch = useDispatch();


  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(!res.ok){
        dispatch(updateFailure(data.message || "Registration failed!"))
        return;
      }
      if(res.ok){
        dispatch(updateSuccess(data))
      }
    } catch (error) {
      dispatch(updateFailure(error.message))
    }
  }

    const handleChange = (e)=> {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 dark:bg-gray-900 dark:text-white">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 dark:bg-gray-800 dark:text-white">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-white">
          Update Your Account
        </h1>

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
              defaultValue={currentUser.username}
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
              defaultValue={currentUser.email}
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
            { loading ? "Loading..." : "Update Account"}
          </Button>
          <Alert color="failure" className={`${error ? "block" : "hidden"}`}>
            {error && error}
          </Alert>
        </form>

      </div>
    </div>
  );
}

export default DashProfile;