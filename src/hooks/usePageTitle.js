import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | Event Hub`;
  }, [title]);
};

export default usePageTitle;
