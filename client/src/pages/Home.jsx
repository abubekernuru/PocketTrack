import { useSelector } from "react-redux";

function Home() {
  const {currentUser} = useSelector((state)=>state.user);
  return (
    <div>Welcome to home {currentUser && currentUser.username}</div>
  )
}

export default Home