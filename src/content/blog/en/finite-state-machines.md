---
title: Finite-state Machines in Frontend
description: Tame the unknown state by managing it with Finite-state Machines
language: en
featured: true
publishDate: 2023-09-18
---

## First things first

Before we dive into the content of this post, it’s essential to clarify that while our examples uses React, the concept we’re about to explore is not strict to this library. In reality, it is a mathematical model of computation, making it a versatile approach applicable to any component library.

## The problem

State management is a fundamental aspect of building interactive user interfaces. However, as components become more complex you can easily lose track of these states. Consider a typical React component with multiple boolean state variables, as shown below:

```tsx
const MyComponent = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)

	// ... Rest of the component code

	return (
		<>
			<button onClick={() => setIsModalOpen(true)}>Open modal</button>

			{isModalOpen && <Modal onSubmit={submit} />}
			{isLoading && <Loading />}
			{isSuccess && <SuccessMessage onClose={() => setIsSuccess(false)} />}
			{isError && <ErrorMessage onClose={() => setIsError(false)} />}
		</>
	)
}
```

While this code may look manageable at first, it can quickly become unwieldy as you add more boolean variables to track various component states. This approach can lead to a problem known as **unknown state**, where it becomes challenging to discern **which state combinations are valid**, making your code prone to **bugs** and **unexpected behavior**.

## One possible solution

Finite-state machines (FSM) can you help you managing complex state logic. Here are some key advantages:

- **Predictable states:** With a finite number of states, you can easily anticipate your state logic and transitions.

- **Visual clarity:** Visualize your state machine to gain a clear understanding of your state logic. This also helps in spotting errors and preventing incorrect state transitions.

- **Minimize surprises:** Finite-state machines reduce unexpected side effects, ensuring your state logic behaves as intended.

- **Simplified debugging:** Debugging becomes more straightforward, especially when using state machine visualization tools.

- **Efficient testing:** With a finite number of states, writing tests becomes more efficient, eliminating unnecessary tests and redundant side-effect tests.

## Implementing an FSM

Let’s take a closer look at how you can implement an Finite-state Machine in a component without relying on external libraries. However, keep in mind that there are well-tested libraries available that can further streamline this process.

Creating diagrams becomes a valuable practice for providing a visual representation of the potential states and transitions within your Finite-state Machine. To illustrate this idea, let's revisit the previous example. The image below illustrates how to map the states and transitions.

![Component state diagram](@assets/blog/fsm-diagram.png)

Moving from theory to practice, let's see what implementing it as code looks like in action.

```tsx
// Define all possible states
type ComponentState = 'Idle' | 'Loading' | 'Error' | 'Success' | 'ModalOpen'

const MyComponent = () => {
	// Initial state value
	const [currentState, setCurrentState] = useState<ComponentState>('Idle')

	// Functions to transition between states
	const openModal = () => setCurrentState('ModalOpen')
	const requestSubmitted = () => setCurrentState('Loading')
	const requestSucceeded = () => setCurrentState('Success')
	const serverError = () => setCurrentState('Error')
	const close = () => setCurrentState('Idle')

	// ... Rest of the component code

	return (
		<>
			{/* Render UI based on the current state */}
			{currentState === 'Idle' && <button onClick={openModal}>Open modal</button>}
			{currentState === 'ModalOpen' && <Modal onSubmit={submit} />}
			{currentState === 'Loading' && <Loading />}
			{currentState === 'Success' && <SuccessMessage onClose={close} />}
			{currentState === 'Error' && <ErrorMessage onClose={close} />}
		</>
	)
}
```

In this example, we define the possible states as a `type` (ComponentState) and use a single `currentState` variable to represent the active state. Functions are provided to transition between states, ensuring that **only one state can be active at a time**.

## Conclusion

Finite-state Machines offer a structured and organized approach to state management in applications. By utilizing FSMs, you can reduce the complexity of your code, eliminate unknown states, and create more reliable and maintainable components. While this post demonstrates a basic FSM implementation in React, be sure to explore available libraries for more advanced and feature-rich solutions that can further enhance your development workflow.
