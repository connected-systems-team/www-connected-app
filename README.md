# Connected Website

This is a [Next.js](https://nextjs.org/) project which uses [OpenNext for Cloudflare](https://github.com/opennextjs/opennextjs-cloudflare) for hosting. This project uses Tailwind CSS for styling.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

-   Node.js v22.9.0
-   [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm)

## Setting Up Your Development Environment

1. **Clone the Repository to Your Local Machine Using `git`**

    ```bash
    git clone git@github.com:connected-systems-team/www-connected-app.git
    ```

    Then, initialize the Structure submodule:

    ```bash
    cd www-connected-app
    git submodule update --init --recursive
    cd libraries/structure
    git checkout main
    cd ../../
    ```

2. **Install Dependencies with `NPM`**

    Navigate into the project’s directory and install the necessary dependencies.

    ```bash
    npm i
    ```

3. **Update Your System hosts File**

    In order to access your `HTTPS` web server hosted on `localhost.connected.app`, you will need to update your system hosts file:

    ```bash
    sudo nano /etc/hosts
    ```

    Add this line:

    `127.0.0.1       localhost.connected.app`

    Now `localhost.connected.app` will point to your local machine.

4. **Start the Development Server**

    Start the development server using:

    ```bash
    npm run dev
    ```

    You will be prompted to generate keys necessary to enable `HTTPS` for local development. After the server is running, open [https://localhost.connected.app:2666](https://localhost.connected.app:2666) with your browser.

    You can now view the website in your web browser. Please note that any changes you make in your local codebase will automatically be reflected on your local server.

## GraphQL API Code Sharing

To synchronize your GraphQL types with the Base API, use:

```bash
npm run api
```

This command expects the `api` git repository to be in the `api` folder in the same directory as your `website` git repository.

## Cloudflare Integration

-   `npm run build` to build the application
-   `npm run preview` to locally preview your application using the [Wrangler](https://developers.cloudflare.com/workers/wrangler/) CLI
-   `npm run deploy` to deploy your application using the [Wrangler](https://developers.cloudflare.com/workers/wrangler/) CLI

> **Note:** While the `npm run dev` script is optimal for local development you should use `npm run preview` on your application as well (periodically or before deployments) in order to make sure that it can properly work in the Cloudflare environment

## Routing in Next.js

In this project, we are utilizing Next.js `App Router`. The `App Router` determines routing based on the structure of the `/app` directory.

## Styling with Tailwind CSS

This project uses Tailwind CSS, a utility-first CSS framework, for styling. The configuration file for Tailwind CSS is `tailwind.config.js`. As part of the development process, you may need to customize this file according to your feature needs.

## More Resources

The following resources may help you familiarize yourself with the technologies used in this project:

-   [Next.js Documentation](https://nextjs.org/docs)
-   [Tailwind CSS Documentation](https://tailwindcss.com/docs)
-   [OpenNext for Cloudflare](https://opennext.js.org/cloudflare)

Happy coding!
