/*
メモ化についてはMemo.tsxを参照

useCallbackは関数をメモ化するためのフック
構文は以下の通り
const メモ化した関数 = useCallback(() => { 処理 }, [依存配列]);

第1引数にはメモ化したい関数を渡し、第2引数には依存配列を渡す 第2引数の依存配列に変化があった場合のみ、メモ化した関数が再生成される
依存化配列が空の場合は、初回描画時に生成された関数を常に返す
実際には内部でuseMemoを利用して関数をメモ化している

以下はuseCallbackの例
DecrementButtonは通常通りコンポーネントに関数を渡しているので、親コンポーネントが再描画されるとDecrementButtonも再描画されてしまう
IncrementButtonはメモ化コンポーネントに通常の関数を渡しているので、毎回のレンダリングでpropsの参照が変化することになり、メモ化の効果がなくなる
DubleButtonはuseCallbackを利用して関数をメモ化して、メモ化コンポーネントに渡しているので、再描画されても関数が再生成されることはない
*/

import React, { useState, useCallback } from 'react';

type ButtonProps = {
  onClick: () => void;
};

const DecrementButton = (props: ButtonProps) => {
  const { onClick } = props;
  console.log('DecrementButtonが再描画されました');
  return <button onClick={onClick}>Decrement</button>;
};

const IncrementButton = React.memo((props: ButtonProps) => {
  const { onClick } = props;
  console.log('IncrementButtonが再描画されました');
  return <button onClick={onClick}>Increment</button>;
});

export const Parent = () => {
  const [count, setCount] = useState(0);
  const decrement = () => setCount((c) => c - 1);
  const increment = () => setCount((c) => c + 1);

  const double = useCallback(() => {
    setCount((c) => c * 2);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <DecrementButton onClick={decrement} />
      <IncrementButton onClick={increment} />
      <IncrementButton onClick={double} />
    </div>
  );
}