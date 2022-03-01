import React, { Context, createContext, memo, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'

const AppContext = createContext({} as any)

function App() {
  console.log('render App')
  console.log('---')

  const [app, setApp] = useState({ color: 'red', count: 0 })
  const MemoLayout5 = memo(Layout5)

  return (
    <AppContext.Provider value={{ app, setApp }}>
      <div style={{ padding: 10 }}>
        <Layout />

        <Layout2 />

        <Layout3>
          <Layout3>
            <Layout3>
              <Layout3>
                <Layout3>
                  <Layout3>
                    <Block />
                  </Layout3>
                </Layout3>
              </Layout3>
            </Layout3>
          </Layout3>
        </Layout3>

        <Layout4>
          <Layout4>
            <Layout4>
              <Layout4>
                <Layout4>
                  <Layout4>
                    <Block />
                  </Layout4>
                </Layout4>
              </Layout4>
            </Layout4>
          </Layout4>
        </Layout4>

        <MemoLayout5>
          <MemoLayout5>
            <Block />
          </MemoLayout5>
        </MemoLayout5>
      </div>
    </AppContext.Provider>
  )
}
const styles = { background: '#ddd', padding: 10, margin: 10 }
const Layout = () => {
  console.log('render Layout')
  return <div style={styles}>
    <Block />
  </div>
}

const Layout2 = memo(() => {
  console.log('render Layout2')
  return <div style={styles}>
    <Block />
  </div>
})

const Layout3 = memo(function Layout({ children }) {
  console.log('render Layout3')
  return <div style={styles}>
    {children}
  </div>
})
const Layout4 = memo(function Layout({ children }) {
  console.log('render Layout4')
  return <div style={styles}>
    {children}
  </div>
}, () => true)



const Layout5 = function Layout({ children }) {
  console.log('render Layout5')
  return <div style={styles}>
    {children}
  </div>
}

const Block = () => {
  console.log('render Block')
  console.log('---')
  const { app, setApp } = useContext(AppContext)
  return <section>
    <p>
      Counter = {app.count} - Theme = {app.color}
    </p>
    <p>
      <button style={{ background: app.color }} onClick={() => {
        setApp({ count: app.count + 1, color: app.color === 'red' ? 'blue' : 'red' })
      }}>Increase</button>
      <button style={{ background: app.color }} onClick={() => setApp({ color: 'red' })}>Red</button>
      <button style={{ background: app.color }} onClick={() => setApp({ color: 'blue' })}>Blue</button>
    </p>
  </section>
}

export default App

function usePartialState<T>(initialState: T): [T, (state: Partial<T>) => void] {
  const [state, _setState] = useState(initialState)
  const setState = (newState: Partial<T>) => {
    console.log('### set state')
    const changedState: Partial<T> = {}
    let isChanged = false
    for (const key in newState) {
      if (state[key] !== newState[key]) {
        changedState[key] = newState[key]
        !isChanged && (isChanged = true)
      }
    }
    if (isChanged) {
      _setState(state => ({ ...state, ...changedState }))
    }
  }
  return [state, setState]
}
