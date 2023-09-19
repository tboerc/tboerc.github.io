---
title: Maquinas de Estado Finito no Frontend
description: Domine o <i>unknown state</i> gerenciando-o com Máquinas de Estado Finito.
language: pt
featured: true
image: '@assets/blog/fsm-image.png'
imageAlt: Demonstrativo maquinas de estado finito
publishDate: 2023-09-18
---

## Antes de mais nada

Antes de mergulharmos no conteúdo deste post, é essencial esclarecer que, embora nossos exemplos usem o React, o conceito que estamos prestes a explorar não está restrito a esta biblioteca. Na realidade, ele é um modelo matemático de computação, tornando-se uma abordagem versátil aplicável a qualquer biblioteca de componentes.

## O problema

O gerenciamento de estado é um aspecto fundamental na construção de interfaces de usuário interativas. No entanto, à medida que os componentes se tornam mais complexos, você pode facilmente perder o controle desses estados. Considere um componente React típico com várias variáveis de estado booleanas, como mostrado abaixo:

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

Embora esse código possa parecer gerenciável a princípio, rapidamente pode se tornar complicado à medida que você adiciona mais variáveis booleanas para rastrear vários estados do componente. Essa abordagem pode levar a um problema conhecido como **unknown state**, onde se torna desafiador discernir **quais combinações de estados são válidas**, tornando seu código propenso a **bugs** e **comportamentos inesperados**.

## Uma possível solução

As máquinas de estado finito (FSM) podem ajudá-lo a gerenciar lógica de estado complexa. Aqui estão algumas vantagens:

- **Estados previsíveis:** Com um número finito de estados, você pode antecipar facilmente a lógica de seu estado e transições.

- **Clareza visual:** Visualize sua máquina de estado para obter uma compreensão clara da lógica de seu estado. Isso também ajuda a identificar erros e a prevenir transições de estado incorretas.

- **Minimizar surpresas:** As máquinas de estado finito reduzem efeitos colaterais inesperados, garantindo que sua lógica de estado se comporte conforme o esperado.

- **Depuração simplificada:** A depuração se torna mais direta, especialmente ao usar ferramentas de visualização de máquina de estado.

- **Testes eficientes:** Com um número finito de estados, escrever testes se torna mais eficiente, eliminando testes desnecessários e testes redundantes de efeitos colaterais.

## Implementando uma FSM

Vamos dar uma olhada mais de perto em como você pode implementar uma Máquina de Estado Finito em um componente sem depender de bibliotecas externas. No entanto, tenha em mente que existem bibliotecas bem testadas disponíveis que podem tornar esse processo ainda mais eficiente.

Criar diagramas torna-se uma prática valiosa para fornecer uma representação visual dos estados potenciais e das transições dentro da sua Máquina de Estado Finito. Para ilustrar essa ideia, vamos revisitar o exemplo anterior. A imagem abaixo mostra como mapear os estados e as transições.

![Diagrama de estados do componente](@assets/blog/fsm-diagram.png)

Passando da teoria para a prática, vejamos como a implementação em código se parece na prática.

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

Neste exemplo, definimos os estados possíveis como um `type` (ComponentState) e usamos uma única variável `currentState` para representar o estado ativo. Funções são fornecidas para fazer a transição entre os estados, garantindo que **apenas um estado possa estar ativo de cada vez**.

## Conclusão

As Máquinas de Estado Finito oferecem uma abordagem estruturada e organizada para o gerenciamento de estados em aplicações. Ao utilizar as FSMs, você pode reduzir a complexidade do seu código, eliminar estados desconhecidos e criar componentes mais confiáveis e fáceis de manter. Embora este post demonstre uma implementação básica de FSM no React, certifique-se de explorar as bibliotecas disponíveis para soluções mais avançadas e ricas em recursos que podem aprimorar ainda mais seu fluxo de desenvolvimento.
