import React from 'react';
import TodoList from 'components/Todo/TodoList';
import Header from 'components/common/Header';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <TodoList />
    </div>
  );
};

export default App;
