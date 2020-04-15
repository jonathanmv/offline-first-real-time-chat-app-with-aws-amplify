// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($roomId: ID!) {
    onCreateMessage(roomId: $roomId) {
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
export const onCreateRoom = /* GraphQL */ `
  subscription OnCreateRoom {
    onCreateRoom {
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
export const onUpdateRoom = /* GraphQL */ `
  subscription OnUpdateRoom {
    onUpdateRoom {
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
export const onDeleteRoom = /* GraphQL */ `
  subscription OnDeleteRoom {
    onDeleteRoom {
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
