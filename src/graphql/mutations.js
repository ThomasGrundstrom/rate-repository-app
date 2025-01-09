import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation authenticate($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation Mutation($owner: String!, $repository: String!, $rating: Int!, $review: String) {
    createReview(review: {
      ownerName: $owner, repositoryName: $repository, rating: $rating, text: $review
    }) {
      createdAt
      id
      rating
      repositoryId
      text
      userId
    }
  }
`;

export const CREATE_USER = gql`
  mutation Mutation($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      createdAt
      id
      reviewCount
      username
    }
  }
`;