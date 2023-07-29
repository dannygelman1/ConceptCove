import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  isSignInWithEmailLink,
  signInWithPopup,
  Unsubscribe,
} from "@firebase/auth";

import firebase from "@/lib/firebase";

export interface AuthUser {
  email: string | null;
  idToken?: string;
}

class FirebaseService {
  currentUser: AuthUser | undefined;
  readonly auth: Auth = getAuth(firebase);
  private readonly provider: GoogleAuthProvider = new GoogleAuthProvider();

  async idToken(): Promise<string | undefined> {
    const idToken = (await this.auth.currentUser?.getIdToken()) || undefined;
    if (this.currentUser) this.currentUser.idToken = idToken;
    return this.auth.currentUser?.getIdToken() || Promise.resolve(undefined);
  }

  onAuthStateChanged(fn: (loggedIn: boolean) => void): Unsubscribe {
    return this.auth.onAuthStateChanged(
      (user) => fn(Boolean(user)),
      () => fn(false)
    );
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
}

const firebaseService = new FirebaseService();
export default firebaseService;
