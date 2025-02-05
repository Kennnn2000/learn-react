/*
useEffectと同じように副作用を実行するためのフックだが、実行されるタイミングが異なる
useEffectは描画関数が実行し、DOMが更新され、画面に描画された後で実行するのに対し、
useLayoutEffectはDOMが更新され、画面に実際に描画される前に実行される

例えばuseEffect.tsxの2つめのuseEffectでは、localStorageに保存された値を取得して、localeにセットしておりlocaleはuseStateで初期値（Locale.US）が設定されている
useEffectを使っているため、初期描画ではデフォルト値のUS表記で表示され、その直後にlocalstorageに保存されていた表記に変化する
そのため、毎回リロードするたびに一瞬US表記が表示されてしまい、画面がチラついているように見える
そこで2つめのuseEffectをuseLayoutEffectに変更することで、初期描画時にlocalstorageに保存されている表記で表示されるようになり、画面のチラつきをなくすことができる
しかし、useLayoutEffectで実行する処理は同期的に実行されるので、重い処理を実行すると画面への描画が遅れる可能性があるので注意
*/

// useLayoutEffect(() => {
//   const savedLocale = localStorage.getItem(KEY_LOCALE);
//   if (savedLocale !== null) {
//     setLocale(getLocaleFromString(savedLocale));
//   }
// }, []);