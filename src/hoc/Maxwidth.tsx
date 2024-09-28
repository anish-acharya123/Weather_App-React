import Navbar from "../components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="text-black  max-w-[1440px]   w-full mx-auto">
      <Navbar />
      <section className="px-6 flex items-center  ">{children}</section>
      {/* <Footer /> */}
    </main>
  );
};

export default Layout;
