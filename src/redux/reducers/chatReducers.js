import { ChatActions } from "../actions/chatActions";
import produce from "immer";

const initialState = {
  chatRecords: null,
  loading: false,
  error: null
};

const chatReducer = produce((draft, action) => {
  switch (action.type) {
    case ChatActions.FETCH_CHAT_RECORDS_BEGIN:
      // console.log("anmol");
      draft.loading = true;
      return;
    case ChatActions.FETCH_CHAT_RECORDS_SUCCESS_TRACK:
      // console.log("anmol2");
      draft.loading = false;
      draft.chatRecords = action.payload;
      return;
    case ChatActions.RENDER_DYNAMIC_FORM:
      draft.loading = false;
      draft.renderDynamicForm = action.payload;
      return;
    case ChatActions.FETCH_CHAT_RECORDS_ERROR:
      draft.loading = false;
      draft.error = action.payload;
      return;
    default:
      return;
  }
}, initialState);

export default chatReducer;
