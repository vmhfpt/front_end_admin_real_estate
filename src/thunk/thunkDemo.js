import ThunkApi from "../api/admin/category/demoThunk";
import { actionChange } from "../state/admin/home/actionHome";
const ThunkDemo = async (dispatch) => {
    const response = await ThunkApi .getApi();
    if(response) dispatch(actionChange(response.state));
}
export default ThunkDemo;