import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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
        return provinces;
    } catch (error) {
        console.log(error);
    }
}

export const fetchDistricts = async (province) => {
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
        return districts;
    } catch (error) {
        console.log(error)
    }
}

export const fetchLocalities = async (province, district) => {
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

        return localities;
    } catch (error) {
        console.log(error)
    }
}

export default firebase;
