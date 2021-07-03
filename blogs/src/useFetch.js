import { useState, useEffect } from "react";
const useFetch = (url) => {
  const [data, setBlogs] = useState();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const abortCont = new AbortController();
    async function doit() {
      try {
        const res = await fetch(url, { signal: abortCont.signal });
        if (!res.ok) {
          throw Error("could not fetch data from that resource");
        }
        const jsonres = await res.json();
        console.log(jsonres);
        setBlogs(jsonres);
        setError(null);
        setIsPending(false);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setError(error.message);
          setIsPending(false);
        }
      }
    }
    doit();
    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
