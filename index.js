const express=require("express");

const database =require("./database");

const booky=express();

booky.use(express.json());

/*
Route         /
Description   get all books
Access        public
Parameter     none 
Methods       get
*/

booky.get("/",(req,res)=>{
 return res.json({books:database.books});
});

/*
Route         /is
Description  get specific books
Access        public
Parameter     isbn
Methods       get
*/

booky.get("/is/:isbn",(req,res)=>{
const getSpecificBook=database.books.filter(
    (book)=>book.ISBN===req.params.isbn);

if(getSpecificBook.length===0){
    return res.json({
    error:`No book found for the ISBN of ${req.params.isbn}`,
});
}

return res.json({book:getSpecificBook});
});

/*
Route         /c
Description  get specific books based on category 
Access        public
Parameter     category
Methods       get
*/

booky.get("/c/:category",(req,res)=>{
 const getSpecificBook=database.books.filter((book)=>
 book.category.includes(req.params.category)
 );
 if(getSpecificBook.length===0){
    return res.json({
    error:`No book found for the category of ${req.params.category}`,
});
}

return res.json({book:getSpecificBook});
});

/*
Route         author
Description  get all authors
Access        public
Parameter     none
Methods       get
*/

booky.get("/author",(req,res)=>{
return res.json({authors:database.author});
});

/*
Route         /author/book
Description  get all authors based on books
Access        public
Parameter     none
Methods       get
*/

booky.get("/author/book/:isbn",(req,res)=>{
    const getSpecificAuthor=database.author.filter((author)=>
    author.books.includes(req.params.isbn)
    );
    if(getSpecificAuthor.length===0){
       return res.json({
    error:`No Author found for the book of ${req.params.isbn}`,
   });
   }
   
   return res.json({authors:getSpecificAuthor});
});


booky.get("/publications",(req,res)=>{
    return res.json({publications:database.publication});
});

/*
Route         /book/add
Description   add new book 
Access        public
Parameter     none
Methods       post
*/

booky.post("/book/add/",(req,res)=>{
    console.log(req.body);
const {newBook}=req.body;
database.books.push(newBook);
return res.json({books:database.books});
});

/*
Route         /author/add
Description   add new author
Access        public
Parameter     none
Methods       post
*/

booky.post("/author/add",(req,res)=>{
    const {newAuthor}=req.body;
database.author.push(newAuthor);
return res.json({author:database.author});
});

/*
Route         /book/update/title
Description   update book title
Access        public
Parameter     isbn
Methods       PUT
*/
booky.put("/book/update/title/:isbn",(req,res)=>{
database.books.forEach((book)=>{
    if(book.ISBN===req.params.isbn){
        book.title=req.body.newBookTitle;
        return
    }
});
return res.json({books:database.books});
});

/*
Route         /book/update/title
Description   update book title
Access        public
Parameter     isbn
Methods       PUT

booky.put("/book/update/author/:isbn/:authorId",(req,res)=>{
   //update book database
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
           return book.author.push(parseInt(req.params.authorId));
        }
    });
    //update author database
    database.author.forEach((author)=>{
        if (author.id=== parseInt(req.params.authorId))
         return author.books.push(req.params.isbn);
    });
    return res.json({books:database.books,author:database.author});
});
*/
/*
Route         /publication/update/book
Description   update /add new book to publication
Access        public
Parameter     isbn
Methods       PUT
*/
booky.put("/publication/update/book/:isbn",(req,res)=>{
    //update publication database
     database.publications.forEach((publication)=>{
         if(publication.id ===req.body.pubId){
            return publication.books.push(req.params.isbn);
         }
     });
     //update author database
     database.author.forEach((book)=>{
         if (book.ISBN === req.params.isbn) { 
          book.publication=req.body.pubId;
          return ;
         } 
     });
     return res.json({
    books:database.books,
    publications:database.publications,
    message:"Successfully updated the publication",
    });
 });


 /*
Route         /book/delete
Description   delate a book
Access        public
Parameter     isbn
Methods       DELETE
*/
booky.delete("/book/delete/:isbn",(req,res)=>{
    const updatedBookDatabase=database.books.filter(
        (book)=>book.ISBN !==req.params.isbn
    );

    database.books=updatedBookDatabase;
    return res.json({books:database.books});
});

/*
Route         /book/delete/author
Description   del a author from a book
Access        public
Parameter     isbn,author id
Methods      DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=>{
    database.books.forEach((book)=>{
        if (book.ISBN===req.params.isbn){
        const newAuthorList=book.authors.filter(
            (author)=>author!=parseInt(req.params.authorId)
        );
        book.authors=newAuthorList;
        return;
        }
    });
    
    database.authors.forEach((author)=>{
    if (author.id===parseInt(req.params.authorId)){
        const newBookList=author.books.filter(
            (book)=>book !==req.params.isbn
        );
        author.books=newBookList;
        return;
    }  
    });
    return res.json({
        message:"author was deleted!!!!",
        book:database.books,
        author:database.authors,
    });
});

/*
Route         /publication/delete/book
Description   del a book from publication
Access        public
Parameter     isbn,publication id
Methods      DELETE
*/
booky.delete("/publication/delete/book/:isbn/:pubId",(req,res)=>{
database.publications.forEach((publication)=>{
    if (publication.id===parseInt(req.params.pubId)){
        const newBookList=publication.books.filter(
            (book)=>book !==req.params.isbn
        );
        publication.books=newBookList;
        return;
    }  
    });
    return res.json({books:database.books,publications:database.publications})
});

booky.listen(3000,()=>console.log("Hey server is running!!")) ;