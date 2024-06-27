// chatSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const fetchData = createAsyncThunk("chat/fetchData", async (phoneNumber) => {
  try {
    const [
      userResponse,
      conversationResponse,
      allUsersResponse,
      messagesResponse,
    ] = await Promise.all([
      fetch("http://localhost:3000/users"),
      fetch("http://localhost:3000/conversations"),
      fetch("http://localhost:3000/users"),
      fetch("http://localhost:3000/messages"),
    ]);

    const [userJson, conversations, allUsers, messages] = await Promise.all([
      userResponse.json(),
      conversationResponse.json(),
      allUsersResponse.json(),
      messagesResponse.json(),
    ]);

    const user = userJson.find((user) => user.soDienThoai === phoneNumber);
    const myID = user.id;
    const myName = user.ten;

    const filteredChats = conversations.filter((conversation) =>
      conversation.participants.includes(myID)
    );

    const groupChats = [];
    const oneChats = [];

    filteredChats.forEach((conversation) => {
      const participants = conversation.participants.filter(
        (id) => id !== myID
      );

      if (participants.length > 1) {
        // Group chat
        groupChats.push({
          id: conversation.id,
          chatID: conversation.id,
          type: "group",
          lastMessages:
            getLastMessage(messages, conversation.id)?.content || "",
          timeLastMessages:
            getLastMessage(messages, conversation.id)?.timestamp || 0,
          name: conversation.name || "Group Chat",
          nameSendLastMessage: userJson.find(
            (user) =>
              user.id ===
              parseInt(getLastMessage(messages, conversation.id)?.senderId || 0)
          ).ten,
        });
      } else {
        // One-on-one chat
        const otherUserID = participants[0];
        const otherUser = allUsers.find((user) => user.id === otherUserID);

        oneChats.push({
          id: conversation.id,
          chatID: conversation.id,
          type: "one",
          lastMessages:
            getLastMessage(messages, conversation.id)?.content || "",
          timeLastMessages:
            getLastMessage(messages, conversation.id)?.timestamp || 0,
          name: otherUser.ten,
          nameSendLastMessage: userJson.find(
            (user) =>
              user.id ===
              parseInt(getLastMessage(messages, conversation.id)?.senderId || 0)
          ).ten,
        });
      }
    });

    const mergedData = [...groupChats, ...oneChats];

    return mergedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
});

// Helper function to get the last message in a conversation
const getLastMessage = (messages, conversationId) => {
  const conversationMessages = messages.filter(
    (message) => message.conversationId === conversationId
  );

  const sortedMessages = conversationMessages.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  return sortedMessages.length > 0 ? sortedMessages[0] : null;
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {})
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {});
  },
});

export { fetchData };
export const { setMyID } = chatSlice.actions;
export default chatSlice.reducer;
