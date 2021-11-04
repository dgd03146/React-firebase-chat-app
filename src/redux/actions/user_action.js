import { SET_USER, SET_PHOTO_URL } from './types';

export function setUser(user) {
  //firebase에서 가지고온 로그인 된 유저정보
  return {
    type: SET_USER,
    payload: user,
  };
}

export function setPhotoURL(photoURL) {
  return {
    type: SET_PHOTO_URL,
    payload: photoURL,
  };
}
