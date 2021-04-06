import { GetServerSideProps } from 'next'
import Head from "next/head"
import Image from 'next/image'
import Link from "next/link"
import { getPokemonHome, getPokemonData } from '../../lib/fetch'
import { Pokemon } from '../../types/Pokemon'
import { Pokedex } from '../../types/Pokedex'
import Button from "../components/button"
import Spacer from "../components/spacer"

interface PokemonApi {
  data: Pokemon
}

const Ditto = (props: PokemonApi) => {
  if (!props.data.name) return null;

  const pokeImage = props.data?.sprites?.other?.["official-artwork"]?.front_default ?? props.data?.sprites?.front_default

  const pokeName = props.data.species.name.charAt(0).toUpperCase() + props.data.species.name.slice(1)
  
  return (
    <section className="container">     
      <Head>
        <title>{pokeName} | PokéSSR - AWS Amplify</title>
        <meta property="og:title" content={`${pokeName} | PokéSSR - AWS Amplify`} key="title" />
      </Head>
      <article className="ditto">
        <Image 
          src={pokeImage}
          width={240}
          height={240}
          alt={`Pokémon ${props.data.name}`}
        />
        <h1 className="poke-name">{props.data.species.name}</h1>
        <p>Number: {props.data.order}</p>
        <p>Type:</p>
        <ul className="poke-list">{props.data.types.map((info, _) => (<li key={_}>{info.type.name}</li>))}</ul>
        <Spacer size="12" style={{marginTop: '20px'}}/>
        <Button />
      </article>
    </section>)
      
}


export const getServerSideProps: GetServerSideProps = async () => {
  const random = await getPokemonHome() as Pokedex

  const ditto = random.results[random.results.length * Math.random() | 0].name

  let data;

  console.log(ditto)
    
  if (typeof ditto === 'string') {
    data = await getPokemonData(ditto)
  } else {
    data = {}
  }

  return {
    props: {
      data
    }
  }
}

export default Ditto