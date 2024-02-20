import React, { useEffect, useState } from "react";


function PokemonStats (props){
    const [stats, setStats] = useState(false)

    useEffect(() => {
        async function fetchData (){
            const pokemonData = await fetch(props.url)
            const pokemon = await pokemonData.json();

            const newStats = {};
            pokemon.stats.forEach(element => {
                const nameOfStat = element.stat.name;
                const valueOfStat = element['base_stat']

                newStats[nameOfStat] = valueOfStat;
                });

                setStats(newStats);
        }

        fetchData();

    }, [props.url])

    return(
        <div>
            {stats ? <p>valami: {(stats.attack)}</p> : <p>not yet</p>}
        </div>
    )
    
}

export default PokemonStats;