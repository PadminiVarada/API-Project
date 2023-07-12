const books=[
  {
    ISBN:"12345Book",
    title:"Tesla!!",
    pubDate:"03-06-23",
    language:"en",
    pageNum:250,
    author:[1,2],
    publication:[1],
    category:["tech","space","education"]
  },
]
const authors=[
  {
    id:1,
    name:"padhu",
    books:["12345Book","secretbook"]
  },
  {
    id:2,
    name:"anonymous",
    books:["12345Book"]
  }
]
const publication=[
  {
    id:1,
    name:"writex",
    books:["12345Book"]
  }
]
module.exports={books,authors,publication};
