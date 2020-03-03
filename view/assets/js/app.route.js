var app = Sammy('body', function () { 
 
    /*this.get('#/unmatched-hotels/:data',function(){ 
      window.location.hash = '#/unmatched-hotels'; 
    });*/ 
    this.get('#/dashboard/:data',function(){ 
      window.location.hash = '#/dashboard'; 
    }); 
    // /window.location.hash = '#/hotel-matching-queue'; 
 
  this.notFound = function () { 
        route = this; 
        window.location.hash = '#/dashboard'; 
    }; 
}); 