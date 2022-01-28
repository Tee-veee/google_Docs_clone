import { useRouter } from "next/router";
import { MdArticle } from "react-icons/md";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { deleteDocModalState } from "../atoms/deleteDocModalAtom";
import { deleteDocState } from "../atoms/deleteDocAtom";
import { useRecoilState } from "recoil";
function DocumentRow({ id, fileName, date, deleteDocs }) {
  const [deleteOpen, setDeleteOpen] = useRecoilState(deleteDocModalState);
  const [deleteDocument, setDeleteDocument] = useRecoilState(deleteDocState);
  const router = useRouter();

  const setDeleteSettings = () => {
    setDeleteOpen(true);
    setDeleteDocument({ id: id, fileName: fileName });
  };

  return (
    <>
      {deleteDocs === false && (
        <div
          className="flex items-center justify-between mx-10 p-2 xl:max-w-4xl xl:mx-auto py-4 px-4 hover:bg-blue-100 hover:transition-all cursor-pointer text-gray-500 text-sm hover:shadow-lg rounded-lg my-2 "
          onClick={() => router.push(`/doc/${id}`)}
        >
          <div className="flex items-center w-4/12 xl:w-6/12">
            <h1 className="truncate">{fileName}</h1>
          </div>
          <p className="">{date?.toDate().toLocaleDateString()}</p>
          <div className="p-2">
            <MdArticle className="text-xl" />
          </div>
        </div>
      )}

      {deleteDocs === true && (
        <div className="flex items-center justify-between mx-10 p-2 xl:max-w-4xl xl:mx-auto py-4 px-4 hover:bg-red-100 hover:transition-all cursor-pointer text-gray-500 text-sm hover:shadow-lg rounded-lg my-2">
          <div className="flex items-center w-4/12 xl:w-6/12">
            <h1 className="truncate">{fileName}</h1>
          </div>
          <p className="mr-8 lg:ml-24 xl:ml-0 xl:mr-12">
            {date?.toDate().toLocaleDateString()}
          </p>
          <div className="flex items-center space-x-2">
            <div
              className="p-2 hover:bg-gray-600 hover:text-red-400 hover:shadow-lg hover:transition-all rounded-full"
              onClick={setDeleteSettings}
            >
              <AiFillDelete className="text-xl" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DocumentRow;
