import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { EditorState } from "draft-js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { convertToRaw, convertFromRaw } from "draft-js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

// IMPORTS COMPONENT ONLY FOR THE CLIENT SIDE
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

function TextEditor() {
  const [firebaseSnap, setFirebaseSnap] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const getFirebaseSnap = async () => {
      const editorRef = doc(db, "userDocs", session.user.email, "docs", id);
      const editorSnap = await getDoc(editorRef);

      if (editorSnap.exists()) {
        setFirebaseSnap(editorSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getFirebaseSnap();
  }, []);

  useEffect(() => {
    if (firebaseSnap.editorState) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(firebaseSnap.editorState))
      );
    }
  }, [firebaseSnap]);

  // HANDLES STATE FOR EDITOR TEXT
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    // MAKES REFERENCE TO DOC
    const userDocRef = doc(db, "userDocs", session.user.email, "docs", id);
    // PUSH EDITOR STATE TO FIREBASE
    setDoc(
      userDocRef,
      // CONVERT EDITOR STATE TO JSON FOR FIREBASE
      { editorState: convertToRaw(editorState.getCurrentContent()) },
      { merge: true }
    );
  };

  return (
    <div className="pb-16">
      <Editor
        editorState={editorState}
        toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
        editorClassName="mt-10 bg-white shadow-xl max-w-4xl border-2 border-gray-300 mx-auto px-4 py-2 min-h-[80vh] "
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
}

export default TextEditor;
