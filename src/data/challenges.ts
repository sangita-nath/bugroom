import type { Challenge } from '../types';

export const challenges: Challenge[] = [
  {
    id: 'js-total-price-calculation',
    title: 'Wrong total price calculation',
    category: 'JavaScript Logic',
    difficulty: 'Easy',
    estimatedTime: '8 min',
    concepts: ['reduce', 'numbers', 'cart logic'],
    bugReport: 'The cart total is incorrect when more than one item is added. The UI shows a smaller number than expected.',
    brokenCode: `const cart = [
  { name: 'Notebook', price: 80, quantity: 2 },
  { name: 'Pen', price: 10, quantity: 5 }
];

const total = cart.reduce((sum, item) => {
  return sum + item.price;
}, 0);

console.log(total);`,
    expectedBehavior: 'The total should include price multiplied by quantity for every cart item.',
    hints: ['Check whether quantity is being used.', 'The reduce callback should add the full line total.', 'Multiply price by quantity before adding it to sum.'],
    solutionCode: `const cart = [
  { name: 'Notebook', price: 80, quantity: 2 },
  { name: 'Pen', price: 10, quantity: 5 }
];

const total = cart.reduce((sum, item) => {
  return sum + item.price * item.quantity;
}, 0);

console.log(total);`,
    explanation: 'The original code only added the item price once. It ignored the quantity, so items with more than one unit were calculated incorrectly.'
  },
  {
    id: 'js-filter-incorrect-result',
    title: 'Filter returns incorrect result',
    category: 'JavaScript Logic',
    difficulty: 'Easy',
    estimatedTime: '7 min',
    concepts: ['filter', 'comparison', 'return value'],
    bugReport: 'The completed task list is empty even though some tasks are marked as completed.',
    brokenCode: `const tasks = [
  { title: 'Read docs', completed: true },
  { title: 'Build UI', completed: false },
  { title: 'Write notes', completed: true }
];

const completedTasks = tasks.filter((task) => {
  task.completed === true;
});

console.log(completedTasks);`,
    expectedBehavior: 'The filter should return only the tasks where completed is true.',
    hints: ['Look at the callback body.', 'A block body needs an explicit return.', 'Return the condition from the filter callback.'],
    solutionCode: `const completedTasks = tasks.filter((task) => {
  return task.completed === true;
});

console.log(completedTasks);`,
    explanation: 'The filter callback used curly braces but did not return the condition. Without a return value, every item is treated as false.'
  },
  {
    id: 'js-date-comparison-bug',
    title: 'Date comparison bug',
    category: 'JavaScript Logic',
    difficulty: 'Medium',
    estimatedTime: '12 min',
    concepts: ['Date', 'comparison', 'deadlines'],
    bugReport: 'The app says an overdue goal is still active. The comparison works for some dates but fails for others.',
    brokenCode: `const today = '2026-07-15';
const targetDate = '2026-07-01';

const isOverdue = targetDate > today;

console.log(isOverdue ? 'Overdue' : 'Active');`,
    expectedBehavior: 'The app should mark a target date before today as overdue.',
    hints: ['Read the condition carefully.', 'The comparison direction is reversed.', 'The code should check if targetDate is less than today.'],
    solutionCode: `const today = '2026-07-15';
const targetDate = '2026-07-01';

const isOverdue = targetDate < today;

console.log(isOverdue ? 'Overdue' : 'Active');`,
    explanation: 'The original code checked whether the target date was after today. For overdue work, the target date should be before today.'
  },
  {
    id: 'js-array-item-not-updating',
    title: 'Array item not updating',
    category: 'Arrays & Objects',
    difficulty: 'Medium',
    estimatedTime: '13 min',
    concepts: ['map', 'immutability', 'object update'],
    bugReport: 'A task is marked as completed, but the displayed task list does not update correctly.',
    brokenCode: `const tasks = [
  { id: 1, title: 'Practice JS', completed: false },
  { id: 2, title: 'Build project', completed: false }
];

const updatedTasks = tasks.map((task) => {
  if (task.id === 2) {
    task.completed = true;
  }
  return task;
});`,
    expectedBehavior: 'The matching task should be updated without mutating the original object.',
    hints: ['Avoid changing the existing task object directly.', 'Return a new object for the matching item.', 'Use object spread syntax.'],
    solutionCode: `const updatedTasks = tasks.map((task) => {
  if (task.id === 2) {
    return { ...task, completed: true };
  }
  return task;
});`,
    explanation: 'The original code mutates the existing task object. In UI state, immutable updates are safer and help changes render correctly.'
  },
  {
    id: 'react-counter-state',
    title: 'Counter does not update correctly',
    category: 'React State',
    difficulty: 'Easy',
    estimatedTime: '10 min',
    concepts: ['useState', 'state update', 'event handling'],
    bugReport: 'Clicking the button quickly does not always increase the counter correctly.',
    brokenCode: `function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
  }

  return <button onClick={handleClick}>{count}</button>;
}`,
    expectedBehavior: 'The counter should increase by two when the button is clicked.',
    hints: ['Both updates read the same old count value.', 'Use the previous state value.', 'Use functional state updates.'],
    solutionCode: `function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((current) => current + 1);
    setCount((current) => current + 1);
  }

  return <button onClick={handleClick}>{count}</button>;
}`,
    explanation: 'React may batch state updates. Functional updates make each change use the latest state value.'
  },
  {
    id: 'react-form-input-reset',
    title: 'Form input resets unexpectedly',
    category: 'React State',
    difficulty: 'Medium',
    estimatedTime: '12 min',
    concepts: ['controlled input', 'state', 'forms'],
    bugReport: 'The input clears while typing because the component stores the wrong value.',
    brokenCode: `function NameForm() {
  const [name, setName] = useState('');

  return (
    <input
      value={name}
      onChange={() => setName('')}
      placeholder="Your name"
    />
  );
}`,
    expectedBehavior: 'The input should keep the text typed by the user.',
    hints: ['The change handler ignores the event.', 'Read the value from event.target.value.', 'Pass the event into the onChange callback.'],
    solutionCode: `function NameForm() {
  const [name, setName] = useState('');

  return (
    <input
      value={name}
      onChange={(event) => setName(event.target.value)}
      placeholder="Your name"
    />
  );
}`,
    explanation: 'The original handler always set the name to an empty string. It should use the current input value from the event.'
  },
  {
    id: 'react-list-delete-bug',
    title: 'List item does not delete',
    category: 'React State',
    difficulty: 'Medium',
    estimatedTime: '14 min',
    concepts: ['filter', 'state update', 'list rendering'],
    bugReport: 'Clicking delete does not remove the selected note from the list.',
    brokenCode: `function Notes() {
  const [notes, setNotes] = useState([
    { id: 1, text: 'React' },
    { id: 2, text: 'TypeScript' }
  ]);

  function deleteNote(id) {
    notes.filter((note) => note.id !== id);
  }

  return notes.map((note) => (
    <button onClick={() => deleteNote(note.id)}>{note.text}</button>
  ));
}`,
    expectedBehavior: 'The selected note should be removed from state.',
    hints: ['filter returns a new array.', 'The new array is not being saved.', 'Call setNotes with the filtered result.'],
    solutionCode: `function deleteNote(id) {
  setNotes((currentNotes) =>
    currentNotes.filter((note) => note.id !== id)
  );
}`,
    explanation: 'The original code created a filtered array but never updated state with it.'
  },
  {
    id: 'react-rerender-object-mutation',
    title: 'Component does not re-render',
    category: 'React State',
    difficulty: 'Hard',
    estimatedTime: '18 min',
    concepts: ['immutability', 'object state', 'rendering'],
    bugReport: 'The user role changes in the object, but the UI still shows the old role.',
    brokenCode: `function Profile() {
  const [user, setUser] = useState({ name: 'Sangita', role: 'Learner' });

  function promoteUser() {
    user.role = 'Developer';
    setUser(user);
  }

  return <button onClick={promoteUser}>{user.role}</button>;
}`,
    expectedBehavior: 'The UI should update after changing the user role.',
    hints: ['React state should not be mutated directly.', 'setUser receives the same object reference.', 'Create a new object with the updated role.'],
    solutionCode: `function promoteUser() {
  setUser((currentUser) => ({
    ...currentUser,
    role: 'Developer'
  }));
}`,
    explanation: 'React compares state references. Mutating and setting the same object can prevent a proper re-render.'
  },
  {
    id: 'ts-api-response-type',
    title: 'Wrong type for API response',
    category: 'TypeScript',
    difficulty: 'Medium',
    estimatedTime: '12 min',
    concepts: ['interfaces', 'arrays', 'API types'],
    bugReport: 'TypeScript says the response type is wrong when rendering a list of users.',
    brokenCode: `type User = {
  id: number;
  name: string;
};

type ApiResponse = {
  users: User;
};

function renderUsers(response: ApiResponse) {
  return response.users.map((user) => user.name);
}`,
    expectedBehavior: 'The users property should be typed as an array of User objects.',
    hints: ['map is an array method.', 'users should not be a single User.', 'Change users to User[].'],
    solutionCode: `type ApiResponse = {
  users: User[];
};

function renderUsers(response: ApiResponse) {
  return response.users.map((user) => user.name);
}`,
    explanation: 'The response contains multiple users, so the type should be User[] instead of User.'
  },
  {
    id: 'ts-optional-property-error',
    title: 'Optional property error',
    category: 'TypeScript',
    difficulty: 'Easy',
    estimatedTime: '9 min',
    concepts: ['optional properties', 'safe access', 'fallbacks'],
    bugReport: 'The app crashes when a user does not have a profile image.',
    brokenCode: `type User = {
  name: string;
  avatarUrl?: string;
};

function getAvatar(user: User) {
  return user.avatarUrl.toUpperCase();
}`,
    expectedBehavior: 'The function should safely handle users without avatarUrl.',
    hints: ['avatarUrl may be undefined.', 'Add a fallback value.', 'Use nullish coalescing before calling string methods.'],
    solutionCode: `function getAvatar(user: User) {
  return (user.avatarUrl ?? 'default-avatar.png').toUpperCase();
}`,
    explanation: 'Optional properties can be undefined. The code must handle that case before calling string methods.'
  },
  {
    id: 'ts-return-type-mismatch',
    title: 'Function return type mismatch',
    category: 'TypeScript',
    difficulty: 'Medium',
    estimatedTime: '11 min',
    concepts: ['return types', 'number parsing', 'validation'],
    bugReport: 'The function is supposed to return a number, but TypeScript reports a return type issue.',
    brokenCode: `function getProgress(value: string): number {
  if (!value) {
    return '0';
  }

  return Number(value);
}`,
    expectedBehavior: 'The function should always return a number.',
    hints: ['The fallback return value is a string.', 'The function return type is number.', 'Return 0 instead of "0".'],
    solutionCode: `function getProgress(value: string): number {
  if (!value) {
    return 0;
  }

  return Number(value);
}`,
    explanation: 'The original fallback returned a string. TypeScript correctly complained because the function promises to return a number.'
  },
  {
    id: 'css-mobile-grid-breaks',
    title: 'Card grid breaks on mobile',
    category: 'CSS Layout',
    difficulty: 'Easy',
    estimatedTime: '8 min',
    concepts: ['responsive design', 'grid', 'minmax'],
    bugReport: 'Cards overflow the screen on small devices.',
    brokenCode: `.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 320px);
  gap: 24px;
}`,
    expectedBehavior: 'Cards should wrap and fit smaller screens.',
    hints: ['Fixed column widths can overflow.', 'Use a responsive grid formula.', 'Try minmax with auto-fit.'],
    solutionCode: `.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}`,
    explanation: 'The fixed 3-column layout is too wide on mobile. auto-fit and minmax allow the grid to adapt.'
  },
  {
    id: 'css-sticky-header-overlap',
    title: 'Sticky header overlap bug',
    category: 'CSS Layout',
    difficulty: 'Medium',
    estimatedTime: '10 min',
    concepts: ['sticky', 'z-index', 'layout spacing'],
    bugReport: 'The sticky header appears behind cards while scrolling.',
    brokenCode: `.header {
  position: sticky;
  top: 0;
  background: white;
}

.card {
  position: relative;
  z-index: 10;
}`,
    expectedBehavior: 'The header should stay above page content.',
    hints: ['The card has a z-index.', 'The header has no z-index.', 'Give the sticky header a higher z-index.'],
    solutionCode: `.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: white;
}

.card {
  position: relative;
  z-index: 10;
}`,
    explanation: 'Sticky elements still follow stacking rules. A higher z-index keeps the header above the content.'
  },
  {
    id: 'async-loading-never-stops',
    title: 'Loading state never stops',
    category: 'Async JavaScript',
    difficulty: 'Medium',
    estimatedTime: '13 min',
    concepts: ['async await', 'finally', 'loading state'],
    bugReport: 'The loading spinner stays visible after an API request fails.',
    brokenCode: `async function loadUsers() {
  setLoading(true);

  try {
    const response = await fetch('/api/users');
    const users = await response.json();
    setUsers(users);
  } catch (error) {
    setError('Unable to load users');
  }
}`,
    expectedBehavior: 'Loading should stop after success or failure.',
    hints: ['Loading is set to true.', 'It is never set back to false.', 'Use finally for cleanup.'],
    solutionCode: `async function loadUsers() {
  setLoading(true);

  try {
    const response = await fetch('/api/users');
    const users = await response.json();
    setUsers(users);
  } catch (error) {
    setError('Unable to load users');
  } finally {
    setLoading(false);
  }
}`,
    explanation: 'The finally block runs after both success and failure, so it is a good place to stop loading.'
  },
  {
    id: 'async-result-too-early',
    title: 'Promise result shown too early',
    category: 'Async JavaScript',
    difficulty: 'Easy',
    estimatedTime: '9 min',
    concepts: ['promises', 'await', 'async'],
    bugReport: 'The UI shows a Promise object instead of the user name.',
    brokenCode: `async function getUserName() {
  return 'Sangita';
}

const name = getUserName();
console.log(name);`,
    expectedBehavior: 'The console should show the resolved user name.',
    hints: ['Async functions return promises.', 'The value needs to be awaited.', 'Call it inside an async function or use then.'],
    solutionCode: `async function getUserName() {
  return 'Sangita';
}

async function showName() {
  const name = await getUserName();
  console.log(name);
}

showName();`,
    explanation: 'Calling an async function returns a Promise. await is needed to read the resolved value.'
  },
  {
    id: 'forms-validation-message',
    title: 'Validation error does not disappear',
    category: 'Forms',
    difficulty: 'Medium',
    estimatedTime: '12 min',
    concepts: ['form validation', 'state', 'error handling'],
    bugReport: 'The email error message stays visible even after the user enters a valid email.',
    brokenCode: `function validateEmail(email) {
  if (!email.includes('@')) {
    setError('Enter a valid email');
    return false;
  }

  return true;
}`,
    expectedBehavior: 'The error should clear when the email becomes valid.',
    hints: ['The invalid case sets an error.', 'The valid case does not clear it.', 'Set the error to an empty value before returning true.'],
    solutionCode: `function validateEmail(email) {
  if (!email.includes('@')) {
    setError('Enter a valid email');
    return false;
  }

  setError('');
  return true;
}`,
    explanation: 'The previous error state stays until it is cleared. Valid input should remove the old error message.'
  },
  {
    id: 'forms-submit-refresh',
    title: 'Form submit refreshes the page',
    category: 'Forms',
    difficulty: 'Easy',
    estimatedTime: '6 min',
    concepts: ['forms', 'preventDefault', 'submit'],
    bugReport: 'Submitting the form refreshes the page and clears all entered data.',
    brokenCode: `function handleSubmit(event) {
  saveTask(title);
}

<form onSubmit={handleSubmit}>
  <input value={title} onChange={handleTitleChange} />
  <button type="submit">Save</button>
</form>`,
    expectedBehavior: 'The form should save data without refreshing the page.',
    hints: ['Browser forms submit by default.', 'The submit event can be cancelled.', 'Call event.preventDefault().'],
    solutionCode: `function handleSubmit(event) {
  event.preventDefault();
  saveTask(title);
}`, 
    explanation: 'preventDefault stops the browser from doing a full page submit, so the app can handle the form with JavaScript.'
  },
  {
    id: 'api-empty-response-crash',
    title: 'Empty response crashes UI',
    category: 'API Handling',
    difficulty: 'Hard',
    estimatedTime: '16 min',
    concepts: ['optional chaining', 'fallback UI', 'API safety'],
    bugReport: 'The profile page crashes when the API returns no user object.',
    brokenCode: `function Profile({ data }) {
  return (
    <section>
      <h1>{data.user.name}</h1>
      <p>{data.user.bio}</p>
    </section>
  );
}`,
    expectedBehavior: 'The page should show a safe fallback when user data is missing.',
    hints: ['data.user may be missing.', 'Avoid reading name directly from undefined.', 'Use optional chaining and fallback text.'],
    solutionCode: `function Profile({ data }) {
  const user = data?.user;

  return (
    <section>
      <h1>{user?.name ?? 'Unknown user'}</h1>
      <p>{user?.bio ?? 'No bio available.'}</p>
    </section>
  );
}`,
    explanation: 'API data can be incomplete. Optional chaining and fallback values prevent the UI from crashing.'
  },
  {
    id: 'api-wrong-loading-condition',
    title: 'Wrong loading and error condition',
    category: 'API Handling',
    difficulty: 'Medium',
    estimatedTime: '13 min',
    concepts: ['conditional rendering', 'loading', 'error state'],
    bugReport: 'The error message never shows because loading is checked in the wrong order.',
    brokenCode: `if (!users) {
  return <p>Loading...</p>;
}

if (error) {
  return <p>{error}</p>;
}

return <UserList users={users} />;`,
    expectedBehavior: 'The error message should show when the request fails.',
    hints: ['If users is missing, the first condition always returns.', 'The error condition is never reached.', 'Check error before empty data fallback.'],
    solutionCode: `if (error) {
  return <p>{error}</p>;
}

if (!users) {
  return <p>Loading...</p>;
}

return <UserList users={users} />;`,
    explanation: 'When the request fails, users may stay empty. Checking error first allows the error UI to render.'
  }
];

export const categories = Array.from(new Set(challenges.map((challenge) => challenge.category)));
export const difficulties = ['Easy', 'Medium', 'Hard'] as const;
