# Concept Cove

# Table of Contents
- [Inspiration](#inspiration)
- [How to use](#how-to-use)
- [Additional features](#additional-features)
- [Code Structure](#code-structure)
  - [Frontend](#frontend-typescript-react-tailwind-nextjs)
  - [Backend](#backend-typescript-nestjs)
  - [Database](#database-postgresql)

## Inspiration

Being a hobbyist 3D Artist, I will often go down a rabbit hole searching through concept art on [Artstation](https://www.artstation.com/channels/environmental_concept_design?sort_by=trending&dimension=all) to inspire my next work. I will have many tabs open, save many png's in folders and subfolders, and it would become one big mess. I decided to create a webapplication where I can store my concept art neatly and all in one place. 

## How to use

1. Log in and/or create an account with the login/signup button <br/><img width="500" alt="Screen Shot 2023-08-18 at 10 33 11 PM" src="https://github.com/dannygelman1/ConceptCove/assets/45411340/18fc9de9-4704-4242-b4c4-0bde08aba322">
2. Click the `Create +` button to input a piece of concept art into your database <br/><img width="500" alt="Screen Shot 2023-08-18 at 10 36 16 PM" src="https://github.com/dannygelman1/ConceptCove/assets/45411340/43cd43f4-47dc-4a9f-b2af-793e195dc03e">
3. See your posted concept art!<br/><img width="500" alt="Screen Shot 2023-08-18 at 10 39 50 PM" src="https://github.com/dannygelman1/ConceptCove/assets/45411340/8430ce04-2376-47cc-8cb4-23a0ab1a4468">

## Additional Features

1. You can view the images larger by clicking on them 
<br/><img width="500" alt="Screen Shot 2023-08-18 at 10 40 02 PM" src="https://github.com/dannygelman1/ConceptCove/assets/45411340/5ddd3526-be5a-4a52-b71e-7d36a660658b">
2. You can edit or delete entries with the buttons on the side of each row <br/><img width="500" alt="Screen Shot 2023-08-18 at 10 40 27 PM" src="https://github.com/dannygelman1/ConceptCove/assets/45411340/7f8a2e30-b35b-474c-8115-543185fe851f">
3. You can search over entries with the search bar <br/><img width="500" alt="Screen Shot 2023-08-18 at 10 43 33 PM" src="https://github.com/dannygelman1/ConceptCove/assets/45411340/664b370c-01eb-4302-ad96-39be3abc5aad">



## Code structure
This is the code structure for the overall full-stack application
```mermaid
sequenceDiagram
    index.tsx ->>+ app.tsx: directs to
    app.tsx ->>+ firebase-auth: upon login, app creates/queries user
    firebase-auth ->>+ app.tsx: firebase return user to app
    app.tsx ->>+ concept-cove-api: when user exists, app sends queries/mutations to concept-cove-api for concepts
    concept-cove-api ->>+ app.tsx: concept-cove-api returns concepts by email
    app.tsx ->>+ firebase-storage: app queries/adds images to firebase-storage
    firebase-storage ->>+ app.tsx: firebase return images to app
    concept-cove-api ->>+ concept-cove-db: concept-cove-api reads/writes to db
    concept-cove-db ->>+ concept-cove-api: db returns data to concept-cove-api
``` 
### Frontend (typescript, react, tailwind, Next.js)
This is a single page typescript react application, where I use tailwind for all the styling and Next.js as my framework.

#### Components
- `app.tsx` - this is where you log in/sign up, and query all the concepts
- `fullTable.tsx` - this is displays the title, create button, concepts per page dropdown, search bar, table and previous/next buttons, as well as holding the logic for sorting/filtering the rows
- `row.tsx` - this displays a single row and the edit state of the row
- `inputForm.tsd` - this is displays the input form to submit new entries

#### GraphQL
Each page uses queries and mutations from my `AppService.ts`, which is a light wrapper for the GraphQL queries/mutations in `gqlClient.ts`

For example here is my `getConceptsByEmail` function in  `AppService.ts`:
```
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
```

And here is my `getConceptsByEmail` query in gqlClient.ts:
```
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
```

#### Firebase
- firebase.ts - this file sets up my `firebaseApp` and `firebaseStorage`
- firebaseService.ts - file encapsualtes all the firebase logic in my app. This is used for authentication and image storage.

### Backend (typescript, Nest.js)

### Database (PostgreSQL)




 
