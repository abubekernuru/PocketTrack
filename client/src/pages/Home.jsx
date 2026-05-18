import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Home() {
  const {currentUser} = useSelector((state)=>state.user);
  if(currentUser){
    return <Navigate to={"/dashboard"} />
  }
  return (
    <div>Welcome to home {currentUser && currentUser.username}</div>
  )
}

export default Home