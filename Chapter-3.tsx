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

例えば下記のように表す
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

// classnamesの使用例2 文字列とオブジェクトを組み合わせることもできる
export default function SelectStyle({mode}) {
  return (
    <div className={classNames('box', {light: mode === 'light', dark: mode === 'dark'})}>
      <p>class names</p>
    </div>
  )
}

// classnamesの使用例3 配列を使用することもできる
// 下記の例だとbox panel lightのような属性値が生成される
export default function SelectStyle({mode}) {
  return (
    <div className={classNames('box', ['panel',{light: mode === 'light', dark: mode === 'dark'}])}>
      <p>class names</p>
    </div>
  )
}
*/


// 3-3-1 props.children
/*
propsでは属性値などのほかに、親要素配下の今t年つをprops.childrenとして取得することができる
例えば以下のように表す

StyledPanel.tsxにて
export default function StyledPanel({children}) {
  return (
    <div style={{
      margin: 50,
      padding: 20,
      border: '1px solid #000',
      width: 'fit-content'
      boxShadow: '10px 5px 5px #999',
      backgroundColor: '#fff'
    }}>
      {children}
    </div>
  )
}

index.tsxにて
import StyledPanel from './StyledPanel'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <StyledPanel>
      <h1>children1</h1> //これらの要素がStyledPanelのchildrenとして取得され、styleを適用されたものが画面に表示される
      <p>children2</p>
    </StyledPanel>
  </React.StrictMode>
)
*/

// 3-3-2 複数のchildrenを引き渡す場合
/*
以下の2つの方法がある
・そもそもPropsを使用し、属性値として渡す
・childrenからkey属性を使用して、個別に取得する

例えば以下のように表す

// Propsを使用し、属性値として渡す場合
TitledPanel.tsxにて
export default function TitledPanel({title, children}) {
  return (
    <div style={{
      margin: 50,
      padding: 20,
      border: '1px solid #000',
      width: 'fit-content',
      boxShadow: '10px 5px 5px #999',
      backgroundColor: '#fff'
    }}>
      {title}
      <hr />
      {body}
    </div>
  )
}

index.tsxにて
import TitledPanel from './TitledPanel'
中略
root.render(<TitledPanel
  title={
    <h1>title</h1>
  }
  body={
    <p>body</p>
  } />
)

// childrenからkey属性を使用して、個別に取得する場合
TitledPanel.tsxにて
export default function TitlePanel({children}) {
  const title = children.find((child) => child.key === 'title');
  const body = children.find((child) => child.key === 'body');

  return (
    <div style={{
      margin: 50,
      padding: 20,
      border: '1px solid #000',
      width: 'fit-content',
      boxShadow: '10px 5px 5px #999',
      backgroundColor: '#fff'
    }}>
      {title}
      <hr />
      {body}
    </div>
  )
}

index.tsxにて
import TitledPanel from './TitledPanel'
中略
root.render(<TitledPanel>
  <h1 key="title">title</h1>
  <p key="body">body</p>
</TitledPanel>
*/