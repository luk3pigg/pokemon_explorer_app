export default async function Home() {
  const url = 'https://pokeapi.co/api/v2/pokemon'
  const res = await fetch(url);
  const data = await res.json()
  console.log(data);
  return (
    <main className="p-8">
      <h1>Luke's Pokémon App</h1>
    </main>
  );
}

