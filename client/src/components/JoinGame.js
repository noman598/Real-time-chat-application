import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";
import CustomInput from "./CustomInput";
function JoinGame() {
  const [rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext(); //client Object.
  // When you call the useChatContext hook, it returns an object that contains various properties and methods related to the {Stream Chat client}. 


  const [channel, setChannel] = useState(null);

  const createChannel = async () => {
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });

    if (response.users.length === 0) {
      alert("User not found");
      return;
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });
    // Here, you are using the client.channel() method to create a new chat channel. The method takes two arguments:

// The first argument is the type of the channel, which is set to "messaging" in this case. You can use different channel types based on your application's requirements.

// The second argument is an object that specifies the channel configuration. In this case, you are providing a members array that contains two user IDs. The first ID is client.userID, which represents the ID of the currently logged-in user. The second ID is response.users[0].id, which likely represents the ID of another user you fetched from some response data.

    await newChannel.watch();
    setChannel(newChannel);
  };
  return (
    <>
      {channel ? (
        <Channel channel={channel} Input={CustomInput}>
          <Game channel={channel} setChannel={setChannel} />
        </Channel>
      ) : (
        <div className="joinGame">
          <h4>Create Game</h4>
          <input
          // So to making connection between two user here we are using the username of 2nd user to get connect with us for chatting and playing game, instead of UserId (cause no one remember id).
            placeholder="Username of rival..."
            onChange={(event) => {
              setRivalUsername(event.target.value);
            }}
          />
          <button onClick={createChannel}> Join/Start Game</button>
        </div>
      )}
    </>
  );
}

export default JoinGame;
