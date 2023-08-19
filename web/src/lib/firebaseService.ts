import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  isSignInWithEmailLink,
  signInWithPopup,
  Unsubscribe,
} from "@firebase/auth";
import { firebaseApp, firebaseStorage } from "./firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { User } from "@/models/user";

class FirebaseService {
  currentUser: User | undefined;
  readonly auth: Auth = getAuth(firebaseApp);
  private readonly provider: GoogleAuthProvider = new GoogleAuthProvider();

  onAuthStateChanged(fn: (loggedIn: boolean) => void): Unsubscribe {
    return this.auth.onAuthStateChanged(
      (user) => fn(Boolean(user)),
      () => fn(false)
    );
  }

  set user(user: User | undefined) {
    this.currentUser = user;
  }

  async signInWithPopup(): Promise<void> {
    const { user } = await signInWithPopup(this.auth, this.provider);

    if (!user) throw new Error("Login Error");
  }

  signOut(): Promise<void> {
    return this.auth.signOut();
  }

  async uploadFile(imageId: string, file: File) {
    const testRef = ref(firebaseStorage, `${imageId}/${file.name}`);
    await uploadBytes(testRef, file);
  }

  async getImageUrl(name: string): Promise<string | undefined> {
    const listRef = ref(firebaseStorage, name);
    const listUrls = await listAll(listRef);
    if (listUrls.items.length > 0) {
      const imageUrl = await getDownloadURL(listUrls.items[0]);
      return imageUrl;
    }
  }
}

const firebaseService = new FirebaseService();
export default firebaseService;
