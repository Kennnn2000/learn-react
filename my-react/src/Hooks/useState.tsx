/*
useStateは関数コンポーネントで状態を管理するためのReactのフック
const [状態, 状態を変更する関数] = useState(初期値);
状態を変更する関数には引数に値を渡す方法と関数を渡す方法がある 下の例では-ボタンが値を渡し、+ボタンが関数を渡している
*/

import { useState } from 'react';

type CounterProps = {
  initialValue: number;
};

const Counter = (props: CounterProps) => {
  const { initialValue } = props;
  const [count, setCount] = useState(initialValue);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
    </div>
  );
}

export default Counter;