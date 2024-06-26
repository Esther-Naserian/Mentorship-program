function createStore (reducer) {
    let state
    let listeners = []

    const getState = () => state

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter(l => l !== listener)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action)
        // updates all subscribers
        listeners.forEach((listener) => listener())
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}


const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

function addTodoAction(todo){
    return{
        type: ADD_TODO,
        todo,
    }
}

function removeTodoAction(id){
    return {
        type: REMOVE_TODO,
        id,
    }
}

function toggleTodoAction(id){
    return {
        type: TOGGLE_TODO,
        id,
    }
}

function addGoalAction(goal){
    return {
        type: ADD_GOAL,
        goal,
    }
}

function removeGoalAction(id){
    return {
        type: REMOVE_GOAL,
        id,
    }
}

function todos (state = [], action) {
    switch(action.type){
        case ADD_TODO:
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter(todo => todo.id !== action.id)
        case TOGGLE_TODO:
            return state.map(todo => todo.id !== action.id ? todo : 
                Object.assign({}, todo, {complete: !todo.complete})    
            )
        default:
            return state
    }
}

function goals (state = [], action){
    switch(action.type){
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter(goal => goal.id !== action.id)
        default:
            return state
    }
}

function app (state = {}, action){
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}

// DOM CODE
function generateId(){
        return Math.random().toString(36).substring(2) + (new   Date()).getTime().toString(36);
}

function addTodo(){
  const input = document.getElementById('todo')
  const name = input.value
  input.value = ''

  store.dispatch(addTodoAction({
    id: generateId(),
    name,
    complete: false,
  }))
}

function addGoal(){
  const input = document.getElementById('goal')
  const name = input.value
  input.value = ''

  store.dispatch(addGoalAction({
    id: generateId(),
    name
  }))
}

document.getElementById('todoBtn').addEventListener('click', addTodo)
document.getElementById('goalBtn').addEventListener('click', addGoal)

function createRemoveButton (onClick){
  const removeBtn = document.createElement('button')
  removeBtn.classList.add("remove-button");
  removeBtn.innerHTML = 'Remove'
  removeBtn.addEventListener('click', onClick)

  return removeBtn
}

function addTodoToDOM (todo){
  const node = document.createElement('li')
  const textNode = document.createElement('span')
  const text = document.createTextNode(todo.name)
  const removeTodoBtn = createRemoveButton(() => {
    store.dispatch(removeTodoAction(todo.id))
  })

  node.appendChild(textNode)
  node.appendChild(removeTodoBtn)
  textNode.appendChild(text)

  textNode.style.textDecoration = todo.complete ? 'line-through' : 'none'
  textNode.addEventListener('click', () => {
    store.dispatch(toggleTodoAction(todo.id))
  })

  document.getElementById('todos')
    .appendChild(node)
}

function addGoalToDOM (goal){
  const node = document.createElement('li')
  const textNode = document.createElement('span')
  const text = document.createTextNode(goal.name)
  const removeGoalBtn = createRemoveButton(() => {
    store.dispatch(removeGoalAction(goal.id))
  })

  node.appendChild(textNode)
  node.appendChild(removeGoalBtn)
  textNode.appendChild(text)

  textNode.style.textDecoration = goal.complete ? 'line-through' : 'none'
  textNode.addEventListener('click', () => {
    store.dispatch(toggleGoalAction(goal.id))
  })

  document.getElementById('goals')
    .appendChild(node)
}

const store = createStore(app)

const unsubscribe = store.subscribe(() => {
  const { goals, todos } = store.getState()
  console.log('The new state is: ', store.getState())

  document.getElementById('goals').innerHTML = ''
  document.getElementById('todos').innerHTML = ''

  goals.forEach(addGoalToDOM)
  todos.forEach(addTodoToDOM)
})

