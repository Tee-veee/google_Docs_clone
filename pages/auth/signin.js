// NEXT-AUTH
import { getProviders, signIn, getSession } from "next-auth/react";

// COMPONENTS
import Header from "../../components/Header";
import Image from "next/image";
import googleDocLogoBlue from "../../assets/googleDocsLogoBlue.svg";

function Signin({ providers }) {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center  h-screen bg-white ">
        {Object.values(providers).map((provider) => (
          <div
            key={provider.name}
            className=" relative p-4 w-fit h-[300px] bg-white flex flex-col items-center justify-center hover:shadow-2xl hover:transition-all rounded-lg "
          >
            <Image src={googleDocLogoBlue} width={300} />
            <button
              onClick={() => signIn(provider.id, { callbackUrl: `${"/"}` })}
              className="p-4 bg-blue-500 text-white rounded-lg hover:scale-95 hover:transition-all mt-8"
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Signin;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { providers },
  };
}
