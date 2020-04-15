// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const createRoom = /* GraphQL */ `
  mutation CreateRoom(
    $input: CreateRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    createRoom(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      messages {
        items {
          id
          content
          when
          roomId
          owner
        }
        nextToken
      }
    }
  }
`;
export const updateRoom = /* GraphQL */ `
  mutation UpdateRoom(
    $input: UpdateRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    updateRoom(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      messages {
        items {
          id
          content
          when
          roomId
          owner
        }
        nextToken
      }
    }
  }
`;
export const deleteRoom = /* GraphQL */ `
  mutation DeleteRoom(
    $input: DeleteRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    deleteRoom(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      messages {
        items {
          id
          content
          when
          roomId
          owner
        }
        nextToken
      }
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      content
      when
      roomId
      owner
      room {
        id
        createdAt
        updatedAt
        messages {
          nextToken
        }
      }
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      content
      when
      roomId
      owner
      room {
        id
        createdAt
        updatedAt
        messages {
          nextToken
        }
      }
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      content
      when
      roomId
      owner
      room {
        id
        createdAt
        updatedAt
        messages {
          nextToken
        }
      }
    }
  }
`;
