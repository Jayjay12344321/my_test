$(document).userTimeout({
      // ULR to redirect to, to log user out
      logouturl: main.index_url,             
      // URL Referer - false, auto or a passed URL    
      referer: false,           
      // Name of the passed referal in the URL
      refererName: 'refer',       
      // Toggle for notification of session ending
      notify: true,                     
      // Toggle for enabling the countdown timer
      timer: true,            
      // 10 Minutes in Milliseconds, then notification of logout
      session: 28800000,                  
      // 5 Minutes in Milliseconds, then logout
      force: 10000,      
      // Model Dialog selector (auto, bootstrap, jqueryui)             
      ui: 'bootstrap',                       
      // Shows alerts
      debug: false,           
      // <a href="https://www.jqueryscript.net/tags.php?/Modal/">Modal</a> Title
      modalTitle: 'Session Timeout',    
      modalBody: 'You\'re being timed out due to inactivity. Please choose to stay signed in or to logoff. Otherwise, you will logged off after 5 Minutes automatically.',
      // Modal log off button text
      modalLogOffBtn: 'Log Off', 
      modalStayLoggedBtn: 'Stay Logged In' 
    });