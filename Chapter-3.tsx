// Chapter-3 コンポーネント開発（基本）


//3-1-2 propsの基本
/*
propsは親コンポーネントから子コンポーネントへ一方的にデータを渡すための仕組み
例えば下記のように表す

MyHello.tsxにて
export default function MyHello(props) {
  return <div>Hello, {props.name}!</div> //Hello, React! 親コンポーネントのindex.tsxからReactを受け取っている
}

index.tsxにて
import MyHello from './MyHello'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <MyHello name="React" />
  </React.StrictMode>
)

propsのデータ型は、クォートで囲まれたものはすべて文字列として認識するため、文字列以外の値を渡す場合は{}で囲む必要がある
例えば下記のように表す
<MyHello name={1} /> //Hello, 1!: 数値型
<MyHello name={[sato, suzuki, yamada]} /> //Hello, sato,suzuki,yamada!: 配列型
<MyHello name={{name: 'sato', age: 20}} /> //Hello, [object Object]!: オブジェクト型
<MyHello name={()=>'Hello'} /> //Hello, Hello!: 関数

propsの分割代入として以下も可能
MyHello.tsxにて
export default function MyHello({name}) { //props.nameをnameに変更
  return <div>Hello, {name}!</div>
}

また、デフォルト値を設定することも可能
MyHello.tsxにて
export default function MyHello({name = 'React'}) { //nameのデフォルト値を'React'に設定
  return <div>Hello, {name}!</div>
}
*/


// 3-2-3 classnamesライブラリの使用
/*
className属性へのスタイル指定をする際、{}式が複雑になる場合はclassnamesライブラリを使用すると便利
npm install classnamesでインストール可、GitHub: https://github.com/JedWatson/classnames

例えば下記のように元のコードを簡略化できる
// 元のコード
export default function SelectStyle({mode}) {
  return (
    <div className={`box ${mode === 'light' ? 'light' : 'dark'}`}>
      <p>class names</p>
    </div>
  )
}

// classnamesを使用する場合
import classNames from 'classnames'
export default function SelectStyle({mode}) {
  return (
    <div className={classNames('box', mode === 'light' ? 'light' : 'dark')}>
      <p>class names</p>
    </div>
  )
}

// classnamesの使用例2 文字列とオブジェクトを組み合わせる
export default function SelectStyle({mode}) {
  return (
    <div className={classNames('box', {light: mode === 'light', dark: mode === 'dark'})}>
      <p>class names</p>
    </div>
  )
}
*/