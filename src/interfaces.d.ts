interface ITodo {
  id: string;
  title: string;
  completed: boolean;
}

interface ITodoItemProps {
  key: string;
  todo: ITodo;
  editing?: boolean;
  onSave: (text: string) => void;
  onDestroy: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onToggle: () => void;
}

interface ITodoItemState {
  editText: string
}

interface ITodoFooterProps {
  completedCount: number;
  onClearCompleted: () => void;
  nowShowing: string;
  count: number;
}

interface ITodoModel {
  key: string;
  todos: Array<ITodo>;
  onChanges: Array<(e: Event) => void>;
  subscribe(onChange: (e: Event) => void): void;
  inform(): void;
  addTodo(title: string): void;
  toggleAll(checked: boolean): void;
  toggle(todoToToggle: ITodo): void;
  destroy(todo: ITodo): void;
  save(todoToSave: ITodo, text: string): void;
  clearCompleted(): void;
}

interface IAppProps {
  model: ITodoModel;
}

interface IAppState {
  editing?: string;
  nowShowing?: string;
  todos?: Array<ITodo>;
}

interface IServiceState {
  editing?: string;
  nowShowing?: string;
}

interface ITodoService {
  state: IAppState;
  model: ITodoModel;
  app: { setState: (state: IAppState) => void };

  addTodo(title: string): void;
  toggleAll(checked: boolean): void;
  toggle(todoToToggle: ITodo): void;
  destroy(todo: ITodo): void;
  edit(todo: ITodo): void;
  save(todoToSave: ITodo, text: string): void;
  cancel(): void;
  clearCompleted(): void;
}
