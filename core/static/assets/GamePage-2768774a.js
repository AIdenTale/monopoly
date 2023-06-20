import{u as o,r,j as a}from"./index-ea55bfc4.js";const s="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATMSURBVHgB7ZtbbBZFGIbfKhpLrXKIKCeFoCAYjEENGtNo4oVRe4Eaj1GjJGq8FIwXHjBRe4eJpxvvDFEvJMbDBcELhVSjlRtjqESiNXIsTShQCoVA2493MkNSvn92t92df/9Z6JO82c525ptvZmdmdw4/MMkkFzRNKBkRWc5LGzWbmudu76V6qc6mpqZunG+w0NOp96geyeZfF3c6qg4LcTH1KnVIJk4/tdbYQBWh463U91KczdQ01Im6jAF0+CpetlLLPP8+Tv1A/QHb9w1mLFhB3UdN9aTZQd3N8eEgYoeFv5Tq9DzJg9QrVHNK2mZqjYur2Updgtihkx97nO90rWK8NmZRP3vsfIiYoYM3UcPK6U2mVWCCuJa0Wdk6Td2IWKFz3ymHd1JXIidMO436R9n8BjFCx+ZQo8rZ+1EQ2mhXNkeo2YgNOvWScrQLgaCtbcr2CwjERQiHftobEY6NGXnlJmQFLFDhnxAObWshAhGyAuaq8B6EQ9uag0CErIBWFR5EOAZUOPebRROyAvpUeBbCoUf9XgQiZAVopxYjHNdn5JWbkBWwXYUfRDjaM/JqPJ4Plv3UVBSENlqoXmX7AcSG2JncUeXo6ygIbbylbA5QlyFG6Ng7ytkT1B3ICdPeSZ1UNt9GrIhdBerzdIXlEzRlbN3safoHqMsRM3TwEamdFA1ST1GZK1AmDvW0SzMWY/MhVAHTTMVPF/WYaSmeNFdQj1O/J6Rdh6rgnuL7kozp19vFLpZscn+fTIm/fjytJzro9PMZBcvCDKLPocqwANdSn4pdyBgvpr9/RS3C+YLYUb2D6k4peLeLM+G3Rl4a0q9YwJmwE5z57paZ7vZy3b8fJTMFJeMKfx01gzq7WnyN+Zv/Q9mVUNcWwAKZydZK6l7qHuoWamZGMrP78ye1hfqR2sZKGUWVYMEXit3h3SXF+d/ZWoDYoZNLqA1iNzBCc4r6jLoBAQnSBehUCy9vUmuprP27IaoHdgXpuLtn0l8Nu/DRnJH+FLWe6mDXGEKjYeFvk/SDD+ab/guxH0WLJOWLTuwXpImzmvqSOpZi1+wYrUAjoQMvS/KX3l+u0Llnbyatq4wdCXmYvF9E2bgn1ZHg1G6xE55gy23GFvUEtSchz3dRJszwI48To+5+C+qEaxGfJFTCBygDZrTOk7lZplqFkmBeD0vt8pvhDdQTZvCkJ1OzAnQrSkbs4NvnaYWPoh7Q8GJPrZujLMvQIMQeyOhXPh2R0LNIsYNQl8poiFqJBiN24fSE8u0XCbmAIrV7/4Zge/RFEfs61qxGCMSu9OpTW18jMujTt8pHMz4UfyPRyGvKsBkH5iEy6NN8qV1JXoMiiD2ppdfmo12dldqNmX1S5GwhE6/yPP1oDzHTtxlS+6ZqT0uT9bn6jApv4AzsMCKFvh3i5XN1+1nkwTV/PRu7HZEj9rU4lsFc3YCJ2pShXagAYidqe5XvdyXFT+sCbSq8BRWA3UBQ62tbUvy0Cliqwr+hOvyqwkuTIqZVgD6U/Deqw04VXpIUMa0C9Mms/1AdelR4blLEtArQW9gDqA7a19akiGkLlMO8jP3B0hQOMCOoAGJ/aDU85tYIfffugqVVgJwTkaBCjNf/tL3BkKe9G0HV/Z9kkjI4A6opfyjnYS8pAAAAAElFTkSuQmCC";const t=e=>{new WebSocket("ws://127.0.0.1:8000/ws/game/"+e+"/"),new WebSocket("ws://127.0.0.1:8000/ws/game/"+e+"/chat/")},n=({player:e,activePlayer:A})=>a.jsxs("div",{className:"player__block",style:{background:A===e.id?e.color:"#9FA2A3"},children:[a.jsx("div",{className:"player__image",style:{border:"4px solid "+e.color},children:a.jsx("img",{src:e.image})}),a.jsx("div",{className:"player__name",children:e.name}),a.jsxs("div",{className:"player__balance",children:[e.balance," ₽"]})]}),g=()=>{let A=o().game_id;r.useRef(),r.useEffect(()=>t(A));const[l,d]=r.useState(1);let c=[{id:1,color:"green",name:"user 1",image:s,is_creator:!1,balance:1e4},{id:2,color:"red",name:"user 2",image:s,is_creator:!0,balance:1e4},{id:3,color:"yellow",name:"user 3",image:s,is_creator:!1,balance:1e4},{id:4,color:"blue",name:"user 4",image:s,is_creator:!1,balance:1e4}];return a.jsx("div",{className:"game",children:a.jsxs("div",{className:"game__inner",children:[a.jsx("div",{className:"players",children:c.map(m=>a.jsx(n,{player:m,activePlayer:l}))}),a.jsx("div",{className:"game__table"})]})})};export{g as default};
