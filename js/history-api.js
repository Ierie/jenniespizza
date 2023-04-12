  const loadingScreen = document.getElementById('loading-screen');
  
  // Define the initial state
  window.history.replaceState({ page: 'home' }, 'home', '#home');

  // Update the page content
  function updateContent(pageName) {
      // hide all pages
      const pages = document.getElementsByClassName('page');
      for (let p of pages) {
          p.classList.add('hidden');
      }

      // show current page
      loadingScreen.classList.remove('d-none');
      
      setTimeout(() => {
        const currentPage = document.getElementById(pageName);
        currentPage.classList.remove('hidden');
        loadingScreen.classList.add('d-none');
      }, 2000);


  }

  // Handle navigation using the History API
  function navigate(pageName) {
      // Push the new state onto the history stack
      window.history.pushState({ page: pageName }, pageName, `#${pageName}`);
      console.log(window.history);
      updateContent(pageName);
  }
  
  // Handle the popstate event to update the content when the back/forward buttons are clicked
  window.addEventListener('popstate', function(e) {
      if (e.state) {
          updateContent(e.state.page);
      }
  });
