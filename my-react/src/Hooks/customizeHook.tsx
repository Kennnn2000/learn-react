/*
フックを使用する関数を新たに定義・実装することで、複数のフックを組み合わせたカスタムフックを実装できる
フックを通常より柔軟に使うことができる

下記はuseImputというカスタムフックを実装した例
カスタムフックの名前は上記の通りuseから始まる名前にするのが慣習
*/

import React, { useState, useCallback, useDebugValue } from 'react';

const useInput = () => {
  const [state, setState] = useState('');
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  }, []);

  // デバッグ用に値を出力する この値は開発者ツールのComponentsタブで確認できる
  useDebugValue(`input: ${state}`);

  return [state, onChange] as const;
}

export const Input = () => {
  const [text, onChangeText] = useInput();
  return (
    <div>
      <input type="text" value={text} onChange={onChangeText} />
      <p>Input: {text}</p>
    </div>
  );
}