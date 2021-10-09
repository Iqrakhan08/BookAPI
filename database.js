let books=[
    {
    ISBN:"12345ONE",
    title:"Getting started with MERN",
    authors:[1,2],
    language:"en",
    pubDate:"2021-07-07",
    numPage:255,
    publication:1,
    category:["tech","programming","web dev","fiction"],
},
{
    ISBN:"12345Two",
    title:"Getting started with Python",
    authors:[1,2],
    language:"en",
    pubDate:"2021-07-07",
    numPage:255,
    publication:1,
    category:["fiction","tech","web dev"],
},
];
const authors=[
{
 id:1,
 name:"Iqra",
 books:["12345ONE","12345Two"],
},
{
id:2,
name:"Elon Musk",
books:["12345ONE"],
},
];
const publications=[
    {
        id:1,
        name:"writex",
        books:["12345ONE"],
    },
    {
        id:2,
        name:"Vickey publications",
        books:[],
    },
];

module.exports={books,authors,publications};