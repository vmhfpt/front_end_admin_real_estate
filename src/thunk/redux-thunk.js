const thunkMiddleware = ({dispatch, getState}) => next => action => {
  // console.log(action);
  console.log('run')
} 
export default thunkMiddleware;