import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyBn3_dFW8VWwc0v-KoAw0CavH9w0mpLNuU",
    authDomain: "real-estate-cms-d65dc.firebaseapp.com",
    databaseURL: "https://real-estate-cms-d65dc.firebaseio.com",
    projectId: "real-estate-cms-d65dc",
    storageBucket: "real-estate-cms-d65dc.appspot.com",
    messagingSenderId: "916874757043",
    appId: "1:916874757043:web:4696def048779faf3901c6",
    measurementId: "G-80CWWWNEGB"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const db = firebase.firestore();

export const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
};

export const logout = () => {
    return auth.signOut();
};

export const fetchProvinces = async () => {
    try {
        const ref = db.collection('provinces').orderBy('plaka', 'asc');
        const snapshot = await ref.get();

        const provinces = snapshot.docs.map(doc => {
            const { name, plaka } = doc.data();
            return {
                name,
                plaka
            };
        });
        return provinces;
    } catch (error) {
        console.log(error);
    }
}

export const fetchDistricts = async (province) => {
    try {
        const ref = db.collection('provinces')
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
        const ref = db.collection('provinces')
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
