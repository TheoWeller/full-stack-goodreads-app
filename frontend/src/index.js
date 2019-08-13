$( document ).ready(() => {
// $("#book-container").toggleClass("hide")
let prevQuery;
/**************
EVENT HANDLERS
***************/
//Search button event listener
$("#search-container button").click(e => {
  prevQuery = $("#search").val()
  newSearchHandler()
  // prevQuery === $("#search").val() && $(".book-container-item").length >= 0 ? newSearchHandler() : null;
  fetchHandler(prevQuery)
});

//Book container event listener
$('#book-container').on('click', '.book-container-item', (e) => {
  if(e.target.tagName !== "UL"){
    showBookFetchHandler(e.target.parentElement.id)
  } else {
    showBookFetchHandler(e.target.id)
  };
});

//exit popup handler
$("#popup").click(e => {
  //protects against book anchor tag click - waits for redirect
  if(e.target.tagName !== "A"){
    $("#popup").toggleClass("activate")
    $("#popup-content").remove()
    $("#book-container").toggleClass("hide")
  }
});

/**************
HELPER METHODS
***************/
//add book items to dom
const appendBooks = (books) => {
  books.forEach(book => {
    $( "#book-container" ).append(`
        <ul class="book-container-item" id=${book.id}>
          <img src=${book.image_url}>
          <span>${book.title}</span>
          <span class="author">Author: ${book.author.name}</span>
        </ul>
      `
    );
  });
  // $("#book-container").toggleClass("hide");
};

const appendBookToPopup = (book) => {
  $( "#popup" ).append(`
    <div id="popup-content">
      <img src=${book.image_url}>
      <span><a href=${book.url}>${book.title}</a></span>
      <span class="author">Author: ${book.author}</span>
      <span>${book.description}</span>
    </div>
    `
  );
  $("#popup").toggleClass("activate")
};

const newSearchHandler = () => {
  $(".book-container-item").length >= 0 && $(".book-container-item").remove() && $("#book-container").toggleClass( "hide" );

};

const fetchHandler = query => {
  fetch(`http:localhost:3000/api/v1/books/${query}`)
  .then(response => response.json())
  .then(data => {
    appendBooks(data);
    $("#book-container").toggleClass("hide")
  });
};

const showBookFetchHandler = bookId => {
  $("#book-container").toggleClass("hide")
  fetch(`http:localhost:3000/api/v1/book/${bookId}`)
  .then(response => response.json())
  .then(data => {
    appendBookToPopup(data);
  });
};

});//end document ready
