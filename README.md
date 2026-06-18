# Pokemon Explorer App

## 1. Project Setup & Running Instructions

To run this project locally, please follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/luk3pigg/pokemon_explorer_app
   ```

2. **Install dependencies:**
   Navigate into the project directory and run:
   ```bash
   cd pokemon_explorer_app
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the application:**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## 2. Design and Component Decisions

I attempted to reproduce the provided Figma UI design by breaking it down into modular React components. The `Home` component acts as the parent orchestrator, handling data fetching and state. It passes data down to the child components `PokemonCard` and `PokemonDetailsDialog` via props, which provide the logic for the Pokemon cards and the dialog boxes respectively. 
I used shadcn/ui's `<Button>`, `<Card>`, and `<Dialog>` components because they provided convenient, built in structures for my pagination buttons and pokemon cards. My main interpretation/deviation from the Figma design was the use of a `<Dialog>` modal for the detailed view rather than routing the user to a separate Next.js page. I chose this approach because it allows the user to quickly inspect a Pokemon's stats without losing their current page. I avoided the overhead of setting up dynamic URL routing to invest time into other areas of the project. The disadvantages of this method were that the URL in the browser does not change, so it is hard to bookmark and compare stats between different Pokemon. 

## 3.	State Management Approach

Given the localised scope of this application, I decided to use native React Hooks such as `useState` and `useEffect` to manage the application state. Because the state updates are independent and relatively simple, `useState` provided a clean, readable solution. All states are initialised with default values when the page initially renders, before `useEffect` runs to load the data from the API. `pokemonList` stores the array of the 12 pokemon fetched from the API. It acts as the primary data source for the application and is mapped over to render the grid of pokemon card components. `nextUrl` and `prevUrl` control the pagination logic by storing the exact API endpoints for the next and previous sets of Pokémon data. `selectedPokemon` and `isDialogOpen` handle the detailed view, ensuring only the currently selected Pokemon's data is passed down to the dialog component.
I wrapped the `fetchPokemon` function within a `useEffect` to prevent an infinite loop of fetching, updating state, and re-rendering. I also included an empty dependency array to ensure the initial fetch is only run exactly once, after the UI has been created. Once this initial data loads, subsequent state updates are handled by user-triggered event listeners, such as the `onClick` handlers on the pagination buttons. 

## 4.	API Interaction Strategy

To handle data fetching from the PokéAPI, I used the browser's native `fetch` API within asynchronous functions (`async`/`await`). I created a reusable `fetchPokemon(url)` function inside the `Home` component. By designing this function to accept a dynamic URL string as an argument, I was able to use the exact same logic for the initial page load as well as for the pagination controls.

To display the Pokemon images on each card, I could have introduced additional fetch requests and states for each individual component. Instead, I wrote a helper function, `getPokemonIdFromUrl`, to extract the Pokemon's unique ID. By inserting this ID into a raw GitHub URL string, I was able to access the required image locally, bypassing the need for an extra network request per card.

Finally, the `fetchPokemonDetails` function is only triggered on demand when a user explicitly clicks on a Pokemon card, minimising the data the application needs to download upfront.

## 5.	Challenges Encountered & Solutions

When implementing the pagination controls, TypeScript flagged a potential error regarding the type of my `prevUrl` state. To troubleshoot this, I inspected the PokéAPI's JSON response and identified that on the first page of results, the previous endpoint is explicitly returned as null. Because my `fetchPokemon` function strictly expected a string argument, passing this potentially null value would have crashed the browser.

To resolve this issue, I researched button event handling. After reviewing the React documentation on conditional rendering, I opted to use short-circuit evaluation to prevent the action occurring if `prevUrl` is null. At the component level, I used the `disabled` prop after reading the shadcn/ui documentation, which provides visual feedback to the user by greying out the button when on the first page. I was then able to apply this same logic to the Next button to prevent similar errors on the final page. This experience highlighted to me exactly why TypeScript is so valuable when writing applications like these, as it catches edge cases before they become runtime crashes.

Another challenge I came across was when I modularised my codebase. Initially, I built the core functionality within a single `page.tsx` file. However, to align with industry standards and improve maintainability, I extracted the UI into separate components, starting with `PokemonCard`. The problem occurred when passing the Pokemon data and the `onClick` handler from the parent page down to the component; it initially failed to compile because the props were not explicitly defined. By researching the TypeScript compiler warnings, I discovered I needed to define an interface for my props and assign it to `PokemonCard`. I wrote a `PokemonCardProps` interface within `PokemonCard` to satisfy the compiler and ensure the incoming data was strictly typed. I then repeated this pattern for my `pokemonDetailsDialog` component, too.

## 6.	Self-Reflection & Potential Improvements 

Given that I have little prior experience building apps with Next.js, React, and TypeScript, I am proud of my resilience in rapidly learning these new concepts to deliver a functional product. I deliberately planned my workflow to prioritise building a Minimum Viable Product that fulfilled the core requirements of the brief; only when the core logic was sound did I transition to refining the individual designs and styles of the components. In particular, I am pleased that I was able to overcome some challenges in modularising my components into different files once the MVP was complete, as this aligned my application more closely with professional practices. 

If I had more time, I would match the information in the detailed view more closely to the provided Figma design by including data I missed out e.g. stats bars, Weaknesses, Abilities. I would also focus on elevating the user experience and making the most of the full power of the Next.js framework. Currently, there is a fractional delay during the initial `useEffect` fetch where the UI is waiting for the data to load. I would implement an `isLoading` state to conditionally render Shadcn's skeleton components or a spinner indicator while the intial data is being fetched. Furthermore, I would extend this loading state to the pagination controls. Displaying a loading indicator (such as a spinner) when fetching subsequent pages would provide visual feedback that the application is working, rather than temporarily showing a static or empty screen. Additionally, while my dialog component works well for quick interactions, it does not take advantage of Next.js's routing capabilities. I would refactor the application to move the detailed view to its own dedicated page (e.g. http://localhost:3000/pokemon/[id]). This architectural shift would allow users to share direct links to specific Pokémon to explore and compare stats. I would also focus on completing the other bonus features outlined in the brief, such as implementing a robust search functionality. 
