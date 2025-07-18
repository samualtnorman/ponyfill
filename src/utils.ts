export function catchThrow<T>(callback: () => T): { threw: false, value: T } | { threw: true, error: unknown } {
	try {
		return { threw: false, value: callback() }
	} catch (error) {
		return { threw: true, error }
	}
}
