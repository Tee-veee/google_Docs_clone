import Image from "next/image";
import newDoc from "../assets/newDoc.png";
import { HiDotsVertical } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { newDocModalState } from "../atoms/newDocModalAtom";
function CreateNewDoc() {
  const [open, setOpen] = useRecoilState(newDocModalState);
  return (
    <section className="bg-gray-100 shadow-md px-10 pb-10">
      <div className="xl:max-w-4xl mx-auto">
        <div className="py-6 flex items-center justify-between">
          <h2 className="text-gray-700 text-2xl ml-8 font-bold">
            Create Blank Document
          </h2>
        </div>
        <div>
          <Image
            src={newDoc}
            alt="New document"
            width={200}
            height={200}
            className="hover:scale-95 hover:transition-all cursor-pointer z-1"
            onClick={() => setOpen(true)}
          />
        </div>
      </div>
    </section>
  );
}

export default CreateNewDoc;
