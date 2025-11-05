'use client';

import {
  collection,
  addDoc,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

type Message = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export function saveMessage(db: Firestore, message: Message) {
  const messagesCollection = collection(db, 'messages');
  
  const data = { ...message, createdAt: serverTimestamp() };

  addDoc(messagesCollection, data)
    .catch(async (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: messagesCollection.path,
        operation: 'create',
        requestResourceData: data,
      } satisfies SecurityRuleContext);

      errorEmitter.emit('permission-error', permissionError);
    });
}
