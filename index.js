const express=require("express");

//database
const database=require("./database");

//initializing the express
const booky=express();


/*
API MODAL
Router-/
description-to get all the books
parameters-none
access-public
methods-GET
*/

booky.get("/",(req,res)=>{
  return res.json({books:database.books});
});

/*
API MODAL
Router-/is
description-to get specific book
parameters-ISBN
access-public
methods-GET
*/

booky.get("/is/:isbn",(req,res)=>{
   const getSpecificBook = database.books.filter((book)=>book.ISBN === req.params.isbn);
   if(getSpecificBook.lenght === 0){
     return res.json({error: `no book found for such isbn ${req.params.isbn}` });
   }
     return res.json({book : getSpecificBook});
});

/*
API MODAL
Router-/c
description-to get specific book based on category
parameters-category
access-public4
methods-GET
*/

booky.get("/c/:category",(req,res)=>{
   const getSpecificBook=database.books.filter((book)=>book.category.includes(req.params.category));
   if(getSpecificBook.lenght != 0){
    return res.json({book : getSpecificBook});
   }
     return res.json({error: `no book found for such category of ${req.params.category}` });
});
/*
API MODAL
Router-/l
description-to get specific book based on language
parameters-language
access-public
methods-GET
*/

booky.get("/l/:language",(req,res)=>{
   const getSpecificBook=database.books.filter((book)=>book.language === req.params.language);
   if(getSpecificBook.lenght === 0)
   {
     return res.json({error: `no book found for such language of ${req.params.language}` })
   }
   return res.json({book: getSpecificBook});
});

/*
API MODAL
Router-/authors
description-to get an info about authors
parameters-none
access-public
methods-GET
*/

booky.get("/author",(req,res)=>{
   return res.json({authors: database.authors});
});

/*
API MODAL
Router-/author/is
description-to get an info about authors based on id
parameters-id
access-public
methods-GET
*/

booky.get("/author/iden/:id",(req,res)=>{
   const getSpecificAuthor=database.authors.filter((author)=>author.id === parseInt(req.params.id));
   if(getSpecificAuthor.lenght === 0)
   {
     return res.json({error: `no author found for such id of ${req.params.id}` });
   }
   return res.json({authors: getSpecificAuthor});
});

/*
API MODAL
Router-/author/book
description-to get an info about authors based on books
parameters-ISBN
access-public
methods-GET
*/

booky.get("/author/book/:isbn",(req,res)=>{
   const getSpecificAuthor=database.authors.filter((author)=>author.books.includes(req.params.isbn));
   if(getSpecificAuthor.lenght === 0)
   {
     return res.json({error: `no author found for such book of ${req.params.isbn}` });
   }
   return res.json({Authors: getSpecificAuthor});
});

/*
API MODAL
Router-/publications
description-to get an info about publications
parameters-none
access-public
methods-GET
*/

booky.get("/publications",(req,res)=>{
   return res.json({pub: database.publication});
});

/*
API MODAL
Router-/publications/is
description-to get specific publication based on id
parameters-Id
access-public
methods-GET
*/

booky.get("/publications/is/:id",(req,res)=>{
   const getSpecificPub=database.publication.filter((pub)=>pub.id === parseInt(req.params.id));
   if(getSpecificPub.lenght === 0){
     return res.json({error: `no publication is found for such id ${req.params.id}` });
   }
     return res.json({publications: getSpecificPub});
});

/*
API MODAL
Router-/Publications/book
description-to get an info about publications based on books
parameters-Isbn
access-public
methods-GET
*/

booky.get("/publications/book/:isbn",(req,res)=>{
   const getSpecificPub=database.publication.filter((pub)=>pub.books.includes(req.params.isbn));
   if(getSpecificPub.lenght === 0)
   {
     return res.json({error: `no publication found for such isbn of ${req.params.isbn}` });
   }
   return res.json({publications: getSpecificPub});
});


booky.listen(3000,()=>{
  console.log("server at port 3000 is up and running");
});
