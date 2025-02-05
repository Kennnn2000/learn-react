/*
useReducerはuseStateのほかに状態を扱うフックで、主に複雑な状態遷移をシンプルに記述するために使われる
また、配列やオブジェクトなどの複数のデータをまとめたものを状態として扱う場合にも使われ、複雑な用途に向いている

useStateでは第2引数に直接次の状態を渡していたが、useReducerでは第2引数にactionを渡し、actionに応じて次の状態を返す関数を定義する必要がある

※一部使わない機能を省略
reducer(現在の状態, action) {
  return 次の状態;
}

const [現在の状態, dispatch] = useReducer(reducer, reducerに渡される初期状態);
useReducer()の戻り値の配列の第1引数が現在の状態、第2引数がdispatch関数 このdispatch関数にactionを渡すことで状態が更新される
以下はuseStateをuseReducerに変更した例
*/
import { useReducer } from 'react'

type Action = 'DESREMENT' | 'INCREMENT' | 'DOUBLE' | 'RESET';

const reducer = (currentCount: number, action: Action) => {
  switch (action) {
    case 'DESREMENT':
      return currentCount - 1;
    case 'INCREMENT':
      return currentCount + 1;
    case 'DOUBLE':
      return currentCount * 2;
    case 'RESET':
      return 0;
    default:
      return currentCount;
  }
}

type CounterProps = {
  initialValue: number;
};

const Counter = (props: CounterProps) => {
  const { initialValue } = props;
  const [count, dispatch] = useReducer(reducer, initialValue);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch('DESREMENT')}>-</button>
      <button onClick={() => dispatch('INCREMENT')}>+</button>
      <button onClick={() => dispatch('DOUBLE')}>x2</button>
      <button onClick={() => dispatch('RESET')}>Reset</button>
    </div>
  );
}

export default Counter;