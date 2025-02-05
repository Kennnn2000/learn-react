/*
useRefは書き換え可能なrefオブジェクトを作成する
refには大きく分けて2つの使い方がある
・データの保持
  useStateなどでは状態を更新する度に再描画されるが、refオブジェクトに保存された値は更新しても再描画されないため、描画に関係ないデータを保存するのに使われる
  データはref.currentに保存され、ref.currentから読み出したり書き替えたりする

・DOMの参照
  refをコンポーネントに渡すと、この要素がマウントされた際にref.currentにDOMの参照がセットされ、DOMの関数などを呼び出すことができる
*/
import React, { useState, useRef } from 'react';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const UPLOAD_DELAY = 5000;

const ImageUploader = () => {
  const inputImageRef = useRef<HTMLInputElement | null>(null);
  const fileRef = useRef<File | null>(null);
  const [message, setMessage] = useState<string | null>('');

  const onClickText = () => {
    if (inputImageRef.current !== null) {
      inputImageRef.current.click();
    }
  };

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files !== null && files.length > 0) {
      fileRef.current = files[0];
    }
  };

  const onClickUpload = async () => {
    if (fileRef.current !== null) {
      await sleep(UPLOAD_DELAY);
      setMessage(`${fileRef.current.name} has been successfully uploaded.`);
    }
  };

  return (
    <div>
      <p style={{ textDecoration: 'underline'}} onClick={onClickText}>
        画像をアップロード
      </p>
      <input
        type="file"
        ref={inputImageRef}
        accept='image/*'
        style={{ visibility: 'hidden' }}
        onChange={onChangeImage}
      />
      <br />
      <button onClick={onClickUpload}>アップロードする</button>
      {message !== null && <p>{message}</p>}
    </div>
  );
};

export default ImageUploader;