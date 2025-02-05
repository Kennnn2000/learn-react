/*
useContextはContextから値を参照するためのフック
useContextの引数にContextを渡すことで、そのContextの値を取得できる

Context.Provider(Contextのところは任意の名前)でラップしたものをuseContext(Context 対応する同じ名前)で取得する
例えばThemeContext.ProviderでラップしたものはuseContext(ThemeContext)で取得できる
*/

import React, { useContext } from 'react';

type User = {
  id: number;
  name: string;
}

const UserContext = React.createContext<User | null>(null);

const GrandChild = () => {
  const user = useContext(UserContext);
  return user !== null ? <p>Hello, {user.name}</p> : null;
}

const Child = () => {
  const now = new Date();

  return (
    <div>
      <p>現在時刻: {now.toLocaleString()}</p>
      <GrandChild />
    </div>
  );
}

const Parent = () => {
  const user = { id: 1, name: 'Alice' };

  return (
    <UserContext.Provider value={user}>
      <Child />
    </UserContext.Provider>
  );
}

export default Parent;