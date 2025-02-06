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