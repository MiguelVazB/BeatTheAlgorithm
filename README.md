# Beat the Algorithm

The website is up! Follow this link to beat the algorithm: https://miguelvazb.github.io/BeatTheAlgorithm/

Beat the Algorithm is an interactive website that provides a platform for users to challenge themselves against various algorithms. The goal is to solve a given problem faster than the algorithm itself. In the process, the users will learn about the inner workings of the algorithms.

## How it Works

1\. **Choose an Algorithm**: Select an algorithm from the menu. This menu contains algorithms that solve problems related to sorting, searching, graph algorithms, and more.

2\. **Understand the Challenge**: Each algorithm comes with a clear description of what to do. Also, it provides information about the algorithm

3\. **Interact with Algorithms**: Learn about the inner workings of a specific algorithm designed to solve the chosen problem. Interact with the algorithm step by step to gain insights into its approach.

4\. **Beat the Algorithm**: Put your problem-solving skills to the test by attempting to solve the problem faster than the algorithm.

5\. **Learn and Improve**: Regardless of the outcome, gain valuable insights into the algorithm's efficiency and techniques for solving the problem. Compare your approach with the algorithm's solution to identify areas for improvement.

## Features

- **Multiple Algorithms**: A collection of algorithms covering various problem categories, ensuring a diverse challenge experience.

- **Difficulty Levels**: Each algorithm offers four difficulty levels: Easy, Intermediate, Hard, and Impossible. Choose the level that suits your expertise and challenge yourself accordingly.

- **Detailed Explanations**: Each algorithm is accompanied by detailed explanations, providing a comprehensive understanding of its functionality and optimization techniques.

- **Interactive Interface**: Interact with the algorithms through an intuitive interface, enabling you to understand their progress and logic.

- **Personalized Learning**: Choose specific algorithms and explore them at your own pace, fostering a personalized learning experience.

## Getting Started

The website is up! Follow this link to beat the algorithm: https://miguelvazb.github.io/BeatTheAlgorithm/

To use Beat the Algorithm locally, follow these steps:

Use Node.js 20.19+ on the 20.x line, or Node.js 22.12+ (see the [Vite 7 requirements](https://v7.vite.dev/guide/migration#node-js-support)).

1\. Clone the GitHub repository: `git clone https://github.com/MiguelVazB/BeatTheAlgorithm.git`

2\. Navigate to the project directory: `cd BeatTheAlgorithm`

3\. Install the dependencies: `npm install`

4\. Start the development server: `npm run dev`

5\. Access the website locally: Open your web browser and visit `http://localhost:5173/BeatTheAlgorithm/`.

For a reproducible install from the committed lockfile, use `npm ci`. After changing dependencies, run `npm install` and commit both `package.json` and `package-lock.json`.

The project explicitly approves esbuild's install script through npm's `allowScripts` setting. It installs the native build binary used by Vite; no global npm configuration is needed.

Run `npm test` to check sorting correctness, animation cancellation, countdown and winner handling, player moves, and scroll geometry. Run `npm run build` to verify the production bundle, `npm run preview` to serve it locally, `npm run lint` to check source quality, and `npm audit` to inspect dependency advisories. The unused legacy algorithm menu still has lint findings. Some development-only audit findings originate in the ESLint toolchain's transitive `minimatch` dependency; avoid forcing an incompatible major version through an override.

Games, lessons, and the homepage demo share the sorting steps in `src/utils/sortingAlgorithms.js`. Bubble sort shortens each pass and stops early when no swaps are needed; selection sort scans for each minimum; heap sort uses a max heap to produce ascending output; merge sort uses stable bottom-up merges. Difficulty changes the delay between visual steps, with the same pacing across algorithms. Players can use their own strategy; they do not have to reproduce the computer's moves.

## Let's beat those algorithms together!
