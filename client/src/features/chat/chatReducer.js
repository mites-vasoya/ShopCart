import axios from "axios";

const API_URL = "http://localhost:5555";

const fetchChat = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //console.log("Client Chat Reducer : ");
  const response = await axios.get(API_URL + "/chat/fetch", config);

  return response.data;
};

const fetchChatAdmin = async (chatFetchdata, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // //console.log("Reducers : ", chatFetchdata);
  const response = await axios.get(
    API_URL +
      "/chat/admin/fetch/" +
      chatFetchdata.conversationId +
      "/" +
      chatFetchdata.msgStart,
    config
  );

  return response.data;
};

const fetchChatClient = async (chatFetchdata, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // //console.log("Token in Reducers : ", token);
  const response = await axios.get(
    API_URL + "/chat/client/fetch/" + chatFetchdata.msgStart,
    config
  );

  return response.data;
};

const fetchAllConversation = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // //console.log("Response : ");
  const response = await axios.get(
    API_URL + "/chat/fetch/conversations",
    config
  );

  // //console.log("All Conversations : ", response.data);

  return response.data;
};

const saveChat = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // //console.log("Response : ", config);

  const response = await axios.post(API_URL + "/chat/save/chat", data, config);
  // //console.log("Response : ", response.data);

  return response.data;
};

const chatService = {
  saveChat,
  fetchAllConversation,
  fetchChatAdmin,
  fetchChatClient,
};

export default chatService;
