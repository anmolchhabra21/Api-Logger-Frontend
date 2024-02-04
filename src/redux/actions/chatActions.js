import {
  fetchByDate,
} from "../../api";

export const ChatActions = {
  FETCH_CHAT_RECORDS_BEGIN: "FETCH_CHAT_RECORDS_BEGIN",
  FETCH_CHAT_RECORDS_SUCCESS_TRACK: "FETCH_CHAT_RECORDS_SUCCESS_TRACK",
  FETCH_BASELINE_CHAT_RECORDS_SUCCESS_TRACK:
    "FETCH_BASELINE_CHAT_RECORDS_SUCCESS_TRACK",
  FETCH_CHAT_RECORDS_ERROR: "FETCH_CHAT_RECORDS_ERROR",
};

export const getChatActions = (dispatch)=>{
  return {
    fetchChatActions: (startDate, endDate) => dispatch(fetchChatActions(startDate, endDate))
  }
}

export const fetchChatActions = (startDate, endDate) => {
    // console.log('chk2')
    return async (dispatch) => {
        // console.log("2")
        dispatch({ type: ChatActions.FETCH_CHAT_RECORDS_BEGIN });
        try {
          // console.log("1")
          const content = await fetchByDate(startDate, endDate);
          const payload = content.data;
          dispatch({
              type: ChatActions.FETCH_CHAT_RECORDS_SUCCESS_TRACK,
              payload
          });
        } catch (error) {
          dispatch({
            type: ChatActions.FETCH_CHAT_RECORDS_ERROR,
            payload: error?.response?.data?.message
          });
          throw error;
        }
    };
};
