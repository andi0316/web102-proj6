import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#d0ed57"];

export default function TypePieChart({ pokemonList }) {
  const typeCount = {};

  pokemonList.forEach((pokemon) => {
    pokemon.types.forEach((type) => {
      typeCount[type] = (typeCount[type] || 0) + 1;
    });
  });

  const data = Object.entries(typeCount).map(([name, value]) => ({ name, value }));

  return (
    <PieChart width={400} height={300}>
      <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
        {data.map((_, i) => (
          <Cell key={i} fill={COLORS[i % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
