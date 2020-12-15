import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { formatProvinces, formatDistricts, formatLocalities } from '../utils/utils'

const config = {
    apiKey: "<apiKey>",
    authDomain: "<authDomain>",
    projectId: "<projectId>",
    storageBucket: "<storageBucket>",
    messagingSenderId: "<messagingSenderId>",
    appId: "<appId>"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export const db = firebase.firestore();

export const fetchProvinces = async () => {
    try {
        const ref = db.collection('address-tr')
            .doc('address')
            .collection('provinces')
            .orderBy('plate_number', 'asc');
        const snapshot = await ref.get();        
        const provinces = snapshot.docs.map(doc => {
            const { name, plate_number } = doc.data();
            return {
                name,
                plate_number,
                id: doc.id
            };
        });
      
        return formatProvinces(provinces);
    } catch (error) {
        console.log(error);
    }
}

export const fetchDistricts = async (data) => {
    const [province] = data;
    try {
        const ref = db.collection('address-tr')
            .doc('address')
            .collection('provinces')
            .doc(`${province}`)
            .collection('districts')
        const snapshot = await ref.get();
        const districts = snapshot.docs.map(doc => {
            const { name } = doc.data();
            return {
                name
            }
        });

        return formatDistricts(districts);
    } catch (error) {
        console.log(error)
    }
}

export const fetchLocalities = async (data) => {
    const [province, district] = data; 
    
    try {
        const ref = db.collection('address-tr')
            .doc('address')
            .collection('provinces')
            .doc(`${province}`)
            .collection('districts')
            .doc(`${district}`)
            .collection('locality')
            .doc('list')

        const snapshot = await ref.get();
        const localities = snapshot.data().list.map(item => ({
            name: item
        }));
        
        return formatLocalities(localities);
    } catch (error) {
        console.log(error)
    }
}

export default firebase;
