// State


// Stateの更新タイミング
/*
Stateの更新タイミングはイベントハンドラーを終えた後（State値は再描画までに変更されることはない
そのため、下記式ではそれぞれ差異がでてくる
// 予想外の挙動の例
const [count, setCount] = useState(init);
const handleClick = () => {
  setCount(count + 1); // count + 1
  setCount(count + 1); // 毎回2が追加されるのではなく、上のsetCountが再描画されてからcountの値が変化するので2つ書いても1しか追加されない
};

// 期待通りの挙動の例
const [count, setCount] = useState(init);
const handleClick = () => {
  setCount(c => c + 1); // count + 1
  setCount(c => c + 1); // 引数に渡されるcはその時々での最新のState値を取得するので、こうすることで想定通り2が追加される
};
*/