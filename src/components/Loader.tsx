import { FallingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
      <FallingLines color="#385372" width="200" visible={true} />
    </div>
  );
};

export default Loader;
