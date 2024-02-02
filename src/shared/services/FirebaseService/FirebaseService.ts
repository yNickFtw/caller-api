import { IFirebaseService } from './IFirebaseService'
import firebaseConfig from '../../config/firebase-config'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { FirebaseStorage, StorageReference, getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from 'firebase/storage'
import { Express } from 'express'

export default class FirebaseService implements IFirebaseService {
    firebaseApp: FirebaseApp;
    firebaseStorage: FirebaseStorage;

    constructor() {
        this.firebaseApp = initializeApp(firebaseConfig);
        this.firebaseStorage = getStorage(this.firebaseApp);
    }

    public async uploadImage(filename: string, folder: string, buffer: Buffer, mimetype: string): Promise<string> {
        const storageRef = ref(this.firebaseStorage, `${folder}/${filename}.png`);

        await uploadBytes(storageRef, buffer, {
            contentType: mimetype
        })

        const url = await getDownloadURL(storageRef)

        return url;
    }

    public async deleteImage(filename: string, folder: string): Promise<void> {
        const storageRef = ref(this.firebaseStorage, `${folder}/${filename}.png`);


        await deleteObject(storageRef);
    }
}
