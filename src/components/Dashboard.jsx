import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StatBarChart from "./StatsChart";
import TypePieChart from "./TypeChart";
import './Dashboard.css'

const Dashboard = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [availableTypes, setAvailableTypes] = useState([]);


    //retrieving api data <3
    useEffect(() => {
    const fetchData = async () => {
        const res = await fetch("https://pokeapi.deno.dev/pokemon");
        const data = await res.json();
        setPokemonList(data);

        const allTypes = new Set();
        data.forEach((poke) => {
        if (Array.isArray(poke.types)) {
            poke.types.forEach((t) => allTypes.add(t));
        }
        });

        setAvailableTypes(["all", ...Array.from(allTypes)]);
    };

    fetchData();
    }, []);

    //filtering functionalities
  const displayedPokemon = pokemonList
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((pokemon) =>
    selectedType === "all" || pokemon.types?.includes(selectedType)
    )
    .slice(0, 10);      //takes first 18 -- debug
    
    const totalPokemon = pokemonList.length;

    // finding total num types
    let totalTypes = 0;
    let typeCounts = {};

    pokemonList.forEach((pokemon) => {
    const types = pokemon.types || [];
    totalTypes += types.length;

    types.forEach((type) => {
        typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
    });

    const avgTypesPerPokemon = totalPokemon > 0     // avg types per pokémon + round
    ? (totalTypes / totalPokemon).toFixed(2)
    : "0.00";

    let mostCommonType = "None";    //identifying the common type
    let highestCount = 0;

    for (const [type, count] of Object.entries(typeCounts)) {
        if (count > highestCount) {
            mostCommonType = type;
            highestCount = count;
        }
    }

    //note to self: debug the types -- have to use if/else statement
    console.log("Pokemon list passed to charts:", pokemonList);

    return (
        <div>

            {/* <h1>Pokémon Dashboard</h1> */}

                {/*had to split the data stats containers to make it look nice lol*/}
            <div className="stat-container">
                <div className="stat1">
                    <h3>Total Pokemon: {totalPokemon} </h3>
                </div>
                <div className="stat2">
                    <h3>Avg. Type per Pokemon: {avgTypesPerPokemon}</h3>
                </div>
                <div className="stat3">
                    <h3>Most Common Type: {mostCommonType}</h3>
                </div>
            </div>

                {/*header*/}
            {/* <h2>Total Pokémon: {pokemonList.length}</h2> */}
            
            {/*searches and filters*/}
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-bar" />

            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="type-filter">
                {availableTypes.map((type) => (
                    <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                ))}
            </select>

            {/*header*/}
            <div className="dash-chart-container">
                <div className="poke-list">
                    <div className="list-header">
                        <h2>Image:</h2>
                        <h2>Name:</h2>
                        <h2>Type:</h2>
                    </div>

                    {/*listed out pokemon -- check if link is to pokemon.name or pokemon.id*/}
                    {displayedPokemon.map((pokemon) => (
                        <Link to={`/pokemon/${pokemon.name}`} key={pokemon.id}>
                            <div className="poke-card">
                                <img src={pokemon.imageUrl} className="poke-image"></img>
                                <h3>{pokemon.name}</h3>
                                <h3 className="poke-type"> {Array.isArray(pokemon.types) ? pokemon.types.join(", ") : "Unknown"} </h3> 
                            </div>
                        </Link>
                    
                    ))}
                </div>
                    
                {/*charts*/}
                
                <div className="chart-column">
                    <TypePieChart pokemonList={pokemonList} />
                    <StatBarChart className="bar-chart" pokemonList={pokemonList} />
                </div>
            </div>
            
        </div>
    );
};

export default Dashboard;