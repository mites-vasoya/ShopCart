import React, { useEffect, useState, useRef } from "react";
import "./ChatAdmin.css";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllConversation,
  fetchChatAdmin,
  saveChat,
} from "../../features/chat/chatSlice";
import InfiniteScroll from "react-infinite-scroll-component";

let currentMsg = [];

function Conversation({ conversation, openConversation, setOpenConversation }) {
  const handleOpenConversation = () => {
    setOpenConversation(conversation.conversationId);
  };
  return (
    <>
      <div className="conversation-tab" onClick={handleOpenConversation}>
        {conversation.clientName}
      </div>
    </>
  );
}

function Message({ message, own }) {
  return (
    <div className={own ? "own-message-admin" : "message-from-other-client"}>
      <div>{message.message}</div>
      <div
        className={own ? "time-of-sent-message" : "time-of-received-message"}
      >
        {/* {//console.log(message.time)} */}
        {message.time.slice(4, 21)}
      </div>
    </div>
  );
}

function Chat() {
  const dispatch = useDispatch();

  const [socket, setSocket] = useState(null);
  const [openConversationId, setOpenConversationId] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [toScroll, setToScroll] = useState(0);
  const { messages, conversations } = useSelector((state) => state.chat);
  const scrollRef = useRef();

  let messageData = messages.messageData;
  let conversationId = "";
  let users = messages.users;
  let senderId = "";
  let receiverId = "";
  let msgStart = 1;

  useEffect(() => {
    if (user && openConversationId === null) {
      dispatch(fetchAllConversation());
    }

    if (openConversationId) {
      const chatFetchdata = {
        conversationId: openConversationId,
        msgStart: msgStart,
      };

      setToScroll(1);
      dispatch(fetchChatAdmin(chatFetchdata));
    }

    const socketIO = io("ws://localhost:8888");
    setSocket(socketIO);
    socketIO.on("connect", () => {
      // //console.log("Connected with Id : ", socketIO.id);
      const socketIdData = {
        userId: user.user._id,
        socketId: socketIO.id,
      };

      if (user.user.role === "admin") {
        socketIO.emit("addActiveAdmin", socketIdData);
      } else if (user.user.role === "buyer") {
        socketIO.emit("addActiveClient", socketIdData);
      }
    });

    socketIO.on("privatemessage", (receivedMessage) => {
      const date = new Date();
      const time = String(date).slice(4, 21);

      const newMessageArea = document.getElementById(
        "new-message-container-id"
      );
      const messageArea = document.getElementById("adminScrollableDiv");
      const div = document.createElement("div");
      div.classList.add("message-from-other-client");

      const messageDiv = document.createElement("div");
      messageDiv.textContent = receivedMessage.message;

      const timeDiv = document.createElement("div");
      timeDiv.classList.add("time-of-received-message");
      timeDiv.textContent = time;

      div.append(messageDiv, timeDiv);

      newMessageArea.append(div);

      messageArea.scrollTop = messageArea.scrollHeight;
    });

    socketIO.on("save-chat", (data) => {
      dispatch(saveChat(data));
    });

    socketIO.on("disconnect", () => {
      // //console.log("Disconnect From....");
    });

    if (scrollRef.current && toScroll === 1) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
      // //console.log("SCROLL VALUE : ", toScroll);
      setToScroll(0);
      // //console.log(" UPDATED SCROLL VALUE : ", toScroll);
    }
  }, [openConversationId]);

  users?.map((id) => {
    if (user.user._id === id) {
      senderId = id;
    } else if (user.user._id !== id) {
      receiverId = id;
    }
  });

  messageData?.map((message) => {
    currentMsg.push(message);
    conversationId = message.conversationId;
  });

  if (openConversationId !== messages.conversationId) {
    // //console.log("New Message : ", newMsg);
    currentMsg = [];
  }

  const handleSendButton = async (e) => {
    const messageValue = document.getElementById("message-box-id").value;

    if (
      (messageValue !== "" && e.keyCode === 13) ||
      (messageValue !== "" && e.type === "click")
    ) {
      const date = new Date();
      const t = String(date).slice(4, 21);
      const message = {
        conversationId: conversationId,
        senderId: senderId,
        receiverId: receiverId,
        message: messageValue,
        time: String(date),
      };

      const newMessageArea = document.getElementById(
        "new-message-container-id"
      );
      const messageArea = document.getElementById("adminScrollableDiv");
      const div = document.createElement("div");
      div.classList.add("own-message-admin");

      const messageDiv = document.createElement("div");
      messageDiv.textContent = message.message;

      const timeDiv = document.createElement("div");
      timeDiv.classList.add("time-of-sent-message");
      timeDiv.textContent = t;

      div.append(messageDiv, timeDiv);

      newMessageArea.append(div);

      socket.emit("sendMessage", message);

      messageArea.scrollTop = messageArea.scrollHeight;

      document.getElementById("message-box-id").value = "";
    }
  };

  const fetchMoreData = () => {
    msgStart = messageData.length + 1;
    //Dispatch Request to fetch new chat...
    const chatFetchdata = {
      conversationId: openConversationId,
      msgStart: messages.nextMsgFrom,
    };
    dispatch(fetchChatAdmin(chatFetchdata));
  };

  return (
    <>
      <div className="chat-page-div">
        <div className="all-conversation-div">
          {conversations.map((conversation) => {
            return (
              <Conversation
                conversation={conversation}
                openConversation={openConversationId}
                setOpenConversation={setOpenConversationId}
              />
            );
          })}
        </div>
        {openConversationId !== null ? (
          <>
            <div className="chat-message-div">
              <div id="adminScrollableDiv">
                <InfiniteScroll
                  dataLength={currentMsg.length}
                  next={fetchMoreData}
                  style={{
                    display: "flex",
                    flexDirection: "column-reverse",
                    overflow: "none",
                  }} //To put endMessage and loader to the top.
                  inverse={true} //
                  hasMore={messages.moreMsg}
                  loader={<h4>Loading...</h4>}
                  scrollableTarget="adminScrollableDiv"
                >
                  <div id="new-message-container-id"></div>
                  {currentMsg.map((message) => (
                    <Message
                      message={message}
                      own={message.senderId === user.user._id}
                    />
                  ))}
                </InfiniteScroll>
              </div>
              <div className="chat-box-button">
                <input
                  type="text"
                  name="message"
                  className="message-box"
                  id="message-box-id"
                  onKeyUp={handleSendButton}
                />
                <button
                  className="send-message-button"
                  onClick={handleSendButton}
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="welcome-chat-div">
              <div></div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Chat;
