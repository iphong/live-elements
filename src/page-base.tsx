export default () => (
	<html>
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<title>Page</title>
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
		</head>

		<body>
			<header>
				<img src="logo.png" />
				<nav>
					<a href="/">Home</a>
					<a href="/about">About</a>
					<a href="/contact">Contact</a>
				</nav>
			</header>

			<aside>
				<section>
					<ul>
						<li><a href="/">Home</a></li>
						<li><a href="/about">About</a></li>
						<li><a href="/contact">Contact</a></li>
					</ul>
				</section>
			</aside>

			<main>
				<section className="">
					<h1>Page</h1>
				</section>
				<section></section>
				<section></section>
				<section></section>
			</main>
			
			<aside></aside>

			<footer></footer>
		</body>
	</html>
)
