import {
  GraphQLClient,
  gql,
  RequestDocument,
  Variables,
} from "graphql-request";
import { Concept, UserType } from "./types";

export class GQLClient {
  private readonly gqlClient: GraphQLClient;

  constructor() {
    this.gqlClient = new GraphQLClient(
      "https://conceptcover-api.onrender.com/graphql"
    );
  }

  async request<Response = any, V = Variables>(
    document: RequestDocument,
    variables?: V
  ): Promise<Response> {
    const response = await this.gqlClient.request<Response>(
      document,
      variables as Variables
    );
    return response;
  }
}

export const GET_CONCEPTS_BY_EMAIL = gql`
  query getConceptsByEmail($email: String!) {
    conceptsByEmail(email: $email) {
      id
      image_id
      title
      artist
      url
      owner_id
      createdAt
    }
  }
`;

export interface getConceptByEmailData {
  conceptsByEmail: Concept[];
}

export interface getConceptByEmailVariables {
  email: string;
}

export const CREATE_CONCEPT = gql`
  mutation createConcept($createConceptInput: CreateConceptInput!) {
    createConcept(createConceptInput: $createConceptInput) {
      id
      image_id
      title
      artist
      url
      owner_id
    }
  }
`;

export interface createConceptData {
  createConcept: {
    id: string;
    image_id: string | null;
    title?: string;
    artist?: string;
    url?: string;
    owner_id: string;
  };
}

export interface createConceptVariables {
  createConceptInput: {
    image_id: string | null;
    title?: string;
    artist?: string;
    url?: string;
    owner_id: string;
  };
}

export const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      name
      email
      firebase_id
    }
  }
`;

export interface createUserData {
  createUser: UserType;
}

export interface createUserVariables {
  createUserInput: {
    name: string;
    email: string;
    firebase_id: string;
  };
}

export const FIND_USER = gql`
  query findUser($email: String!, $firebase_id: String!) {
    findUser(email: $email, firebase_id: $firebase_id) {
      id
      name
      email
      firebase_id
    }
  }
`;

export interface findUserData {
  findUser: UserType;
}

export interface findUserVariables {
  email: string;
  firebase_id: string;
}

export type Image = {
  id: string;
  name: string;
  extension: string;
  url?: string;
};

export const CREATE_IMAGE = gql`
  mutation createImage($createImageInput: CreateImageInput!) {
    createImage(createImageInput: $createImageInput) {
      id
      name
      extension
    }
  }
`;

export interface createImageData {
  createImage: Image;
}

export interface createImageVariables {
  createImageInput: {
    name: string;
    extension: string;
  };
}

export const UPDATE_CONCEPT = gql`
  mutation updateConcept($updateConceptInput: UpdateConceptInput!) {
    updateConcept(updateConceptInput: $updateConceptInput) {
      id
      image_id
      title
      artist
      url
      owner_id
    }
  }
`;

export interface updateConceptData {
  updateConcept: {
    id: string;
    image_id: string | null;
    title: string | null;
    artist: string | null;
    url: string | null;
    owner_id: string;
  };
}

export interface updateConceptVariables {
  updateConceptInput: {
    id: string;
    image_id: string | null;
    title?: string;
    artist?: string;
    url?: string;
  };
}

export const DELETE_CONCEPT = gql`
  mutation deleteConcept($id: String!) {
    deleteConcept(id: $id)
  }
`;

export interface deleteConceptData {
  id: string;
}

export interface deleteConceptVariables {
  id: string;
}
