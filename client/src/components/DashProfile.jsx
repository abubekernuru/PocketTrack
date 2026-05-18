import { Alert, Button, Card, Label, Modal, ModalBody, ModalHeader, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserStart, updateSuccess, updateFailure, deleteUserFailure, deleteUserSuccess } from "../redux/user/user.slice";
import { useRef } from "react";
import {logoutSuccess} from "../redux/user/user.slice.js"
import { useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";


function DashProfile() {
  const [formData, setFormData] = useState({});
  const {loading, error, currentUser} = useSelector((state)=>state.user);
  const [updateSuccessMsg, setUpdateSuccessMsg] = useState(null)
  const [imageUploading, setImageUploading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const imageFileRef = useRef();
  const navigate = useNavigate();

  /* cloudinary credentials */
  const cloudName = "dv8q3oyfj";
  const uploadPreset = "profile_preset_2";
  const handleImageUpload = async (e)=>{
    try {
      const file = e.target.files[0]
      const imageFile = new FormData();
      imageFile.append("file", file);
      imageFile.append("upload_preset", uploadPreset)
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
      if(!allowedTypes.includes(file.type)){
        dispatch(updateFailure("Wrong file type, please select an image file only."))
        return
      }
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      setImageUploading(true)
      const res = await fetch(url, {
        method: 'POST',
        body: imageFile
      })
      const data = await res.json();
      if(res.ok){
        console.log(data)
        setFormData((prev)=>({
          ...prev, 
          profilePicture: data.secure_url
        }))
        console.log("Uploaded:", data.secure_url);
      }
    } catch (error) {
      dispatch(updateFailure("Image upload failed. Please try again."))
      console.log(error)
    } finally {
      setImageUploading(false)
    }
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(Object.keys(formData).length === 0){
      return;
    }
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
        dispatch(updateSuccess(data));
        setUpdateSuccessMsg("Profile updated successfully!")
      }
    } catch (error) {
      dispatch(updateFailure(error.message))
    }
  }

    const handleChange = (e)=> {
      dispatch(updateFailure(null))
      setUpdateSuccessMsg(null)  
      setFormData({...formData, [e.target.id]: e.target.value})
    }
  const handleLogout = async ()=> {
      try {
          const res = await fetch(`/api/user/logout`,{
              method:'POST'
          })
          const data = await res.json();
          if(res.ok){
              navigate('/login');
              dispatch(logoutSuccess());
              // alert(data)
          }
      } catch (error) {
          console.log(error)
      }
  }
  const handleDeleteUser = async ()=>{
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      })
      const data = await res.json();
      if(!res.ok){
        setShowModal(false);
        dispatch(deleteUserFailure(data.message))
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  return (
    <div className="" >
        <Card className="max-w-lg mx-auto ">
          <div className="flex flex-col items-center">
            <input type="file" ref={imageFileRef} hidden accept="image/*" onChange={handleImageUpload}/>
            <div className="relative w-24 h-24 mb-3">
              <img
                alt="profile image"
                src={formData.profilePicture || currentUser.profilePicture}
                className="w-24 h-24 rounded-full shadow-lg cursor-pointer 
                object-cover hover:opacity-75 transition-opacity duration-200"
                onClick={()=>imageFileRef.current?.click()}
              />
              {imageUploading && (
                <div className="w-24 h-1 bg-gray-200 rounded-full mt-1 mb-2">
                  <div className="h-1 bg-blue-500 rounded-full animate-pulse w-full"/>
                </div>
              )}
            </div>
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{currentUser.username}</h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">{currentUser.email}</span>
          </div>
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
              color="blue"
              className="mt-2 font-semibold rounded-lg transition duration-200 cursor-pointer"
            >
              { loading ? 
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Updating...</span>
                </>
                : "Update Your Account"}
            </Button>
            <Alert color="failure" className={`${error ? "block" : "hidden"}`}>
              {error && error}
            </Alert>
            {updateSuccessMsg && (
              <Alert color="success" className="mt-2">
                {updateSuccessMsg}
              </Alert>
            )}
          </form>
          <div className="flex justify-between items-center mt-2 pt-4 border-t border-gray-200 dark:border-gray-600">
            <Button color={'red'} outline className="cursor-pointer" onClick={()=>setShowModal(true)}>Delete Account</Button>
            <Button onClick={handleLogout} color={'gray'} className="cursor-pointer">Log Out</Button>
          </div>
        </Card>
          {showModal && (
          <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
            <ModalHeader />
            <ModalBody>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this transaction?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="red" onClick={handleDeleteUser} className="cursor-pointer">
                    Yes, I'm sure
                  </Button>
                  <Button color="alternative" onClick={() => setShowModal(false)} className="cursor-pointer">
                    No, cancel
                  </Button>
                </div>
              </div>
            </ModalBody>
          </Modal>
        )}
      </div>
  );
}

export default DashProfile;