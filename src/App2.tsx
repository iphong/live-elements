import React from "react"
import { createSyncState, useSyncState } from "./sync-state"

const fooState = createSyncState('initial')
const styles = { padding: 5, margin: 10 }



function Foo() {
	const [state, setState] = useSyncState(fooState)
	return <div style={styles}>
		Foo : <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
	</div>
}

function Bar() {
	const [state, setState] = useSyncState(fooState)
	return <div style={styles}>
		Bar : <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
	</div>
}

function App({ foo, bar }: { foo: boolean, bar: boolean }) {
	useSyncState(fooState)
	const fooElement = <Foo />
	console.log(fooElement)
	return <div style={styles}>
		{foo && fooElement}
		{bar && <Bar />}
	</div>
}

export default App
