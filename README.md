# YggdrasilFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Deployment

The production image is a multi-stage build: Angular compiles in Node, and [Caddy](https://caddyserver.com/) serves the static files over HTTP on port **8080**. TLS stays on the outer reverse proxy. The image is published to `ghcr.io/norrang/yggdrasil-frontend` for `linux/amd64` and `linux/arm64`.

Build and run it locally:

```bash
docker build -t yggdrasil-frontend .
docker run --rm -p 8080:8080 yggdrasil-frontend
```

The app is then at `http://localhost:8080/`. `GET /health` returns `ok` for the outer proxy's health check.

GitHub Actions builds the image on every push to `main` and tags it `latest` (plus `sha-<short>`). Pushing a git tag such as `v1.2.3` also publishes `1.2.3`, `1.2`, and `1`:

```bash
git tag v1.2.3
git push origin v1.2.3
```

Point the outer Caddy at this container:

```caddyfile
yggdrasil.example.com {
	reverse_proxy <this-container>:8080 {
		health_uri /health
		health_interval 30s
	}
}
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
