import {
  GraphQLClient,
  gql,
  RequestDocument,
  Variables,
} from "graphql-request";

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
    console.log("hey: ", variables);
    const response = await this.gqlClient.request<Response>(
      document,
      variables as Variables
    );
    console.log("hi");
    return response;
  }
}

export const GET_CONCEPT = gql`
  query getConcept($id: String!) {
    concept(id: $id) {
      id
      image_id
      title
      artist
      url
    }
  }
`;

export interface getConceptData {
  getConcept: {
    id: string;
    image_id?: string;
    title?: string;
    artist?: string;
    url?: string;
  } | null;
}

export interface getConceptVariables {
  id: string;
}

export const CREATE_CONCEPT = gql`
  mutation createConcept($createConceptInput: CreateConceptInput!) {
    createConcept(createConceptInput: $createConceptInput) {
      id
      image_id
      title
      artist
      url
    }
  }
`;

export interface createConceptData {
  createConcept: {
    id: string;
    image_id?: string;
    title?: string;
    artist?: string;
    url?: string;
  };
}

export interface createConceptVariables {
  createConceptInput: {
    image_id?: string;
    title?: string;
    artist?: string;
    url?: string;
  };
}
