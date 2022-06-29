import { getSession } from "next-auth/react";

const ProtectedPage = () => {
  return (
    <div>
      <h1>Protected Page</h1>
      <p>This is a protected page</p>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProtectedPage;
