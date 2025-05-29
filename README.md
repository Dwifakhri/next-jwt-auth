# Next JWT Auth

Next JWT Auth using Next.js 15 and Express.js

## Technologies

This project uses the following technologies:

- **Next**: For building the user interface.
- **TypeScript**: For type-safe JavaScript development.
- **Tailwind CSS**: For styling and utility-first CSS framework.
- **Express**: For backend integration.

## Pre-requisite

1. Node.js version >= 18.15.0
2. Package manager (bun) (https://bun.sh/)

## Run Client

```sh
cd client
```

```sh
bun install
```

### Compile and Hot-Reload for Development

```sh
bun run dev
```

### Compile and Minify for Production

```sh
bun run build
```

### Run Docker

```sh
docker build -t next-auth-client .
```

```sh
docker run -p 3000:3000 next-auth-client
```

## Run Server

```sh
cd server
```

```sh
bun install
```

```sh
node index.js
```

### Run with Docker

```sh
docker build -t next-auth-server .
```

```sh
docker run -p 8000:8000 next-auth-server
```
