import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { Usercontext } from "../../Store/Userinfo";

export default function Header() {
  const {user, setUser} = useContext(Usercontext)
  const {path} = useRouteMatch()
  const history = useHistory()

  const logout = () => {
    console.log('log out')
    fetch('http://127.0.0.1:8000/api/user/logout', {
      method : 'post',
      headers : {
        'Accept' : 'application/json',
        "Authorization" : `Bearer ${Cookies.get('token')}`
      }
    }).then((res) => {
      if (res.ok) {
        Cookies.remove('token')
        setUser(undefined)
        history.push('/login')
      } else {
        Promise.reject(res)
      }
    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <div className="header">
      <Link to="/">Home</Link>
      {user && <Link to="/profile">{user?.name}</Link>}
      {user && <button onClick={() => logout()}>Log out</button>}
      {!user && path !== '/login' && <Link to='/login'>Login</Link>}
      {!user && path !== '/register' && <Link to='/register'>Register</Link>}

    </div>
  );
}
