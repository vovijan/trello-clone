interface AddListAction {
  type: "ADD_LIST",
  payload: string
}

interface AddTaskAction {
  type: "ADD_TASK",
  payload: {
    text: string,
    listId: string
  }
}

export type Action = AddListAction | AddTaskAction;