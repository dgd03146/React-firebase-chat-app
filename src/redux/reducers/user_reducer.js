import { SET_USER } from '../actions/types';

const initialUserState = {
  currentUser: null, //유저정보를 currentUser에다가 넣는다.
  isLoading: true, //로딩하고 있다. 로그인이 끝나면 false로 바꾼다.
};

export default function saga(state = initialUserState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state, //처음에 state 넣어주고
        currentUser: action.payload, //payload정보를 넣어줌
        isLoading: false,
      };
    default:
      //맞는 타입이 없다면
      return state;
  }
}
