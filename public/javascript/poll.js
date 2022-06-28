async function createPoll(event) {
  event.preventDefault();

 const pollTitle = document.querySelector("#poll-title").value.trim();
 

    const response = await fetch('/api/polls/', {
      method: 'post',
      body: JSON.stringify({
        pollTitle,

        
        
      }),
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.poll-form').addEventListener('submit', createPoll);