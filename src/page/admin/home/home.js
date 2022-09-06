import ThunkApi from "../../../api/admin/category/demoThunk";
import { useEffect} from "react";
import {actionChange} from "../../../state/admin/home/actionHome";
import { useDispatch  } from "react-redux";
import ThunkDemo from "../../../thunk/thunkDemo";
function Home() {
  const dispatch = useDispatch();
   const handle = () => {
    //dispatch(actionChange(2));
   }
    return (<div>
        <button onClick={handle}> click</button>
    </div>);
}
export default Home;