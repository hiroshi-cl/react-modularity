declare const Router: any;

import * as React from "react";
import * as ReactDOM from "react-dom";
import { TodoFooter } from "./footer";
import { TodoItem } from "./todoItem";
import { TodoService } from "./service";
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, ENTER_KEY } from "./constants";

class TodoApp {
  public view = view(this);
  public setState: (state: IAppState) => void;
  public service: ITodoService;
  public setService(service: ITodoService): void {
    this.service = service;
  }
}

const view = (app: TodoApp) => class extends React.Component<{}, IAppState> {

    public state: IAppState;
    public text: string;

    constructor(props: IAppProps) {
      super(props);
      this.state = {
        nowShowing: ALL_TODOS,
        editing: null,
        todos: []
      };
      app.setState = this.setState.bind(this);
    }

    public componentDidMount() {
      const setState = this.setState;
      const router = Router({
        "/": setState.bind(this, { nowShowing: ALL_TODOS }),
        "/active": setState.bind(this, { nowShowing: ACTIVE_TODOS }),
        "/completed": setState.bind(this, { nowShowing: COMPLETED_TODOS })
      });
      router.init("/");
    }

    public handleNewTodoKeyDown(event: React.KeyboardEvent) {
      if (event.keyCode !== ENTER_KEY) {
        return;
      }

      event.preventDefault();

      const val = ReactDOM.findDOMNode<HTMLInputElement>(this.refs["newField"]).value.trim();

      if (val) {
        app.service.addTodo(val);
        ReactDOM.findDOMNode<HTMLInputElement>(this.refs["newField"]).value = "";
      }
    }

    public toggleAll(event: React.FormEvent) {
      const target = event.target as HTMLInputElement;
      const checked = target.checked;
      app.service.toggleAll(checked);
    }

    public render() {
      let footer: JSX.Element;
      let main: JSX.Element;
      const todos = this.state.todos;

      const shownTodos = todos.filter((todo) => {
        switch (this.state.nowShowing) {
          case ACTIVE_TODOS:
            return !todo.completed;
          case COMPLETED_TODOS:
            return todo.completed;
          default:
            return true;
        }
      });

      const todoItems = shownTodos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={ () => app.service.toggle(todo) }
            onDestroy={ () => app.service.destroy(todo) }
            onEdit={ () => app.service.edit(todo) }
            editing={this.state.editing === todo.id}
            onSave={ (text) => app.service.save(todo, text) }
            onCancel={ () => app.service.cancel() }
            />
        );
      });

      // Note: It's usually better to use immutable data structures since they're
      // easier to reason about and React works very well with them. That's why
      // we use map(), filter() and reduce() everywhere instead of mutating the
      // array or todo items themselves.
      const activeTodoCount = todos.reduce(function (accum, todo) {
        return todo.completed ? accum : accum + 1;
      }, 0);

      const completedCount = todos.length - activeTodoCount;

      if (activeTodoCount || completedCount) {
        footer =
          <TodoFooter
            count={activeTodoCount}
            completedCount={completedCount}
            nowShowing={this.state.nowShowing}
            onClearCompleted={ () => app.service.clearCompleted() }
            />;
      }

      if (todos.length) {
        main = (
          <section className="main">
            <input
              className="toggle-all"
              type="checkbox"
              onChange={ e => this.toggleAll(e) }
              checked={activeTodoCount === 0}
              />
            <ul className="todo-list">
              {todoItems}
            </ul>
          </section>
        );
      }

      return (
        <div>
          <header className="header">
            <h1>todos</h1>
            <input
              ref="newField"
              className="new-todo"
              placeholder="What needs to be done?"
              onKeyDown={ e => this.handleNewTodoKeyDown(e) }
              autoFocus={true}
              />
          </header>
          {main}
          {footer}
        </div>
      );
    }
  }

const todo = new TodoApp();
const service = new TodoService(todo);
todo.setService(service);

function render() {
  ReactDOM.render(
    <todo.view />,
    document.getElementsByClassName("todoapp")[0]
  );
}

render();
