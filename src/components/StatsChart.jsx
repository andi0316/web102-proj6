import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function StatBarChart({ pokemonList }) {
  const data = pokemonList
    .filter(p => p.stats && p.name)
    .slice(0, 10)
    .map(pokemon => ({
      name: pokemon.name,
      HP: pokemon.stats.HP,
      Attack: pokemon.stats.Attack,
      Defense: pokemon.stats.Defense,
      Speed: pokemon.stats.Speed,
    }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
        <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} />
        <YAxis />
        <Tooltip dataKey="name" angle={-45} textAnchor="end" interval={0}/>
        <Bar dataKey="HP" fill="#8884d8" />
        <Bar dataKey="Attack" fill="#82ca9d" />
        <Bar dataKey="Defense" fill="#ffc658" />
        <Bar dataKey="Speed" fill="#ff8042" />
      </BarChart>
    </ResponsiveContainer>
  );
}
