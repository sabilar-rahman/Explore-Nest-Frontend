import { Spinner } from "@nextui-org/spinner";

const LoaderSpinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
       <Spinner color="secondary"/>
    </div>
  );
};

export default LoaderSpinner;
