const postIdInput = document.getElementById('postIdInput');
const searchButton = document.getElementById('searchButton');
const postContainer = document.getElementById('postContainer');
const commentsButton = document.getElementById('commentsButton');
const commentsContainer = document.getElementById('commentsContainer');

searchButton.addEventListener('click', () => {
  const postId = postIdInput.value;

  if (postId >= 1 && postId <= 100) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => response.json())
      .then(post => {
        
        const postElement = document.createElement('div');
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.body}</p>
        `;
        postContainer.appendChild(postElement);

        
        commentsButton.style.display = 'block';
        commentsButton.addEventListener('click', () => {
          
          fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then(response => response.json())
            .then(comments => {
              
              commentsContainer.innerHTML = '';
              comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.innerHTML = `
                  <h3>${comment.name}</h3>
                  <p>${comment.body}</p>
                `;
                commentsContainer.appendChild(commentElement);
              });
            })
            .catch(error => {
              console.error('Error fetching comments:', error);
            });
        });
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  } else {
    console.log('Invalid post ID');
  }
});