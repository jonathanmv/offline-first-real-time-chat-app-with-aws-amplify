// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const getRoom = /* GraphQL */ `
  query GetRoom($id: ID!) {
    getRoom(id: $id) {
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
export const listRooms = /* GraphQL */ `
  query ListRooms(
    $filter: ModelRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        messages {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        when
        roomId
        owner
        room {
          id
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
