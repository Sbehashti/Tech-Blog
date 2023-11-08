//Add Blog 
async function newFormHandler(event) {
    event.preventDefault();
  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('textarea[name="post-content"]').value;
  const response = await fetch(`/api/blogs`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}
document.querySelector('.new-blog-form').addEventListener('submit', newFormHandler);

// Edit Blog
async function editFormHandler(event) {
    event.preventDefault();
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('textarea[name="post-content"]').value;
  const response = await fetch(`/api/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}
document.querySelector('.edit-blog-form').addEventListener('submit', editFormHandler);

// Delete Blog
async function deleteFormHandler(event) {
    event.preventDefault();
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const response = await fetch(`/api/blogs/${id}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}
document.querySelector('.delete-blog-form').addEventListener('submit', deleteFormHandler);