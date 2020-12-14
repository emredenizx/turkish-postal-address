const fileName = (text) => {
    const trim = text.split(".")[0];
    return trim[0].toUpperCase() + trim.substring(1);
};

const initializeDb = async(db) => {
    try {
        const collection = db.collection('address-tr');
        await collection.doc('address').set({
            address: 'address'
        });
        console.log('DB Initialized ✅')        
    } catch (error) {
        console.log('Error! ❌');
    }
}

// İl
const batchWriteProvinces = async (provinces, db, file) => {
    try {
        const collection = db.collection('address-tr');
        const batch = db.batch();

        provinces.forEach(province => {
            const newDocRef = collection
                .doc('address')
                .collection('provinces')
                .doc(`${province.id}`);
            batch.set(newDocRef, {
                name: `${province.name}`,
                plate_number: province.plate_number
            });
        });
        await batch.commit();
        console.log(`${fileName(file)} ✅`);
        return;
    } catch (error) {
        console.log('Error! ❌');
    }
}

//İlçe
const batchWriteDistricts = async (districts, db, file) => {
    try {
        const collection = db.collection('address-tr');
        const batch = db.batch();

        districts.forEach(district => {
            const newDocRef = collection
                .doc('address')
                .collection('provinces')
                .doc(`${district.province}`)
                .collection('districts')
                .doc(`${district.name}`);
            batch.set(newDocRef, {
                name: `${district.name}`
            });
        });
        await batch.commit();
        console.log(`${fileName(file)} ✅`);
        return;
    } catch (error) {
        console.log('Error! ❌');
    }
}

//Mahalle
const batchWriteLocalities = async (localities, db, file) => {
    try {
        const collection = db.collection('address-tr');
        const batch = db.batch();

        localities.forEach(locality => {
            const newDocRef = collection
                .doc('address')
                .collection('provinces')
                .doc(locality.province)
                .collection('districts')
                .doc(locality.district)
                .collection('locality')
                .doc('list');

            batch.set(newDocRef, {
                list: locality.localities
            });
        });
        await batch.commit();
        console.log(`Localities: ${fileName(file)} ✅`);
        return;
    } catch (error) {
        console.log('Error! ❌')
    }
}

module.exports = {
    initializeDb,
    batchWriteDistricts,
    batchWriteProvinces,
    batchWriteLocalities
}
