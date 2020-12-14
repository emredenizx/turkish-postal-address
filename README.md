# Turkish Postal Address React + Firebase Cloud Firestore

This is a demonstration of a React address component with Firebase Cloud Firestore NoSQL Database. It consists of two parts as batch write operation of Turkish Ptt Address data 
to Cloud Firestore and React Component as mini frontend application.

*To run batch operation and application you need to insert your own Firebase account keys into the **config variable** within both **./batch/batch.js** and **./firebase/firebase.js** in source folder.*

If you will use Firebase for the first time,
1. You should Add New Project and add Firebase to your app and obtain the config keys from Firebase SDK snippet -> config tab.
2. Create Database from Cloud Firestore and set **Start in test mode**

Install dependencies:

    yarn add   
    



## BATCH WRITE OPERATION OF TURKISH PTT ADDRESS DATA

The Turkish postal address data is parsed from the tables provided in https://postakodu.ptt.gov.tr 

The data is seperated into **.json** files as provinces, districts and localities due to the 500 documents write limit of Firebase. They can be used in any other NoSQL DMBS as well.

As mentioned above after changing the **config** variable within the **./batch/batch.js** according to your Firebase Keys simply run:

    yarn batch


The postal-address data will be inserted into your database as **'address-tr'** collection consisting of all the documents needed.

## FRONTEND

To run the application:

```sh
yarn start
```


Keep in mind that;
> Your data will be open by default to enable quick setup. Client read/write access will be denied after 30 days if security rules are not updated. 
> You will need to write rules to secure your data. 





