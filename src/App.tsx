import React from 'react';
import Header from 'components/common/Header';
import TodoList from 'components/Todo/TodoList';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <TodoList />
    </>
  );
};

export default App;
