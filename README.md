# Modern Developer Portfolio

A sleek, high-performance personal portfolio and blog built with **Astro**, **React**, and **Tailwind CSS**. Designed with modern aesthetics, custom animations via Framer Motion, and seamless Markdown-powered content management for works and blogs.

## ✨ Features

- **Blazing Fast Performance**: Built on Astro for optimized static generation and minimal client-side JavaScript.
- **Interactive UI Components**: Powered by React & Framer Motion for smooth transitions, custom cursor effects, and interactive menus.
- **Dynamic Content Management**: Markdown-powered content collections for projects (`works`) and articles (`blog`).
- **Developer Integrations**: Built-in GitHub contribution calendar and live typing animations (`Typed.js`).
- **Fully Responsive**: Mobile-friendly navigation with custom drawers and a responsive layout.
- **Styling**: Styled using Tailwind CSS v4 with custom typography plugins.

## 🚀 Tech Stack

- **Framework**: [Astro v5](https://astro.build/)
- **UI Library**: [React v19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Utilities**: Typed.js, React GitHub Calendar

## 📂 Project Structure

```text
/
├── public/                 # Static assets (images, icons)
├── src/
│   ├── assets/             # Brand and background SVGs/images
│   ├── components/         # Reusable React & Astro components (Navbar, Hero, Footer, etc.)
│   ├── content/            # Markdown content collections (blog posts & portfolio works)
│   ├── data/               # Static configuration & profile data
│   ├── layouts/            # Page layout templates
│   ├── pages/              # Astro routing pages (index, works, blogs)
│   ├── styles/             # Global CSS styles
│   └── utils/              # Helper functions (date formatting, etc.)
├── astro.config.mjs        # Astro configuration
├── tailwind.config.mjs     # Tailwind CSS configuration
└── package.json            # Project dependencies & scripts
```

## 🧞 Getting Started

### Prerequisites

Make sure you have **Node.js** (v18 or higher) and **npm** installed on your machine.

### Installation & Development

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-portfolio.git
   cd your-portfolio
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the local development server:
   ```sh
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:4321`.

### Building for Production

To build the site for production into the `./dist/` directory:
```sh
npm run build
```

To preview the production build locally:
```sh
npm run preview
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

