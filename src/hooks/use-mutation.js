import { useMutation } from "@apollo/react-hooks";
import { useState } from "react";

export default function useMyMutation(query) {
  const [mutate, { data, loading, error }] = useMutation(query);
  const [myError, setMyError] = useState(null);

  const myMutate = async (options) => {
    return await mutate(options).catch((e) => {
      setMyError(e);
      console.error(e);
    });
  };

  return [myMutate, { data, loading, error: error || myError }];
}
