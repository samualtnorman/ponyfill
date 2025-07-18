export type PromiseExecutorResolve<T> = (value: T | PromiseLike<T>) => void
export type PromiseExecutorReject = (reason?: any) => void

export type PromiseWithResolvers<T> =
	{ promise: Promise<T>, resolve: PromiseExecutorResolve<T>, reject: PromiseExecutorReject }

export function promiseWithResolvers<T>(this: PromiseConstructor): PromiseWithResolvers<T> {
	const This = this === undefined ? Promise : this
	let resolve!: PromiseExecutorResolve<T>
	let reject!: PromiseExecutorReject

	const promise = new This<T>((resolve_, reject_) => {
		resolve = resolve_
		reject = reject_
	})

	return { promise, resolve, reject }
}
