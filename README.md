# Connected Website

This is a [Next.js](https://nextjs.org/) project which uses [OpenNext for Cloudflare](https://github.com/opennextjs/opennextjs-cloudflare) for hosting. This project uses Tailwind CSS for styling.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

-   Node.js v22.9.0
-   [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm)

## Setting Up Your Development Environment

1. **Fork the Repository**

    First, fork the `www.connected.app` repository using GitHub.

2. **Clone the Repository to Your Local Machine Using `git`**

    ```bash
    git clone YOUR_FORK
    ```

    Move the `www.connected.app` folder to `www.connected.tld` since macOS will think anything with .app at the end is an app:

    ```bash
    mv www.connected.app www.connected.tld
    ```

    Then, initialize the Structure submodule:

    ```bash
    cd www.connected.tld
    git submodule update --init --recursive
    cd libraries/structure
    git checkout main
    cd ../../
    ```

3. **Update package.json and Install Dependencies with `NPM`**

    First, update the name field in `package.json` to the name of your project.

    Navigate into the project’s directory and install the necessary dependencies.

    ```bash
    npm i
    ```

4. **Update ProjectSettings.ts**

    `ProjectSettings.ts` is used to configure all of your project settings. Update the file with your project-specific information.

5. **Update wrangler.toml**

    `wrangler.toml` is used to configure your deployment to Cloudflare. You will need to review each line in this file and update it for your project.

6. **Update the Assets Hostname in `next.config.mjs`**

    The project assumes you will be using a service like Cloudflare R2 to store images. Next.JS needs to be configured to not to optimize images from that host.

7. **(If Using Base API) Update Your package.json Scripts and System hosts File**

    **Update Your package.json Scripts**

    By default, the development server will run on port 7878 over regular `HTTP`, not `HTTPs`. If you are using the Base API, it will require `HTTP Only` cookies in order for the account system to work. These cookies are secure and are not accessible via JavaScript. These cookies will only be sent by web browsers with `HTTPS` connections. So, `HTTPS` needs to be enabled in your development environment.

    Replace the dev script in your package.json:

    ```
    // Default
    "dev": "next dev --port 7878",

    // Update to:
    "dev": "next dev --experimental-https --port 7878 --hostname localhost.PROJECT_DOMAIN.TLD",
    ```

    Where `PROJECT_DOMAIN.TLD` is the domain where you will host your project.

    **Update Your System hosts File**

    In order to access your `HTTPS` web server hosted on `localhost.PROJECT_DOMAIN.TLD`, you will need to update your system hosts file:

    ```bash
    sudo nano /etc/hosts
    ```

    Add this line:

    `127.0.0.1       localhost.PROJECT_DOMAIN.TLD`

    Now `localhost.PROJECT_DOMAIN.TLD` will point to your local machine.

8. **Start the Development Server**

    Start the development server using:

    ```bash
    npm run dev
    ```

    You will be prompted to generate keys necessary to enable `HTTPS` for local development. After the server is running, open [https://localhost.PROJECT_DOMAIN.TLD:7878](https://localhost.PROJECT_DOMAIN.TLD:7878) with your browser.

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
