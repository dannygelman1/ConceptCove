import {
  GET_CONCEPT,
  getConceptData,
  getConceptVariables,
  CREATE_CONCEPT,
  createConceptData,
  createConceptVariables,
  GQLClient,
  getConceptsData,
  GET_CONCEPTS,
  Concept,
} from "@/lib/gqlClient";
import { Dispatch, SetStateAction } from "react";

const gql = new GQLClient();

export const createConcept = async (
  image_id?: string,
  title?: string,
  artist?: string,
  url?: string
): Promise<createConceptData> => {
  const conceptData = await gql.request<
    createConceptData,
    createConceptVariables
  >(CREATE_CONCEPT, {
    createConceptInput: {
      image_id,
      title,
      artist,
      url,
    },
  });
  return conceptData;
};

export const getConcept = async (id: string): Promise<getConceptData> => {
  const conceptData = await gql.request<getConceptData, getConceptVariables>(
    GET_CONCEPT,
    {
      id,
    }
  );
  return conceptData;
};

export const getConcepts = async (
  setConcepts: Dispatch<SetStateAction<Concept[]>>
): Promise<getConceptsData> => {
  const conceptsData = await gql.request<getConceptsData>(GET_CONCEPTS);
  setConcepts(conceptsData.allConcepts);
  return conceptsData;
};
