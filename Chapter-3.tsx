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
*/