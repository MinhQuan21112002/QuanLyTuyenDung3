import {
    JOB_DETAIL_REQUERST,
    JOB_DETAIL_SUCCESS,
    JOB_DETAIL_ERROR
} from './ActionType';
import axios from "axios";


export const loadJobDetail=(id)=>async (dispatch)=>{

    dispatch({type:JOB_DETAIL_REQUERST});
       
        try {
            let response = await axios.get(`http://localhost:8080/job-posting/${id}`);
            dispatch({type:JOB_DETAIL_SUCCESS,payload : response.data.data});
      
        } catch (error) {
            // console.log("in the logi func catch");
            dispatch({type:JOB_DETAIL_ERROR,payload : error.message});
        }
}