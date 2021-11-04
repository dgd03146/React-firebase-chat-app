import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { getDatabase, ref, child, set } from 'firebase/database';
import md5 from 'md5';

const RegisterPage = props => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState(''); //error 담기 위한 state
  const { loding, setLoading } = useState(false); // submit 버튼 눌렀을때 firebase에서 유저 생성을 처리중 이때는 버튼 더 못 누르게 하기. loading state 생성. 초기값 false로 만듬

  const password = useRef(); //useRef를 이용해서 password를 정의해준다.
  password.current = watch('password'); //password라는 input에 value를 입력할때마다 password.current로 들어감

  const onSubmit = async data => {
    try {
      setLoading(true); //setLoading submit을 눌렀을때 true로

      const auth = getAuth();
      let createdUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      console.log('createdUser', createdUser);

      await updateProfile(auth.currentUser, {
        // 두번째 업데이트 해줄 값들을 넣음.
        displayName: data.name,
        photoURL: `http://gravatar.com/avatar/${md5(
          createdUser.user.email
        )}?d=identicon`,
      });

      //firebase 데이터베이스에 저장해주기
      const database = getDatabase();

      set(child(ref(database, `users`), createdUser.user.uid), {
        name: createdUser.user.displayName,
      }); // uid는 user의 unique한 아이디

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
        <h3 style={{ textAlign: 'center' }}>Register</h3>
        <label>Email</label>
        <input
          name="email"
          type="email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>This email field is required</p>}
        {/* 유효성 체크에 벗어나면 에러 */}

        <label>Name</label>
        <input
          name="name"
          {...register('name', { required: true, maxLength: 10 })}
        />
        {errors.name && errors.name.type === 'required' && (
          <p>This name field is required</p>
        )}
        {/* 이름이 있고 이름의 타입에 위반이 되면 */}
        {errors.name && errors.name.type === 'maxLength' && (
          <p>Your input exceed maximum length</p>
        )}
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
        <label>Password Confirm</label>
        <input
          name="password_confirm"
          type="password"
          {...register('password_confirm', {
            required: true,

            validate: value => value === password.current,
          })}
          //password.current는 password의 value이고 value는 password_confirm의 value이다. 같은지 비교. 같으면 validate했다
        />
        {errors.password_confirm &&
          errors.password_confirm.type === 'required' && (
            <p>This password confirm field is required</p>
          )}
        {errors.password_confirm &&
          errors.password_confirm.type === 'validate' && (
            <p>The password do not match</p>
          )}
        {errorFromSubmit && <p>{errorFromSubmit}</p>}
        {/* error가 있다면 error문구를 보여준다. */}
        <input type="submit" value="Submit" disabled={loding} />
        {/* process가 진행중일때는 input을 못누르게 disabled loading해주면된다. */}
        <Link style={{ color: 'gray', textDecoration: 'none' }} to="login">
          If you already have an account...
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
