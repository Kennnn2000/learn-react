/*
useEffectは副作用を実行するために使用するフック
副作用とはコンポーネントの描画とは直接関係のない処理のことで、例えば描画されたDOMを手動で変更、ログ出力、タイマーのセット、データの取得など
副作用の処理をそのまま関数コンポーネントの中で実行すると、処理の中で参照しているDOMが描画により置き換わったり、状態を更新して再描画が発生したり、無限ループが発生する可能性がある
useEffectを使うことで、propsやstateが更新され、再描画が終わった後に処理が実行されるようになる
また、依存配列を指定することで特定のデータが変更された時だけ処理を実行するようにすることができる

useEffectの構文は以下の通り
useEffect(() => {処理}, [依存配列])
第1引数には副作用の処理を記述し、第2引数には依存配列を指定する 依存配列についてはuseCallbackなどと同じように、この配列が変更された時だけ処理が実行される
依存配列が空の場合、初期描画が終わった直後にのみ処理が実行され、その後の再描画では実行されない

注意として本番環境や<React.StrictMode>で囲まれていないコンポーネントを除いて、React18以降useEffectを使うと、安全でない副作用を見つけるため2回実行されることがある
1回のみの実行を保証したい場合は、useRefなどを使って前に実行されたかを保持することで対処できる
const mounted = React.useRef(false);
useEffect(() => {
  if (!mounted.current) { // すでに実行されている場合はreturnで処理をスキップ
    return;
  }
  mounted.current = true;
  // ここに処理を記述
}

以下はuseEffectの例
*/
import React, { useState, useEffect } from 'react';

const UPDATE_CYCLE = 1000;
const KEY_LOCALE = 'KEY_LOCALE';

enum Locale {
  US = 'en-US',
  JP = 'ja-JP',
}

const getLocaleFromString = (text: string) => {
  switch (text) {
    case Locale.US:
      return Locale.US;
    case Locale.JP:
      return Locale.JP;
    default:
      return Locale.US;
  }
}

export const Clock = () => {
  const [timestamp, setTimestamp] = useState(new Date());
  const [locale, setLocale] = useState(Locale.US);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimestamp(new Date());
    }, UPDATE_CYCLE);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const savedLocale = localStorage.getItem(KEY_LOCALE);
    if (savedLocale !== null) {
      setLocale(getLocaleFromString(savedLocale));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY_LOCALE, locale);
  }, [locale]);

  return (
    <div>
      <p>
        <span id='current-time-label'>現在時刻</span>
        <span>:{timestamp.toLocaleString(locale)}</span>
        <select
          value={locale}
          onChange={(e) => setLocale(getLocaleFromString(e.target.value))}>
          <option value="en-US">en-US</option>
          <option value="ja-JP">ja-JP</option>
        </select>
      </p>
    </div>
  )
}