import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilSvc = inject(UtilsService);

  // ==================< autenticacion >

  getAuth(){
    return getAuth();
  }

  // ==================< acceder >

  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }
  // ==================< crear cuenta >

  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }
  // ==================< actualizar >

  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }
  // ==================< recuperar cuenta >

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }
  // ==================< salir >

signOut(){
  getAuth().signOut();
  localStorage.removeItem('user');
  this.utilSvc.routerLink('/auth')
}

  //======================< base de datos>

  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  async getDocument(path) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }
}
