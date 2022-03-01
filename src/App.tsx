import React from 'react'
import { useProxy } from './use-proxy'

const state = { foo: 0, bar: 0 }

function Foo() {
  const proxy = useProxy(state)

  return <div>
    <p>Foo: {proxy.foo}</p>
    <button onClick={() => proxy.foo++}>Increase</button>
  </div>
}

function Bar() {
  const proxy = useProxy(state)

  return <div>
    <p>Bar: {proxy.bar}</p>
    <button onClick={() => proxy.bar++}>Increase</button>
  </div>
}

export default function App({ show = true }) {
  return show && <>
    <Foo />
    <Bar />
    <Foo />
  </>  
}
