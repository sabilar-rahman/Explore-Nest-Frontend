import ErrorBoundary from "@/src/components/ErrorBoundary";

import { Suspense } from "react";
import LoaderSpinner from "@/src/components/userInterface/LoaderSpinner";
import UsersData from "../_components/UsersData";


const page = () => {
  return (
    <div>
      <ErrorBoundary fallback={<p>Error</p>}>
        <Suspense fallback={<LoaderSpinner />}>
          <UsersData />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default page;
