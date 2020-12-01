import { db } from '../firebase/firebase.js';

// İl
export const batchWriteProvinces = async (provinces) => {
    const collection = db.collection('provinces');
    const batch = db.batch();

    provinces.forEach(province => {
        const newDocRef = collection.doc(`${province.id}`);
        batch.set(newDocRef, {
            name: `${province.name}`,
            plaka: province.plaka
        });
    });

    return await batch.commit();
}

//İlçe
export const batchWriteDistricts = async (districts) => {
    const collection = db.collection('provinces');
    const batch = db.batch();

    districts.forEach(district => {
        const newDocRef = collection.doc(`${district.province}`).collection('districts').doc(`${district.name}`);
        batch.set(newDocRef, {
            name: `${district.name}`
        });
    });

    return await batch.commit();

}

//Mahalle
export const batchWriteLocalities = async (localities) => {

    const collection = db.collection('provinces');
    const batch = db.batch();

    localities.forEach(locality => {
        const newDocRef = collection
            .doc(locality.province)
            .collection('districts')
            .doc(locality.district)
            .collection('locality')
            .doc('list');

        batch.set(newDocRef, {
            list: locality.localities
        });
    });

    return await batch.commit();

}