interface ITodo {
  id: string,
  title: string,
  completed: boolean
}

interface ITodoItemProps {
  key: string,
  todo: ITodo;
  editing?: boolean;
  onSave: (val: any) => void;
  onDestroy: () => void;
  onEdit: () => void;
  onCancel: (event: any) => void;
  onToggle: () => void;
}

interface ITodoItemState {
  editText: string
}

interface ITodoFooterProps {
  completedCount: number;
  onClearCompleted: any;
  nowShowing: string;
  count: number;
}

// TODO: remove anys
interface ITodoModel {
  key: any;
  todos: Array<ITodo>;
  onChanges: Array<any>;
  subscribe(onChange: any): any;
  inform(): any;
  addTodo(title: string): any;
  toggleAll(checked: any): any;
  toggle(todoToToggle: any): any;
  destroy(todo: any): any;
  save(todoToSave: any, text: any): any;
  clearCompleted(): any;
}

interface IAppProps {
  model: ITodoModel;
}

interface IAppState {
  editing?: string;
  nowShowing?: string
}
