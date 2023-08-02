import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  isSignInWithEmailLink,
  signInWithPopup,
  Unsubscribe,
} from "@firebase/auth";
import { firebaseApp, firebaseStorage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";
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

  isSignInWithEmailLink(link: string): boolean {
    return isSignInWithEmailLink(this.auth, link);
  }

  async signInWithPopup(): Promise<void> {
    const { user } = await signInWithPopup(this.auth, this.provider);

    if (!user) throw new Error("Login Error");
  }

  signOut(): Promise<void> {
    return this.auth.signOut();
  }

  uploadFile(imageId: string, file: File) {
    const testRef = ref(firebaseStorage, `${imageId}/${file.name}`);
    uploadBytes(testRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!: ", snapshot);
    });
  }
}

const firebaseService = new FirebaseService();
export default firebaseService;
