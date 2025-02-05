/*
useImperativeHandleはuseRefに関連するフックで、コンポーネントにrefが渡された時に親のrefに代入される値を設定するのに使われる
これを使うことで、子コンポーネントが持つデータを参照したり、子コンポーネントで定義されている関数を親から呼んだりすることができる
useImperativeHandleは3つの引数を取る
第1引数にrefオブジェクトを設定する このrefオブジェクトは親コンポーネントから渡される
第2引数にオブジェクトが返す関数を定義する この関数の戻り値がrefに代入される
第3引数に依存配列を設定する useMemoなどと同様にこの配列に指定された値が変更された時にオブジェクトを更新するようにできる

useImperativeHandleを使うことで、コンポーネントの関数を親から好きなタイミングで明示的に呼び出せる
しかし親コンポーネントが子コンポーネントに依存しているため頻繁に使われない
多くの場合propsで代用ができ、下記の例だとmessageをChildが持つのではなくParentが持つようにすればuseImperativeHandleは不要になる
*/

import React, { useState, useRef, useImperativeHandle } from 'react';

const Child = React.forwardRef((props, ref) => {
  const [message, setMessage] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    showMessage: () => {
      const date = new Date();
      const message = `Hello, it's ${date.toLocaleTimeString()} now`;
      setMessage(message);
    }
  }));

  return <div>{message !== null ? <p>{message}</p> : null}</div>
});

const Parent = () => {
  const childRef = useRef<{ showMessage: () => void }>(null);

  const onClick = () => {
    if (childRef.current !== null) {
      childRef.current.showMessage();
    }
  };

  return (
    <div>
      <button onClick={onClick}>Show message</button>
      <Child ref={childRef} />
    </div>
  );
}

export default Parent;