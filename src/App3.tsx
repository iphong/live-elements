import React, { useEffect, useState } from "react"

const elementMap: Map<string, any> = new Map([
	['Block', Block]
])

function Block({ children }: any) {
	return <div>{children}</div>
}

function renderElement(Element: any, props: any = {}) {
	const node: any = Element({ props })
	return React.createElement(node.type, { ...props, ...node.props, className: "__SomeID" })
}

function App() {
	return renderElement(Block, {})
}

export default App
