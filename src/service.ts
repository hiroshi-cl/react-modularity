
import { TodoModel } from "./todoModel";
import { TodoFooter } from "./footer";
import { TodoItem } from "./todoItem";
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, ENTER_KEY } from "./constants";

class TodoService implements ITodoService {

  public state: IServiceState;
  public model: ITodoModel;

  setState(state: IServiceState): void {
    this.state = state;
    const appState: IAppState = {};
    appState.editing = state.editing;
    appState.nowShowing = state.nowShowing;
    appState.todos = this.model.todos;
    this.view.setState(appState);
  }

  // constructor injection
  constructor(public view: { setState: (state: IAppState) => void }) {
    this.model = new TodoModel("react-todos");
    this.state = {
      nowShowing: ALL_TODOS,
      editing: null
    };
  }

  public addTodo(title: string) {
    this.model.addTodo(title);
  }

  public toggleAll(checked: boolean) {
    this.model.toggleAll(checked);
  }

  public toggle(todoToToggle: ITodo) {
    this.model.toggle(todoToToggle);
  }

  public destroy(todo: ITodo) {
    this.model.destroy(todo);
  }

  public edit(todo: ITodo) {
    this.setState({ editing: todo.id });
  }

  public save(todoToSave: ITodo, text: string) {
    this.model.save(todoToSave, text);
    this.setState({ editing: null });
  }

  public cancel() {
    this.setState({ editing: null });
  }

  public clearCompleted() {
    this.model.clearCompleted();
  }

}
