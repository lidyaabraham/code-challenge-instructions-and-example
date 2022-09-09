const title = document.getElementById('card-title');
const image = document.getElementById('card-image');
const likesCount = document.getElementById('like-count');
const likeBtn = document.getElementById('like-button');
const commentList = document.getElementById('comments-list');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment');
const listOfComments = document.getElementsByTagName('li');

//Load document to fetch images
document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/images/1')
    .then(resp => resp.json())
    .then(result => displayResult(result));

  //Changing dom from fetched data
  function displayResult(data) {
    title.textContent = data.title;
    image.src = data.image;
    likesCount.textContent = `${data.likes} likes`;
    commentList.innerHTML = data.comments.map(comment => `<li id=${comment.id}>${comment.content}</li>`).join('');
  }

  //Change image of dog on clicking image
  image.addEventListener('click', fetchImage);
  function fetchImage() {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(resp => resp.json())
      .then(result => {
        image.src = result.message;
      })
  }
})

//Change the visibility of image on title click
title.addEventListener('click', () => {
  var visibility = image.style.visibility;
  image.style.visibility = visibility == "visible" ? 'hidden' : "visible"
})


//Add likes when heart icon is clicked
likeBtn.addEventListener('click', addLikes);
function addLikes() {
  likesCount.textContent = `${parseInt(likesCount.textContent.slice(0, 2)) + 1} likes`;
}

//Add comment
commentForm.addEventListener('submit', addComment);
function addComment(event) {
  event.preventDefault();
  let comment = commentInput.value;
  // console.log(commentInput.value)
  fetch('http://localhost:3000/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      imageId: 1,
      content: comment
    })
  })
    .then(resp => resp.json())
    .then(result => console.log(result))
}

//Delete comment when comment is clicked
commentList.addEventListener('click', function (e) {
  if (e.target.nodeName == 'LI') {
    e.target.remove();
    deleteComment(e.target.id);
  }
})

function deleteComment(id) {
  fetch(`http://localhost:3000/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(resp => resp.json())
    .then(comment => console.log(comment))
}