import { getSession, signOut, useSession } from "next-auth/react";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import googleDocsLogo from "../../assets/googleDocsLogoBlue.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { IoMdShare } from "react-icons/io";
import TextEditor from "../../components/TextEditor";
function Doc() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const [currUserDoc, setCurrUserDoc] = useState([]);
  useEffect(() => {
    const getCurrUserDocument = async () => {
      const docRef = doc(db, "userDocs", session?.user?.email, "docs", id);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCurrUserDoc(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getCurrUserDocument();
  }, []);

  return (
    <div>
      <header className="flex justify-between items-center p-2 pb-1 h-[6vh]">
        <div onClick={() => router.push("/")} className="cursor-pointer">
          <Image
            src={googleDocsLogo}
            height={40}
            width={40}
            className="cursor-pointer"
          />
        </div>
        <div className="flex-grow px-2">
          <h2 className="mb-1">{currUserDoc?.fileName}</h2>
          <div className="flex items-center text-gray-500 space-x-4 text-sm">
            <p className="hover:bg-gray-300  hover:transition-all p-1 px-2 cursor-pointer rounded-sm hover:shadow-lg">
              File
            </p>
            <p className="hover:bg-gray-300  hover:transition-all p-1 px-2 cursor-pointer rounded-sm hover:shadow-lg">
              Edit
            </p>
            <p className="hover:bg-gray-300  hover:transition-all p-1 px-2 cursor-pointer rounded-sm hover:shadow-lg">
              View
            </p>
            <p className="hover:bg-gray-300  hover:transition-all p-1 px-2 cursor-pointer rounded-sm hover:shadow-lg">
              Insert
            </p>
            <p className="hover:bg-gray-300  hover:transition-all p-1 px-2 cursor-pointer rounded-sm hover:shadow-lg">
              Format
            </p>
            <p className="hover:bg-gray-300  hover:transition-all p-1 px-2 cursor-pointer rounded-sm hover:shadow-lg">
              Tools
            </p>
          </div>
        </div>
        <button className="hidden md:inline-flex items-center text-2xl p-1 px-2 rounded-lg bg-blue-500 shadow-md hover:shadow-xl hover:transition-all text-white">
          <IoMdShare className="mr-2 " />
          <p className="text-lg ">Share</p>
        </button>
        <img
          src={session?.user?.image}
          alt="user-avatar"
          className="h-[35px] w-[35px] md:h-[50px] md:w-[50px] object-cover rounded-lg md:ml-4 hover:shadow-lg cursor-pointer hover:transition-all"
          onClick={signOut}
        />
      </header>

      <TextEditor />
    </div>
  );
}

export default Doc;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
