// Chapter-2 Reactの基礎

// 2-1-1 manifest.json
/*
/publicフォルダ直下にあるmanifest.jsonは、Webページをネイティブアプリとして利用する際に、
スマホのホーム画面などに表示するアイコンやタイトル、起動時の見た目などを指定するための設定ファイル

詳細は以下参照
https://developer.mozilla.org/ja/docs/Web/Manifest
*/


// 2-1-2 Npm Scripts
/*
npm run startなどのコマンドの正体は、package.jsonのscriptsに記述されているショートカットコマンドでNpm Scriptsと呼ばれる
例えばnpm run startは、pakage.jsonに"react-scripts start"と記述されているので、実際にはreact-scripts startが実行される
Npm Scriptsを実行する際は「npm run」を先頭につける必要がある ただしnpm startだけrunを省略することができる

Npm Scriptsを使用することで以下のメリットがある
・オプションを追加した場合にもコマンドに影響しない
・利用しているライブラリ/フレームワークを問わずコマンドを統一できる

create-react-appで生成されるpackage.jsonのscriptsは以下の通り
npm run start
開発用サーバーを起動

npm run build
アプリをビルドし、本番環境にデプロイするためのファイル一式を作成できる
コマンドを実行すると、/buildフォルダにビルドされたファイルが出力されるので、
その配下のファイルをサーバのドキュメントルートに配置することで、アプリを公開できる

npm run test
テストを実行 §9参照

npm run eject
Create React Appを構成するwebpack/Babelの設定をカスタマイズするためのコマンド
/config、/scriptsフォルダに標準の設定ファイルを出力するので、これを編集する
詳細は§5-2-1参照
*/


// 2-2-4 複数のJSX式は括弧で囲む
/*
文法上、returnのあとに括弧を付けるのは任意だが、複数のJSX式を返す場合は括弧で囲む必要がある
returnでいったん文の区切りとみなされ、以降のJSX式が別の文として扱われるため
以下は括弧を付けた例
return (
  <div>
      <p>JSX式1</p>
  </div>
);

以下のように括弧を付けなくてもエラーにはならなくすることはできるがバグになる可能性があるので非推奨
return <div>
  <p>JSX式1</p>
</div>;

また、以下のように括弧を付けないとreturn以降のJSX式が無視される
return
  <div>
    <p>JSX式1</p>
  </div>;
*/


// 2-3-1 JSXのルール
/*
JSXのルールは以下の通り
・ルート要素は1つである必要がある
  一般的には<div></div>で全体を囲む
  ただし、アプリ側の都合でタグ階層を増やすことにためらいがある場合は、ダミー要素として<React.Fragment>要素を使用することもできる
  <React.Fragment>は、<React.StirctMode>と同様にReactのコンポーネントであり、画面には表示されない
  <React.Fragment>は短縮記法として<></>でも記述できる

・空要素は~/>で終わる
  例：<input type="text" />

・JSXのコメント文は3種類
  通常のJavaScirptコメント文2種類（//、/*）に加え、JSX内でのコメント文（{/*）がある

・HTMLの属性とは名前の異なる属性がある
  JSXはあくまでJavaScriptの拡張構文であるため、予約語の影響でHTMLの属性とは名前が異なるものがある
  例えば、class属性はclassNameとして扱われ、for属性はhtmlForとして扱われる

・JSX内ではJavaScriptの変数や式を{}で囲む
  {}構文では文字列を埋め込む際に内部的にエスケープ処理が行われるため、XSS（クロスサイトスクリプティング）攻撃を防ぐことができる
  例えば、以下のように変数を埋め込むことができる
  const content = `<h3>タイトル</h3> <p>本文</p>`;
  root.render(<p>{content}</p>); // <p><h3>タイトル</h3> <p>本文</p></p>と画面に表示される


・{}構文で渡すとき、Style属性の場合のみオブジェクトを渡す
  通常の{}構文では文字列や数値を渡すが、Style属性の場合はオブジェクトを渡す
  例えば、以下のようにStyle属性を設定する
  const style = { color: 'red', fontSize: '20px' };
  return <div style={style}>スタイルを適用</div>;

・styleの数値の単位はpxがデフォルト
  ただし、pxで補完される対象は限定されていて、animationLterattionCountなどの数値はpxが補完されない
  以下を参照
  https://ja.react.dev/reference/react-dom/components/common#applying-css-styles
  https://github.com/facebook/react/blob/81d4ee9ca5c405dce62f64e61506b8e155f38d8d/packages/react-dom-bindings/src/shared/CSSProperty.js#L8-L57
*/


// 2-3-5 JSXの実体、createElement関数
/*
JSX式は実行される際にJavaScriptのReact.createElement関数に変換される
例えば以下は等価である

JSX式
const text ='Hello, JSX';
root.render(
  <div className="main">
    <p>{text}</p>
    <img src="logo.png" alt="ロゴ" />
  </div>
)

React.createElement関数
const text = 'Hello, JSX';
root.render(
  React.createElement(
    'div',
    { className: 'main' },
    React.createElement('p', null, text), // nullの部分は属性を指定する場合に書き込む
    React.createElement('img', { src: 'logo.png', alt: 'ロゴ' })
  )
)
*/