import Navbar from "../components/Navbar";

const layout = ({ children }: any) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};
export default layout;
