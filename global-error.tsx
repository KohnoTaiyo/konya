"use client";

import { useEffect } from "react";

// NOTE: 何度も同じ物を書く必要があるのでpropsの型は例外で外で定義しない
const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    // 本来はホスティング先にLog出力するなどする
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <p>
      エラー<button onClick={reset}>reset</button>
    </p>
  );
};

export default Error;
