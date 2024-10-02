import {useContext} from 'react';
import {LoginContext} from '../../App.tsx'
import {useNavigate} from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { setIsLogin } = useContext(LoginContext);

  const logout = () => {
    setIsLogin(false)
    navigate('/')
  }

  return (
    <div>
      <button onClick={logout}>Выйти</button>
    </div>
  );
};

export default Profile;