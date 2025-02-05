/*
メモ化についてはMemo.tsxを参照

useMemoはuseCallbackと違い、値のメモ化を行うフック
構文は以下の通り
useMemo(() => { 処理 }, [依存配列]);

第1引数には値を生成する関数を、第2引数には依存配列を渡す
useCallbackと同様に依存配列の値が前の描画時と異なる場合のみ、関数を実行し値を再生成、新しい値をメモに保存する
依存配列の値が変化しない場合は、前回の描画時に生成された値を返す
*/

import React, { useState, useMemo } from 'react';

export const UseMemoSample = () => {
  const [text, setText] = useState('');
  const [item, setItem] = useState<string[]>([]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // ボタンをクリックしたときに、入力されたテキストを配列に追加し、テキストをクリアする
  const onClickButton = () => {
    setItem((prevItem) => {
      return [...prevItem, text];
    });
    setText('');
  };

  // useMemoを使わないと、レンダリングごとに再計算されるが、useMemoを使うことで依存配列が変更されない限り再計算されないようになる
  const numberOfCharacters1 = item.reduce((sub, item) => sub + item.length, 0);
  const numberOfCharacters2 = useMemo(() => {
    return item.reduce((sub, item) => sub + item.length, 0);
  }, [item]);

  return (
    <div>
      <div>
        <input value={text} onChange={onChangeInput} />
        <button onClick={onClickButton}>Add</button>
      </div>
      <div>
        {item.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      <div>
        <p>Total Member of Characters 1: {numberOfCharacters1}</p>
        <p>Total Member of Characters 2: {numberOfCharacters2}</p>
      </div>
    </div>
  )
}