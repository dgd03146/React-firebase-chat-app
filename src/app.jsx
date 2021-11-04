import { React, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import ChatPage from './components/ChatPage/chatPage';
import LoginPage from './components/LoginPage/loginPage';
import RegisterPage from './components/RegisterPage/registerPage';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/actions/user_action';
import firebase from './firebase';

function App(props) {
  let history = useHistory();
  let dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.isLoading);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (user) {
        //user가 있으면 로그인이 된것
        //로그인이 된 상태
        history.push('/'); //react-router-dom에서 제공해주는 페이지 이동. 가고싶은 경로 push안에다가 넣음
        dispatch(setUser(user)); //redux store에 user정보 담음 //로그인이 된 상태일때 user의 정보를 setUser 리덕스 스토어에 넣어준다.
      } else {
        history.push('/login'); //login되지 않았으면 login page로 이동
      }
    }); // user의 상태를 지켜보는부분
  }, []);

  if (isLoading) {
    return <div>...loading</div>; // isLoading이 true이면 loading중입니다.
  } else {
    return (
      <Switch>
        <Route exact path="/" component={ChatPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    );
  }
}

export default App;
