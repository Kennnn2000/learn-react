// Event


// イベント
/*
イベントとは例えば以下のようなもの
・ボタンをクリックした、入力値を変更した、マウスを移動したなどのユーザーの操作
・ページや画像がロードされて、データの読み込みが完了したなど、ブラウザーの処理に伴う特定のタイミング

イベントによって呼び出されるコード（関数）のことをイベントハンドラーと呼ぶ
イベントハンドラーは必ず関数そのものでなければならないため、current()などをonEvent属性に渡すことはできない
必ず関数を定義した変数を渡す必要がある
例 <button onClick={current}>クリック</button>
*/


// onMouseEnter/onMouseLeaveとonMouseOver/onMouseOutの違い
/*
onMouseEnterとonMouseOver、onMouseLeaveとonMouseOutはそれぞれ要素にマウスポインターが入った時と出た時に発生するイベントだが、
挙動に違いがある

onMouseEnter/onMouseLeaveは、イベントが発生した要素にのみ反応する
つまり、例えば正方形が重なって外側の正方形・内側の正方形がある場合、外側の正方形にマウスが乗った時のみ反応する
一方、onMouseOver/onMouseOutは、イベントが発生した要素にも反応する
つまり、外側の正方形にマウスが乗った時だけでなく、内側の正方形にマウスが乗った時も反応する
*/


// イベントオブジェクト
/*
Reactのイベントオブジェクトは、JavaScriptのとは異なり、ブラウザー間の使用さを吸収したSyntheticEventが生成される
イベントオブジェクトはイベント発生時に関係する情報を収集し、イベントハンドラーの中では変数eとして参照できる
イベントオブジェクトには以下のようなプロパティが含まれる
target: イベントが発生した要素
currentTarget: イベントハンドラーが登録されている要素
eventPhase: イベントのフェーズ
  0: NONE（未処理） 1: CAPTURING_PHASE 2: AT_TARGET（ターゲットフェーズ） 3: BUBBLING_PHASE（バブリングフェーズ）
timeStamp: イベントの作成日時
nativeEvent: ブラウザーのネイティブイベント
bubbles: イベントがバブリングするかどうか
など Reactのドキュメントも参照：https://ja.react.dev/reference/react-dom/components/common#react-event-object
*/

// 独自のデータ属性を使ったイベントハンドラー
/*
独自データ属性とは、任意のタグにdata-xxxxx形式で指定できる属性のこと
xxxxxには小文字の英数字、ハイフン、ドット、コロンが使用できる（data-type="hoge"など）
独自データ属性にアクセスするには要素オブジェクト（e.target）のdatasetプロパティを使用する
e.target.dataset.xxxx（xxxxは独自データ属性名）でアクセスできる
*/


// イベントのフェーズ
/*
イベントの伝播とはイベントが発生したら対応する処理が呼び出されるという意味であるが、この処理の呼び出しには3つのフェーズがある
1. キャプチャリングフェーズ（CAPTURING_PHASE）
  最上位のwindowオブジェクトからイベントが発生した要素まで、イベントの伝播を行う
2. ターゲットフェーズ（AT_TARGET）
  イベントが発生した要素を特定する
3. バブリングフェーズ（BUBBLING_PHASE）
  下位の要素で発生したイベントを上位の要素に伝播する

イベントが発生すると、まずキャプチャリングフェーズが実行され、次にターゲットフェーズが実行され、最後にバブリングフェーズが実行される
処理はバブリングフェーズのタイミングでイベントハンドラーが呼び出され実行されるため、下位の要素から上位の要素に向かって処理が行われる
ただ、onXxxxCapture属性を設定することで、キャプチャリングフェーズでイベントハンドラーを呼び出すこともできる
親コンポーネントなどでonXxxxCapture属性を設定することで、イベントが発生した下位の要素よりも先に処理を行うことができる
captureはJavaScript標準のaddEventListenerメソッドのオプションの一つ
*/


// イベントの伝播を抑制する
/*
そもそもイベントの伝播そのものを抑制するにはe.stopPropagation()を使用する
e.stopPropagation()を実行することで、そのイベントハンドラーのある要素よりも上位の要素にイベントが伝播されるのを防ぐことができる
const handleChild = e => {
  e.stopPropagation(); // イベントの伝播を抑制
  console.log('Child');
};
*/


// イベントの動作をキャンセルする
/*
イベントに伴いブラウザー上で発生する既定の動作、例えばリンクをクリックしたら別ページに移動する、sabmitボタンを推すとフォームの内容を送信するなど
の動作は、イベントハンドラーを処理した後に発生するが、これらの動作をキャンセルするにはe.preventDefault()を使用する
const handleLink = e => {
  e.preventDefault(); // イベントの動作をキャンセル
  console.log('Link');
};
*/


// イベントハンドラーのオプションの設定
/*
JavaScript標準のaddEventListenerメソッドには、第3引数にオプションを設定することができ、オプションには3つのプロパティがある
1. capture
キャプチャリングフェーズでイベントハンドラーを呼び出すかどうかを指定する onXxxxCapture属性で指定できる すでに説明済み

2. once
イベントハンドラーを一度だけ呼び出すかどうかを指定する イベントが一度発生すると、イベントリスナーが削除される
React標準では対応していないため、const [clicked, setClicked] = useState(false);などで状態を管理する必要がある
具体的にはイベントハンドラーの内部でsetClicked(true);を実行する

3. passive
PassiveモードとしてイベントハンドラーがpreventDefault()を呼び出すか呼び出さないかを指定する

例えばtouchstartやtouchmoveなどのタッチイベントやスクロールイベントではユーザの操作に対して素早く反応することが求められるイベントがある
通常addEventListenerでイベントリスナーが設定されると、ブラウザはそのユーザがevent.preventDefault()を
呼び出すかどうかをチェックするためにイベント処理が完了するのを待ってからデフォルトのスクロール操作などを行う
passive: falseの場合、ブラウザは「このイベントハンドラーがpreventDefault()を呼び出す可能性がある」と判断し処理が完了するまでデフォルトの挙動を待つ
そのため、スクロール動作が一時的にブロックされ、特にモバイル環境でのレスポンスが遅くなる可能性がある
passive: trueの場合、preventDefault()を呼ばないとブラウザは判断できるので、即座にデフォルトのスクロール操作などを行うことができる
このため、passive: trueを指定することで、スクロール操作などの動作がスムーズになり、パフォーマンスを向上させることができる

ユーザに快適な操作を提供するために、タッチ系イベントなどにはpassive: trueを指定することが推奨されている
ただし、特定のジェスチャーで画面のスクロールを無効にするなど、スクロールを止めたい場合、passive: falseを指定して、preventDefault()を呼び出す必要がある

例えばFirefoxとChromeの場合、touchmoveとmousewheelイベントはデフォルトでpassiveになっているので、preventDefault()を呼び出したいときはpassive: falseを指定する
こちらもReact標準では対応していないため、別個実装する必要がある
例えば以下のように設定する

const divRef = useRef(null);
useEffect(() => {
  const div = divRef.current;
  div.addEventListener('wheel',handleWheel, { passive: false });
  return (() => {
    // コンポーネント破棄時にイベントリスナーを削除 手動で追加したイベントリスナーは手動で削除する必要がある
    div.removeEventListener('wheel', handleWheel);
  };
});

return (
  <div ref={divRef} className="App"> // 
    <h1>App</h1>
  </div>
)
*/