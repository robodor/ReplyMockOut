window.fbAsyncInit = function() {
    FB.init({
      appId      : '148136722362113',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
};
    
(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function fbshare() {
    FB.ui(
        {
            method: 'feed',
            link: 'https://circuito.io',
            caption: 'A project I made with circuito.io',
            picture: 'https://roboplan.github.io/NewReplyMock/assets/schematic.png'
        }, 
        function(response) {
            console.log(response);
        }
        );
}
