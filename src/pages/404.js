import Layout from "@/components/Layout";

export default function Custom404() {
  return (
    <main className="flex w-full h-full items-center justify-center dark:text-light">
      <Layout className="w-full flex items-center justify-center">
        <h1 className="text-center text-6xl">
          404 - Page Not Found.
          <br />
          What are you doing here?
        </h1>
      </Layout>
    </main>
  );
}
