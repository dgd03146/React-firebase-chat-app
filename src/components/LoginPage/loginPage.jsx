import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = props => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState(''); //error 담기 위한 state
  const { loding, setLoading } = useState(false); // submit 버튼 눌렀을때 firebase에서 유저 생성을 처리중 이때는 버튼 더 못 누르게 하기. loading state 생성. 초기값 false로 만듬

  const onSubmit = async data => {
    try {
      setLoading(true); //setLoading submit을 눌렀을때 true로
      const auth = getAuth();

      await signInWithEmailAndPassword(auth, data.email, data.password);
      //메소드 만들어서 email,과 password를 넣어서 로그인

      setLoading(false); // loading이 끝나면 false로
    } catch (error) {
      //firebase error가 나면
      setErrorFromSubmit(error.message); //error가 나면 message로 준다.
      setLoading(false);
      setTimeout(() => {
        setErrorFromSubmit('');
      }, 5000); // 5초있다가 error message 사라질수 있게
    }
  };

  return (
    <div className="auth-wrapper">
      <img className="logo" src="images/meeting.jpg" alt="" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 style={{ textAlign: 'center' }}>Login</h3>
        <label>Email</label>
        <input
          name="email"
          type="email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>This email field is required</p>}
        {/* 유효성 체크에 벗어나면 에러 */}

        <label>Password</label>
        <input
          name="password"
          type="password"
          {...register('password', { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === 'required' && (
          <p>This password field is required</p>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <p>Password must have at least 6 characters</p>
        )}

        {errorFromSubmit && <p>{errorFromSubmit}</p>}
        {/* error가 있다면 error문구를 보여준다. */}
        <input type="submit" value="Submit" disabled={loding} />
        {/* process가 진행중일때는 input을 못누르게 disabled loading해주면된다. */}
        <Link style={{ color: 'gray', textDecoration: 'none' }} to="register">
          If you don't have an account...
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
