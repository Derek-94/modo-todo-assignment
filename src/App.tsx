import React from 'react';
import Todo from 'components/Todo/Todo';
import { TODOS } from 'constant';
const App: React.FC = () => {
  return (
    <div className="App">
      {TODOS.map(todo => (
        <Todo todo={todo} />
      ))}
    </div>
  );
};

export default App;
