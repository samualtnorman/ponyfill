import { promiseWithResolvers } from "./promise-with-resolvers"
import { catchThrow } from "./utils"

export function promiseTry<T, U extends unknown[]>(this: PromiseConstructor, callbackFn: (...args: U) => T | PromiseLike<T>, ...args: U): Promise<Awaited<T>> {
	const { promise, resolve, reject } = promiseWithResolvers.call(this)
	const result = catchThrow(() => callbackFn(...args))

	if (result.threw)
		reject(result.error)
	else
		resolve(result.value)

	return promise as Promise<Awaited<T>>
}
