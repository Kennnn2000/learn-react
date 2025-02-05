// Chapter-2 Reactの基礎

// manifest.json
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