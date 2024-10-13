import ErrorBoundary from "@/src/components/ErrorBoundary";

import { Suspense } from "react";

import BlogsData from "../_elements/BlogsData";
import LoaderSpinner from "@/src/components/userInterface/LoaderSpinner";

const page = () => {
  return (
    <div>
      <ErrorBoundary fallback={<p>Error</p>}>
        <Suspense fallback={<LoaderSpinner />}>
          <BlogsData />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default page;
