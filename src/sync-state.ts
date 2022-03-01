import { useEffect, useState } from 'react'

type Dispatch<T> = (value: T) => void

export class SyncState<T> {
	private readonly _callbacks: Set<Dispatch<T>> = new Set()
	public state: T
	public readonly subscribe = (callback: Dispatch<T>) => {
		this._callbacks.add(callback)
		return () => this.unsubscribe(callback)
	}
	public readonly unsubscribe = (callback: Dispatch<T>) => {
		this._callbacks.delete(callback)
	}
	public readonly setState = (newState: T) => {
		if (this.state !== newState) {
			this.state = newState
			this._callbacks.forEach(f => f(newState))
		}
	}
	constructor(initialState: T) {
		this.state = initialState
	}
}
export function createSyncState<T>(initialState: T) {
	return new SyncState<T>(initialState)
}
export function useSyncState<T>(syncState: SyncState<T>): [T, Dispatch<T>] {
	const [state, setState] = useState<T>(syncState.state)
	useEffect(() => syncState.subscribe(setState), [])
	return [state, syncState.setState]
}
