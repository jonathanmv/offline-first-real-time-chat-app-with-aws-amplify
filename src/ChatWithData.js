import React from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import { createMessage } from "./graphql/mutations.ts";
import { getRoom } from "./graphql/queries.ts";
import { onCreateMessage } from "./graphql/subscriptions.ts";

import { useUser } from "./helpers";
import Chat from "./Chat";

const GET_ROOM_QUERY = gql(getRoom);

const subscribe = (subscribeToMore, roomId) => () => {
  subscribeToMore({
    document: gql(onCreateMessage),
    variables: { roomId },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) {
        return prev;
      }
      const newMessage = subscriptionData.data.onCreateMessage;
      return Object.assign({}, prev, {
        getRoom: {
          ...prev.getRoom,
          messages: {
            ...prev.getRoom.messages,
            items: [
              newMessage,
              ...prev.getRoom.messages.items.filter(
                ({ id }) => id !== newMessage.id
              ),
            ],
          },
        },
      });
    },
  });
};

const onSend = (mutate, room) => (giftedChatMessage) => {
  const roomId = room.id;
  const message = {
    id: giftedChatMessage.id,
    content: giftedChatMessage.text,
    when: giftedChatMessage.createdAt,
    roomId,
    owner: giftedChatMessage.user.id,
  };

  mutate({
    variables: {
      input: message,
    },
    optimisticResponse: () => {
      return {
        createMessage: {
          __typename: "Message",
          room,
          ...message,
        },
      };
    },
    update: (cache, { data: { createMessage } }) => {
      const data = cache.readQuery({
        query: GET_ROOM_QUERY,
        variables: { id: roomId },
      });

      data.getRoom.messages.items = [
        createMessage,
        ...data.getRoom.messages.items.filter(
          ({ id }) => id !== createMessage.id
        ),
      ];

      cache.writeQuery({
        query: GET_ROOM_QUERY,
        variables: { id: roomId },
        data,
      });
    },
  });
};

const ChatWithData = ({ match }) => {
  const user = useUser();
  if (!user) {
    return null;
  }

  const { username } = user;
  const { roomId } = match.params;

  return (
    <Query
      variables={{ id: roomId }}
      query={GET_ROOM_QUERY}
      fetchPolicy="cache-and-network"
    >
      {({ data, subscribeToMore, ...results }) => {
        const room = data.getRoom;
        return (
          <Mutation mutation={gql(createMessage)}>
            {(mutate) => (
              <Chat
                {...results}
                user={username}
                data={data}
                subscribeToNewMessages={subscribe(subscribeToMore, roomId)}
                onSend={onSend(mutate, room, username)}
              />
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};

export default ChatWithData;
