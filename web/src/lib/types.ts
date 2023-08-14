export interface UserType {
  id: string;
  name: string;
  email: string;
  firebase_id: string;
}

export type Concept = {
  id: string;
  image_id?: string;
  title?: string;
  artist?: string;
  url?: string;
  imageUrl?: string;
  owner_id: string;
  createdAt: string;
};

export type ImageType = {
  id: string;
  name: string;
  extension: string;
  url: string;
};

export type ConceptInput = {
  imageId?: string;
  title?: string;
  artist?: string;
  url?: string;
};

export type UpdateConceptInput = {
  id: string;
  imageId?: string;
  title?: string;
  artist?: string;
  url?: string;
};

export enum SortOrderType {
  Created = "Created",
  CreatedReverse = "CreatedReverse",
  Link = "Link",
  LinkReverse = "LinkReverse",
  Name = "Name",
  NameReverse = "NameReverse",
  Artist = "Artist",
  ArtistReverse = "ArtistReverse",
}
