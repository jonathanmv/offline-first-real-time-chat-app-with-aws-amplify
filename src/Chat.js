import React, { useEffect } from "react";
import { GiftedChat } from "react-web-gifted-chat";

const styles = {
  container: {
    flex: 1,
    height: "100vh",
  },
};

export default (props) => {
  const { onSend, loading, error, data, user, subscribeToNewMessages } = props;

  useEffect(() => subscribeToNewMessages(), [subscribeToNewMessages]);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const { getRoom } = data;
  const messages = getRoom ? getRoom.messages.items : [];
  const texts = messages.map((m) => ({
    id: m.id,
    text: m.content,
    createdAt: new Date(m.when),
    user: { id: m.owner, name: m.owner },
  }));

  return (
    <div style={styles.container}>
      <GiftedChat
        onSend={(messages) => messages.map(onSend)}
        user={{ id: user, name: user }}
        messages={texts}
      />
    </div>
  );
};
