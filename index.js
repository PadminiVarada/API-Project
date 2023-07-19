require("dotenv").config();  //configuring the env

const express=require("express");
const mongoose=require("mongoose");

var bodyParser=require("body-parser"); //for the usauge of post-request

//database
const database=require("./database");

//initializing the express
const booky=express();

booky.use(bodyParser.urlencoded({extended:true})); //initilaizmg the body parser
booky.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL,
  {
   useNewUrlParser : true,
   useUnifiedTopology : true,

}).then(()=>console.log("connection established"))
   .catch((error)=>console.log("something wrong",error));


/******************get***************/
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
   if(getSpecificPub.lenght != 0)
   {
     return res.json({publications: getSpecificPub});
   }
   else{
     return res.json({error: `no publication found for such isbn of ${req.params.isbn}` });
   }

});
/**************post-request*************/
/*
API MODAL for POST-REQUEST
Router-/book/new
description-to add a new book
parameters-none
access-public
methods-post
*/

booky.post("/book/new",(req,res)=>{
  const newBook=req.body;
  database.books.push(newBook);
  return res.json({upadtedBook: database.books});
});

/*
API MODAL for POST-REQUEST
Router-/author/new
description-to add a new author
parameters-none
access-public
methods-post
*/

booky.post("/author/new",(req,res)=>{
  const newAuthor=req.body;
  database.authors.push(newAuthor);
  return res.json({upadtedAuthor: database.authors});
});

/*
API MODAL for POST-REQUEST
Router-/publication/new
description-to add a new publication
parameters-none
access-public
methods-post
*/

booky.post("/publication/new",(req,res)=>{
  const newPub=req.body;
  database.publication.push(newPub);
  return res.json({upadtedpublication: database.publication});
});

/*
API MODAL for POST-REQUEST
Router-/publication/condition
description-to add a  updated publication based on some condition
parameters-none
access-public
methods-post
*/


booky.post("/publication/condition",(req,res)=>{
  const newPub1=req.body;
  const updatePub=database.publication.filter((pub)=>pub.books.includes("secretbook"));
  if(updatePub != 0){
    return res.json({updatedpublication: database.publication})
  }
   database.publication.push(newPub1);
   return res.json({upadtedpublication: database.publication});

});

/************put**********/
/*
API MODAL for Put-REQUEST
Router-/publication/update/book
description-to update a publication database
parameters-isbn
access-public
methods-put
*/

booky.put("/publication/update/book/:isbn",(req,res)=>{
    //update the publication data base
    database.publication.forEach((pub)=>{
      if(pub.id===req.body.pubId){
        return pub.books.push(req.params.isbn);
      }
    });
    //update the books daatbase
     database.books.forEach((bk)=>{
        if(bk.ISBN===req.params.isbn){
          bk.publication=req.body.pubId;
          return;
        }
     });
     return res.json({updatedbooks : database.books,
                     updatedpublication: database.publication,
                     message: "succesfully updated"});
});

/***************delete**************/
/*API MODAL for Put-REQUEST
Router-/book/delete
description-to delete a book
parameters-isbn
access-public
methods-delete*/

booky.delete("/book/delete/:isbn",(req,res)=>{
  const updatedBookDatabase=database.books.filter(
    (bk)=>bk.ISBN!==req.params.isbn);
  database.books=updatedBookDatabase;
  return res.json({books : database.books});
});

/*API MODAL for Put-REQUEST
Router-/book/delete/author/
description-to delete a author from book and book from that respective author
parameters-isbn,authorId
access-public
methods-delete*/

booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=>{
   //updating the book database
   database.books.forEach((book)=>{
     if(book.ISBN===req.params.isbn){
       const newAuthorList=book.author.filter(
         (eachAuthor)=>eachAuthor!== parseInt(req.params.authorId));
      book.author=newAuthorList;
      return;
    }
  });
    //updating the author databse
   database.authors.forEach((author)=>{
     if(author.id===parseInt(req.params.authorId)){
       const newBookList=author.books.filter(
         (eachBook)=>eachBook!==req.params.isbn);
       author.books=newBookList;
       return;
     }
    });
    return res.json({books :database.books,
                     authors: database.authors,
                     msg :"deleted author successfully"});

});

booky.listen(3000,()=>{
  console.log("server at port 3000 is up and running");
});
