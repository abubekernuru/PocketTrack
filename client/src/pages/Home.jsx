import { useSelector, useDispatch } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/user.slice";

function Home() {
  const {loading, error, currentUser} = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  return (
    <div>Welcome to home {currentUser && currentUser.username}</div>
  )
}

export default Home