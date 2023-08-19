import { getConceptsByEmail } from "@/lib/AppService";
import firebaseService from "@/lib/firebaseService";
import { Concept, UserType } from "@/lib/types";

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
          const imageUrl = await firebaseService.getImageUrl(concept.image_id);
          if (imageUrl) {
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
}
