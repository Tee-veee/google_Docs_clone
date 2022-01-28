// REACT
import { useEffect } from "react";
// RECOIL
import { useRecoilState } from "recoil";
import { deleteDocModalState } from "../atoms/deleteDocModalAtom";
import { deleteDocState } from "../atoms/deleteDocAtom";
import { docsState } from "../atoms/docsAtom";
// NEXT-AUTH
import { useSession } from "next-auth/react";
// FIREBASE
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
function DeleteDocModal() {
  const [deleteOpen, setDeleteOpen] = useRecoilState(deleteDocModalState);
  const [userDocuments, setUserDocuments] = useRecoilState(docsState);
  const [deleteUserDoc, setDeleteDoc] = useRecoilState(deleteDocState);
  const { data: session } = useSession();

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setDeleteOpen(false);
      }
    });
  }, []);

  const deleteDocument = async () => {
    await deleteDoc(
      doc(db, "userDocs", session.user.email, "docs", deleteUserDoc.id)
    );

    const querySnapshot = await getDocs(
      collection(db, "userDocs", session.user.email, "docs")
    );

    const userDocsArr = [];
    querySnapshot.forEach((doc) => {
      return userDocsArr.push({ id: doc.id, data: doc.data() });
    });
    setUserDocuments(userDocsArr);
    setDeleteOpen(false);
  };
  return (
    <div className="fixed top-0 w-full h-screen z-10">
      <div className="w-full h-full bg-gray-800 bg-opacity-70 z-10 flex items-center justify-center">
        <div className="bg-white h-[180px] w-[300px] p-4 rounded-lg flex flex-col justify-between">
          <h1 className="px-2 font-bold">Delete Document</h1>
          <h3 className="px-2 text-xl mb-2">{deleteUserDoc.fileName}</h3>
          {/* CONTENTS */}
          <div className="flex">
            <button
              className="w-6/12 bg-gray-300 p-2 rounded-lg mr-2 hover:scale-95 hover:transition-all"
              onClick={() => setDeleteOpen(false)}
            >
              Cancel
            </button>
            <button
              className="w-6/12 bg-red-500 p-2 rounded-lg ml-2 text-white hover:scale-95 hover:transition-all"
              onClick={() => deleteDocument()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteDocModal;
