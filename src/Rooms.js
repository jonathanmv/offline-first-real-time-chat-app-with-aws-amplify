import React, { useEffect } from "react";
import {
  Button,
  IconButton,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  Fab,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import { listRooms } from "./graphql/queries";
import { createRoom, deleteRoom } from "./graphql/mutations";
import { onCreateRoom, onDeleteRoom } from "./graphql/subscriptions";

const LIST_ROOMS = gql(listRooms);

const deleteRoomMutation = (room) => (mutate) => {
  const onClick = () => {
    const id = room.id;
    const optimisticResponse = () => ({
      deleteRoom: room,
    });
    const update = (cache, rawData) => {
      const data = cache.readQuery({ query: LIST_ROOMS });
      data.listRooms.items = [
        ...data.listRooms.items.filter(({ id }) => id !== room.id),
      ];
      cache.writeQuery({ query: LIST_ROOMS, data });
    };
    mutate({ variables: { input: { id } }, optimisticResponse, update });
  };
  return (
    <ListItemSecondaryAction onClick={onClick}>
      <IconButton edge="end" aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction>
  );
};

const RoomsList = ({ rooms, subscribeToMore }) => {
  useEffect(() => {
    const added = subscribeToMore({
      document: gql(onCreateRoom),
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const room = subscriptionData.data.onCreateRoom;
        return Object.assign({}, prev, {
          listRooms: {
            ...prev.listRooms,
            items: [
              room,
              ...prev.listRooms.items.filter(({ id }) => id !== room.id),
            ],
          },
        });
      },
    });
    const removed = subscribeToMore({
      document: gql(onDeleteRoom),
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const room = subscriptionData.data.onDeleteRoom;
        return Object.assign({}, prev, {
          listRooms: {
            ...prev.listRooms,
            items: prev.listRooms.items.filter(({ id }) => id !== room.id),
          },
        });
      },
    });
    return () => Promise.all([added, removed]);
  }, [subscribeToMore]);
  return (
    <List
      subheader={<ListSubheader component="div">Rooms</ListSubheader>}
      dense
    >
      {rooms.map((room) => (
        <ListItem key={room.id} divider>
          <Button style={{ flex: 1 }} component={Link} to={`/room/${room.id}`}>
            <ListItemText
              primary={room.id}
              secondary={room.createdAt || new Date()}
            ></ListItemText>
          </Button>
          <Mutation mutation={gql(deleteRoom)}>
            {deleteRoomMutation(room)}
          </Mutation>
        </ListItem>
      ))}
    </List>
  );
};

const Rooms = (params) => {
  const { data, loading, error, subscribeToMore } = params;

  if (error) {
    return <div>{error.message}</div>;
  }
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <RoomsList rooms={data.listRooms.items} subscribeToMore={subscribeToMore} />
  );
};

const addRoomMutation = (mutate) => {
  const onClick = () => {
    const id = Math.random().toString().split(".")[1];
    const now = new Date().toISOString();
    const optimisticResponse = () => ({
      createRoom: {
        __typename: "Room",
        id,
        createdAt: now,
        updatedAt: now,
        messages: [],
      },
    });
    const update = (cache, { data: { createRoom } }) => {
      const data = cache.readQuery({ query: LIST_ROOMS });
      if (createRoom) {
        data.listRooms.items = [
          createRoom,
          ...data.listRooms.items.filter(({ id }) => id !== createRoom.id),
        ];
      }
      cache.writeQuery({ query: LIST_ROOMS, data });
    };
    mutate({ variables: { input: { id } }, optimisticResponse, update });
  };
  return (
    <Fab
      color="primary"
      onClick={onClick}
      style={{ position: "absolute", bottom: 10, right: 10 }}
    >
      <AddIcon />
    </Fab>
  );
};

export default () => {
  return (
    <>
      <Query query={LIST_ROOMS} fetchPolicy="cache-and-network">
        {Rooms}
      </Query>
      <Mutation mutation={gql(createRoom)}>{addRoomMutation}</Mutation>
    </>
  );
};
