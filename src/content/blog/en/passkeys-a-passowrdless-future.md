---
title: 'Passkeys: a passwordless future'
description: Understand this new way of secure and simple user authentication
language: en
featured: true
image: '@assets/blog/passkeys.png'
imageAlt: Passkeys logo
publishDate: 2024-01-06
---

## Introduction

If you've never heard about passkeys, they represent a new form of authentication that doesn't depend on user defined passwords. Instead, it uses familiar methods used to access your devices, such as FaceID, TouchID, Windows Hello, the Android fingerprint reader, and more. Behind the scenes, only a cryptographic signature is being sent to the website, ensuring that your actual biometric data remains securely stored within your device. This results in a more secure, easy and fast user experience for authentication.

## Right, but I like my password

Well, we need to understand that passwords have flaws, and this is known for a long time. To make it simple, I will list some problems:

- **Human error**: Users create passwords that are easy to remember, they use familiar words, phrases, or patterns. This makes them predictable, susceptible to some sort of attack
- **Password reuse**: Sometimes, your password is rock solid, but you use it on a questionable site. If this site gets compromised and your password is leaked, it will compromise all your other accounts even if they are in a secure platform
- **Phishing and Social Engineering**: Cyber attackers can use phishing emails or social engineering tactics to trick users into revealing their passwords

## How the problem was solved

Passkeys are based on asymmetric cryptography, the standard public plus private key pair. The user's client device creates a cryptographic key pair that is bound to the web service domain. The device retains the private key and registers the public key with the website. This pair is unique for this website.

Sign-in is completed via a challenge-response between the online service and the user device. The online service would send some data encrypted using the public key, the device would then decrypt it using the private key, and send the decrypted message to the service so it can compare the values. The private key never leaves the user's device.

With this method, **human error** is not a issue because the key is strong, **password reuse** doesn't happen since the key is bound to the web service domain, and it's resistant to **phishing and social engineering** because the user doesn't know the private key and the attacker would probably not have access to the device.

## What if I loose my device?

Fortunately, passkeys have some form of synchronization depending o which platform they are being used on. So, if your passkey is managed by a Apple device, all your other Apple devices would have access to that passkey. The same applies for Android, Windows or some cross platform service like 1Password. Therefore, if you loose the device containing the passkey, you would still be able to login to that service using another device. However, if you only have one device, then it would depend on the website account recovery methods.

## You should implement it

Passkeys offer a awesome user experience - they're are fast, easier, and more secure. Users won't need to create new passwords for you service, or struggle to remember which one they used to create their account. A e-commerce would take advantage of quick logins or sign-ins, potentially leading to more sales. Support calls related to password recovery would become nonexistent. Moreover, applications dealing with sensitive information would face fewer problems with cyber attacks. There are numerous reasons why you should consider using passkeys.

## Here is how

Passkeys seem wonderful for users, but they can be challenging for developers, that's the unfortunate part. Implementing a passkey service from the ground up can be very difficult, given the complexity of managing all the information. But **don't give up** just yet, there are some services available that make this process very simple, here is an example using [Next.js](https://nextjs.org) and [Passage by 1Password](https://passage.1password.com).

Passage has a lot of ready made APIs and SDKs to use, and you just need a single component to handle your user authentication. By using the [passage-auth](https://docs.passage.id/embedded-login/passage-element/less-than-passage-auth-greater-than) web component, you have a login and sign-in flow by just providing an `appId` that can be generated in Passage console.

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

You can validate the user on the server side using the [Passage Node.js SDK](https://www.npmjs.com/package/@passageidentity/passage-node), and make decisions if it can or not open a screen for example.

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

A full working example can be found [here](https://github.com/tboerc/next-passkeys).

## Conclusion

Passkeys represent the future of authentication, and major platforms such as Google, GitHub, and Amazon are already adopting it. While implementing passkeys from scratch can be challenging, there are numerous services out there to assist. Overall, the benefits are too great to ignore it. I hope this post encourages you explore passkeys and consider integrating them into your web application for a more secure and user friendly authentication process.
