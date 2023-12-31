---
title: 'Passkeys: um futuro sem senhas'
description: Entenda essa nova forma de autenticação segura e simples para usuários
language: pt
featured: true
image: '@assets/blog/passkeys.png'
imageAlt: Passkeys logo
publishDate: 2024-01-06
---

## Introdução

Se você nunca ouviu falar em passkeys, elas representam uma nova forma de autenticação que não depende de senhas definidas pelo usuário. Em vez disso, utiliza métodos familiares usados para acessar seus dispositivos, como FaceID, TouchID, Windows Hello, leitor de impressões digitais do Android, dentre outros. Nos bastidores, apenas uma assinatura criptográfica é enviada para o site, garantindo que seus dados biométricos permaneçam armazenados com segurança dentro do seu dispositivo. Isso resulta em uma experiência de autenticação mais segura, fácil e rápida.

## Certo, mas eu gosto da minha senha

Bem, precisamos entender que senhas possuem falhas, e isso é já tem muito tempo. Para simplificar, vou listar alguns problemas:

- **Erro humano**: Os usuários criam senhas fáceis de lembrar, utilizando palavras, frases ou padrões familiares. Isso as torna previsíveis e suscetíveis a algum tipo de ataque.
- **Reutilização de senhas**: Às vezes, sua senha é muito segura e você a utiliza em todos os lugares, inclusive em um site questionável. Se esse site for comprometido, isso coloca em risco a segurança de todas as suas outras contas, mesmo que estejam em uma plataforma segura.
- **Phishing e Engenharia Social**: Agentes maliciosos podem usar e-mails de phishing ou táticas de engenharia social para enganar os usuários e obter suas senhas.
- **Violações de dados**: Existe um grande mercado na deep web para informações sensíveis dos usuários, incluindo senhas. Nessas situações, senhas fracas ou reutilizadas podem ser exploradas por agentes mal-intencionados.

## Como o problema foi resolvido

As passkeys são baseadas em criptografia assimétrica, no padrão de chaves pública e privada. O dispositivo do usuário cria um par de chaves criptográficas vinculado ao domínio da aplicação web. O dispositivo retém a chave privada e registra a chave pública no site. Esse par é único para este site.

O login é concluído por meio de um _challhage-response_ entre o servidor e o dispositivo do usuário. O servidor envia alguns dados criptografados usando a chave pública, o dispositivo então os descriptografa usando a chave privada e envia a mensagem descriptografada para o servidor para que ele possa comparar os valores. A chave privada nunca sai do dispositivo do usuário.

Com esse método, o **erro humano** não é um problema porque a chave gerada sempre é forte. **Reutilização de senha** não ocorrerá, pois a chave está vinculada ao domínio da aplicação web. É resistente ao **phishing e à engenharia social** porque o usuário não conhece a chave privada e o agente malicioso provavelmente não terá acesso ao dispositivo. **Violações de dados** ainda podem ocorrer, pois dependem da segurança do site, mas dados relacionados à autenticação não seriam facilmente explorados, uma vez que a chave pública é específica para o domínio do site e não faz nada sem a chave privada.

## E se eu perder meu dispositivo?

Felizmente, as passkeys têm algum tipo de sincronização dependendo da plataforma em que estão sendo usadas. Portanto, se o seu _passowrdless login_ for gerenciado por um dispositivo Apple, todos os seus outros dispositivos Apple teriam acesso a ele. O mesmo se aplica ao Android, Windows ou a algum serviço multiplataforma como o 1Password. Portanto, se você perder o dispositivo, ainda poderá fazer login nos websites que utilizam passkeys usando outro dispositivo que esteja na mesma plataforma. No entanto, se você tiver apenas um dispositivo, você dependerá dos métodos de recuperação de conta do site.

## Você deveria implementar

As passkeys oferecem uma experiência de usuário incrível - são rápidas, mais fáceis e mais seguras. Os usuários não precisarão criar novas senhas para sua aplicação, ou terão dificuldade em lembrar qual senha usaram para criar a conta. Um e-commerce poderia aproveitar logins ou cadastros rápidos, potencialmente levando a mais vendas. Chamadas de suporte relacionadas à recuperação de senha se tornariam inexistentes. Além disso, aplicações que lidam com informações sensíveis enfrentariam menos problemas com ataques cibernéticos. Existem inúmeras razões pelas quais você deveria considerar usar passkeys.

## Veja como

_Passwordless login_ parece maravilhoso para os usuários, mas pode ser desafiador para os desenvolvedores, essa é a parte triste. Implementar um serviço de passkey do zero pode ser muito difícil, dada a complexidade de gerenciar todas as informações. Mas **não desista** ainda, existem alguns serviços disponíveis que tornam esse processo muito simples, aqui está um exemplo usando [Next.js](https://nextjs.org) e [Passage by 1Password](https://passage.1password.com).

O Passage possui muitas APIs e SDKs prontos para uso, e você só precisa de um único componente para lidar com sua autenticação de usuário. Ao usar o web component [passage-auth](https://docs.passage.id/embedded-login/passage-element/less-than-passage-auth-greater-than), você tem um fluxo de login e cadastro apenas fornecendo um `appId` que pode ser gerado no console do Passage.

```tsx
// login/page.tsx

'use client'

import { useEffect } from 'react'

export default function LoginPage() {
	useEffect(() => {
		// Because this import register the custom element with the browser
		// It needs to be required inside the `useEffect`, so it is just
		// Loaded inside the client, and not in the server
		require('@passageidentity/passage-elements/passage-auth')
	}, [])

	return <passage-auth app-id={process.env.NEXT_PUBLIC_PASSAGE_APP_ID}></passage-auth>
}
```

Você pode validar o usuário no lado do servidor usando o [Passage Node.js SDK](https://www.npmjs.com/package/@passageidentity/passage-node), e tomar decisões se ele pode ou não abrir uma tela, por exemplo.

```tsx
// home/page.tsx

import Passage from '@passageidentity/passage-node/lib/cjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const appID = process.env.NEXT_PUBLIC_PASSAGE_APP_ID!
const apiKey = process.env.PASSAGE_API_KEY!

const passage = new Passage({
	appID,
	apiKey,
	authStrategy: 'HEADER'
})

async function isUserAuthorized() {
	try {
		const cookieStore = cookies()
		const authToken = cookieStore.get('psg_auth_token')?.value

		const req = {
			headers: {
				authorization: `Bearer ${authToken}`
			}
		}

		const userID = await passage.authenticateRequest(req)

		if (userID) {
			return true
		}
	} catch {
		return false
	}
}

export default async function HomePage() {
	if (!(await isUserAuthorized())) {
		redirect('/login')
	}

	return <>...</>
}
```

Um exemplo completo pode ser encontrado [aqui](https://github.com/tboerc/next-passkeys).

## Conclusão

As passkeys representam o futuro da autenticação, e grandes plataformas como Google, GitHub e Amazon já estão adotando-as. Embora implementar passkeys do zero possa ser desafiador, existem serviços disponíveis para ajudar. No geral, os benefícios são grandes demais para serem ignorados. Espero que este post o incentive a explorar as passkeys e considerar integrá-las à sua aplicação web para um processo de autenticação mais seguro e amigável para o usuário.
