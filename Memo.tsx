/*
useCallbackとuseMemoはメモ化用のフックで、値や関数を保持し、必要のない子要素のレンダリングや計算を抑制するために使用する
メモ化とは、ある関数の計算結果を保持し、同一の呼び出しがあった場合は保持しておいた結果を返すといった計算結果を再利用する最適化手法のこと

まずは前提としてのReactの再描画タイミングを説明する
Reactの再描画は以下のタイミングで行われる
・propsや内部状態が更新された時
・コンポーネント内で参照しているContextの値が更新された時
・親コンポーネントが再描画された時は無条件に子のコンポーネントが再描画される

親コンポーネントが再描画された際、子のコンポーネントが無条件に再描画されるので、上位のコンポーネントで再描画が発生すると、それ以下のすべてのコンポーネントが再描画される
この再描画の伝播を止めるのにメモ化コンポーネントを使用する
メモ化コンポーネントは親コンポーネントで再描画が発生したとしても、propsやcontextの値が変化しない場合は親コンポーネントによる再描画が発生しないようにする
ただし、メモ化コンポーネントに関数やオブジェクトを渡してしまうと、また親の再描画によってコンポーネントの再描画が発生してしまうので注意
*/

// Memo関数によって関数コンポーネントをメモ化した例
import React, { useState, memo } from 'react';

type FizzProps = {
  isFizz: boolean;
};

// memoを使っていないので、親コンポーネントが再描画されるとisFizzの変化にかかわらず再描画されてしまう
const Fizz = (props: FizzProps) => {
  const { isFizz } = props;
  console.log(`Fizzが再描画されました, isFizz=${isFizz}`);
  return (<span>{isFizz ? 'Fizz' : ''}</span>);
};

type BuzzProps = {
  isBuzz: boolean;
};

// memoを使うことで、親コンポーネントが再描画されても、isBuzzの値が変わらない限り再描画されない
const Buzz = memo<BuzzProps>((props) => {
  const { isBuzz } = props;
  console.log(`Buzzが再描画されました, isBuzz=${isBuzz}`);
  return (<span>{isBuzz ? 'Buzz' : ''}</span>);
});

export const Parent = () => {
  const [count, setCount] = useState(1);
  const isFizz = count % 3 === 0;
  const isBuzz = count % 5 === 0;

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <p>{`現在のカウント: {count}`}</p>
      <p>
        <Fizz isFizz={isFizz} />
        <Buzz isBuzz={isBuzz} />
      </p>
    </div>
  );
}