import { doc, getDoc } from "firebase/firestore";
import { db } from "../config";

export const getUserAssessment = async ({ uid }) => {
  const res = await getDoc(doc(db, `users/${uid}`));
  //   console.log(res.exists());
  if (res.exists()) {
    return res.data()?.assessment;
  } else {
    throw new Error("Assessment is Not Submitted");
  }
};
