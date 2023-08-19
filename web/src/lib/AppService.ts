import {
  CREATE_CONCEPT,
  createConceptData,
  createConceptVariables,
  GQLClient,
  CREATE_USER,
  createUserVariables,
  createUserData,
  getConceptByEmailData,
  getConceptByEmailVariables,
  GET_CONCEPTS_BY_EMAIL,
  findUserData,
  FIND_USER,
  findUserVariables,
  createImageData,
  createImageVariables,
  CREATE_IMAGE,
  updateConceptData,
  updateConceptVariables,
  UPDATE_CONCEPT,
  deleteConceptVariables,
  DELETE_CONCEPT,
  deleteConceptData,
} from "@/lib/gqlClient";
import { ConceptInput, UpdateConceptInput } from "./types";

const gql = new GQLClient();

export const createConcept = async (
  owner_id: string,
  concept: ConceptInput
): Promise<createConceptData | null> => {
  const conceptData = await gql.request<
    createConceptData,
    createConceptVariables
  >(CREATE_CONCEPT, {
    createConceptInput: {
      image_id: concept.imageId ?? null,
      title: concept.title,
      artist: concept.artist,
      url: concept.url,
      owner_id,
    },
  });
  return conceptData;
};

export const updateConcept = async (
  concept: UpdateConceptInput
): Promise<updateConceptData | null> => {
  const conceptData = await gql.request<
    updateConceptData,
    updateConceptVariables
  >(UPDATE_CONCEPT, {
    updateConceptInput: {
      id: concept.id,
      image_id: concept.imageId ?? null,
      title: concept.title,
      artist: concept.artist,
      url: concept.url,
    },
  });
  return conceptData;
};

export const deleteConcept = async (id: string): Promise<deleteConceptData> => {
  const conceptData = await gql.request<
    deleteConceptData,
    deleteConceptVariables
  >(DELETE_CONCEPT, {
    id,
  });
  return conceptData;
};

export const createUser = async (
  name: string,
  email: string,
  firebase_id: string
): Promise<createUserData> => {
  const userData = await gql.request<createUserData, createUserVariables>(
    CREATE_USER,
    {
      createUserInput: {
        name,
        email,
        firebase_id,
      },
    }
  );
  return userData;
};

export const findUser = async (
  email: string,
  firebase_id: string
): Promise<findUserData | undefined> => {
  const userData = await gql.request<findUserData, findUserVariables>(
    FIND_USER,
    {
      email,
      firebase_id,
    }
  );
  return userData;
};

export const getConceptsByEmail = async (
  email: string
): Promise<getConceptByEmailData | null> => {
  const conceptsData = await gql.request<
    getConceptByEmailData,
    getConceptByEmailVariables
  >(GET_CONCEPTS_BY_EMAIL, {
    email,
  });
  return conceptsData;
};

export const createImage = async (
  name: string,
  extension: string
): Promise<createImageData> => {
  const imageData = await gql.request<createImageData, createImageVariables>(
    CREATE_IMAGE,
    {
      createImageInput: {
        name,
        extension,
      },
    }
  );
  return imageData;
};
