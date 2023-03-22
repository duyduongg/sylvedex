# Pokédex

A simple pokédex website

# API documentation

- All of API calls endpoint belong to `https://pokeapi.co/`
- Base endpoint: `https://pokeapi.co/api/v2/`
  - Get pokémon for a list:
    - Method: GET
    - Endpoint: `pokemon`
    - Request: `{limit: number, offset: number}`
    - Response: `{count: number, next: string, previous: string, result: []}`
  - Get pokémon info:
    - Method: GET
    - Endpoint: `/{pokemonId}/`
    - Response: `{id: number, name: string, sprite: {official-artwork: {front_default: string, front_shiny: string}}, }, type: [{slot: number, type: {name:}}]`
