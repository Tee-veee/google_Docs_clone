import { useRecoilState } from "recoil";
import { newDocModalState } from "../atoms/newDocModalAtom";
import { docsState } from "../atoms/docsAtom";
import { newDocState } from "../atoms/newDocInputAtom";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

// FIREBASE
import {
  serverTimestamp,
  setDoc,
  doc,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../firebase";

function NewDocModal() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(newDocModalState);
  const [userDocuments, setUserDocuments] = useRecoilState(docsState);
  const [input, setInput] = useRecoilState(newDocState);

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });
    window.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        createDocument();
      }
    });
  }, []);

  const createDocument = async () => {
    if (!input) return;
    const testArr = [];
    const uid = function () {
      return testArr.push(Date.now().toString(36) + Math.random().toString(36));
    };
    uid();
    await setDoc(doc(db, "userDocs", session.user.email, "docs", testArr[0]), {
      fileName: input,
      timestamp: serverTimestamp(),
    });

    setInput("");
    setOpen(false);

    const querySnapshot = await getDocs(
      collection(db, "userDocs", session.user.email, "docs")
    );

    const userDocsArr = [];
    querySnapshot.forEach((doc) => {
      return userDocsArr.push({ id: doc.id, data: doc.data() });
    });
    setUserDocuments(userDocsArr);
    console.log(userDocsArr);
  };

  return (
    <div className="fixed top-0 w-full h-screen z-10">
      <div className="w-full h-full bg-gray-800 bg-opacity-70 z-10 flex items-center justify-center">
        <div className="bg-white h-[180px] w-[300px] p-4 rounded-lg flex flex-col justify-between">
          <h1>Create new document</h1>
          <input
            type="text"
            className="flex  bg-gray-100 px-1 pb-1 text-lg placeholder:text-sm outline-none focus:shadow-lg"
            placeholder="Enter document name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {/* CONTENTS */}
          <div className="flex">
            <button
              className="w-6/12 bg-gray-300 p-2 rounded-lg mr-2 hover:scale-95 hover:transition-all"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              className="w-6/12 bg-blue-500 p-2 rounded-lg ml-2 text-white hover:scale-95 hover:transition-all"
              onClick={createDocument}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewDocModal;
