# Chronomatrix World Map

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg)

A lightweight, customizable dot-matrix style world map component for modern web applications. **Chronomatrix World Map** renders a stylized grid representation of the globe, perfect for data visualization, dashboards, or aesthetic background elements.

## ✨ Features

* **Dot-Matrix Styling:** Renders the world map using a grid of dots for a retro-futuristic or clean minimal look.
* **Fully Responsive:** Automatically adjusts grid density and size based on the container width.
* **Interactive:** Support for hover effects and click events on specific regions or coordinates.
* **Customizable:** Easily configure dot colors, background colors, point sizes, and map projection styles.
* **Zero-Dependency:** Built with vanilla JS / React without heavy external mapping libraries.

## 🚀 Installation

You can install the package via npm:

```bash
npm install chronomatrix-world-map
```

Or clone the repository directly to use the source files:

```bash
git clone [https://github.com/dylandersen/chronomatrixWorldMap.git](https://github.com/dylandersen/chronomatrixWorldMap.git)
```

## 💻 Usage

### Basic Example (React)

Here is a simple example of how to import and use the component in a React application.

```jsx
import React from 'react';
import { ChronoMap } from 'chronomatrix-world-map';

const App = () => {
  return (
    <div style={{ width: '100%', height: '500px', background: '#1a1a1a' }}>
      <ChronoMap 
        color="#00d8ff" 
        backgroundColor="#1a1a1a"
        dotSize={2}
        sensitivity={0.5}
        onClick={(data) => console.log('Clicked region:', data)}
      />
    </div>
  );
};

export default App;
```

### Vanilla JS

```html
<div id="map-container"></div>

<script type="module">
  import { renderMap } from './src/index.js';

  renderMap(document.getElementById('map-container'), {
    color: '#00d8ff',
    dotSize: 2
  });
</script>
```

## ⚙️ Configuration / Props

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `data` | `Array` | `[]` | Array of data points or country codes to highlight. |
| `color` | `String` | `#ffffff` | Color of the active dots (hex, rgb, or named color). |
| `backgroundColor` | `String` | `transparent` | Background color of the map container. |
| `dotSize` | `Number` | `2` | Radius/Size of each individual dot in pixels. |
| `gap` | `Number` | `4` | Spacing between dots in the grid. |
| `interactive` | `Boolean` | `true` | Enables hover and click interactions. |
| `onRegionClick` | `Function` | `null` | Callback function triggered when a region is clicked. |

## 🛠️ Development

To run the project locally for development:

1.  Clone the repo:
    ```bash
    git clone [https://github.com/dylandersen/chronomatrixWorldMap.git](https://github.com/dylandersen/chronomatrixWorldMap.git)
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the dev server:
    ```bash
    npm run dev
    ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Author:** [Dylan Andersen](https://github.com/dylandersen)
