import { firestore } from "../firebase/config"
export const  fetchSingleUser = async (id) => {
    const res = await firestore.collection("users").doc(id).get()
    return res?.data();
}