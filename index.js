// import firebase we need from firebase-admin library
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// import our credentials from secret.js
import { creds } from "./secrets.js";

// connect to our Firebase project (need credentials)
initializeApp({
    credential: cert(creds),
});

// connect to the Firestore database (just ask)
const db = getFirestore();

// CRUD

const jean = {
    brand: "Gucci",
    style: "skinny",
    color: "dark green",
    size: "M",
    price: 99.99
}

// let's add a shirt to our clothing collection // CREATE :
// db.collection("clothing").add(jean)
// .then(doc=> {
   // console.log("Clothing added: " +doc.id);
// })
// .catch(console.error);

//now that we have some data, let's READ (get) thems
//db.collection("clothing").get()
//.then(collection => {
  //  const clothing = collection.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    //console.table(clothing);
//})
//.catch(console.error);

// Let's say i want to find all of the clothing items that are >= 79.99 //READ (SOME):(doc =>)
db.collection("clothing") .where("price", ">=", 79.99) .get()
// .where ("style", "=", "shorts")
.then(collection => {
    const clothing = collection.docs.map(doc =>({...doc.data(), id: doc.id}));
    console.table(clothing);
})
.catch(console.error);

// now let's get a single document by id (we'll use await, just to show)
// const doc = await db.collection("clothing"),.doc("5bRz5KWhbKAR5PkszUHf").get()
   // .catch(console.error);
   // const clothingItem = {...doc.data(), id: doc.id };
   // console.table(clothingItem);

   // let's update a single document:
   db.collection("clothing").doc("5bRz5KWhbKAR5PkszUHf")
   .update({ color: "red", rating: 4.9})
   .then(doc => console.log("Update doc. "))
   .catch(console.log.error)

   // Even though we SELDOM delete,here's how: //DELETE:
   await db.collection("clothing").doc("5bRz5KWhbKAR5PkszUHf")
   .delete()
   console.log("DELETED")

    