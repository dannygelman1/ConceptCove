import { createConcept, getConceptsByEmail } from "@/lib/AppService";
import { firebaseStorage } from "@/lib/firebase";
import { Concept, ConceptInput, UserType } from "@/lib/types";
import { getDownloadURL, listAll, ref } from "firebase/storage";

export class User {
  id: string;
  name: string;
  email: string;
  firebase_id: string;

  constructor(user: UserType) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.firebase_id = user.firebase_id;
  }

  async getConcepts(): Promise<Concept[] | undefined> {
    const conceptsData = await getConceptsByEmail(this.email);
    const conceptsWithImages = conceptsData?.conceptsByEmail.map(
      async (concept) => {
        let conceptWithImage = concept;
        if (concept.image_id) {
          const listRef = ref(firebaseStorage, concept.image_id);
          const listUrls = await listAll(listRef);
          if (listUrls.items.length > 0) {
            const imageUrl = await getDownloadURL(listUrls.items[0]);
            conceptWithImage = { ...concept, imageUrl };
          }
        }
        return conceptWithImage;
      }
    );
    if (conceptsWithImages) {
      return Promise.all(conceptsWithImages);
    }
    return [];
  }

  // async addConcept(concept: ConceptInput) {
  //   const conceptData = await createConcept(this.id, concept);
  //   if (conceptData?.createConcept) {
  //     this.concepts.push({
  //       id: conceptData.createConcept.id,
  //       image_id: conceptData.createConcept.image_id,
  //       title: conceptData.createConcept.title,
  //       artist: conceptData.createConcept.artist,
  //       url: conceptData.createConcept.url,
  //       owner_id: conceptData.createConcept.owner_id,
  //     });
  //   }
  // }
}
