import { useState, useEffect } from 'react'

type T = { [key: string]: any }
type F = (newState: T) => any

const callbacks = new Map<T, Set<F>>()

function dispatch(target: T, state: T): boolean {
	callbacks.get(target)?.forEach(cb => cb(state))
	return true
}

export function getProxy(target: T) {
	return new Proxy(target, {
		get(target, key: string): boolean {
			return target[key]
		},
		set(target, key: string, value): boolean {
			target[key] = value
			return dispatch(target, { ...target })
		},
		deleteProperty(target, key: string): boolean {
			delete target[key]
			return dispatch(target, { ...target })
		}
	})
}

export function useProxy(target: T = {}) {
	const [state, setState] = useState(target)
	const picks = new Set<string>()
	const proxy = new Proxy(target, {
		get(target, key: string): boolean {
			picks.add(key)
			return target[key]
		},
		set(target, key: string, value): boolean {
			target[key] = value
			console.log(...picks)
			return picks.has(key) ? dispatch(target, { ...target }) : true
		},
		deleteProperty(target, key: string): boolean {
			delete target[key]
			return dispatch(target, { ...target })
		}
	})
	useEffect(() => {
		callbacks.has(target) || callbacks.set(target, new Set)
		callbacks.get(target)?.add(setState)
		return () => {
			callbacks.get(target)?.delete(setState)
			callbacks.get(target)?.size || callbacks.delete(target)
		}
	}, [])
	return proxy
}
