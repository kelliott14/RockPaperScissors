$(document).ready(function() {
    
    var config = {
        apiKey: "AIzaSyCxS0eBVsumuimkLasTR_4BqEIYFdDsUWU",
        authDomain: "bootcamp-5213b.firebaseapp.com",
        databaseURL: "https://bootcamp-5213b.firebaseio.com",
        projectId: "bootcamp-5213b",
        storageBucket: "bootcamp-5213b.appspot.com",
        messagingSenderId: "409316849325",
        appId: "1:409316849325:web:6d67206e22effae63bb824"
      };
      
    firebase.initializeApp(config);
    
    var database = firebase.database();

    var playGame;
    var playerOneSelect;
    var playerTwoSelect;
    var user;
    var userIs;
    var uid;
    var playerOne;
    var playerTwo;

    //on initial load of the page
    function onLoad(){
        var pickPlayerOne = $("<button>Player One</button>");
        var pickPlayerTwo = $("<button>Player Two</button>");

        $(pickPlayerOne).addClass("btn btn-primary btn-block");
        $(pickPlayerTwo).addClass("btn btn-danger btn-block");

        $(pickPlayerOne).attr("id", "playerOnePick");
        $(pickPlayerTwo).attr("id", "playerTwoPick");

        $(".playerOneDiv").append(pickPlayerOne);
        $(".playerTwoDiv").append(pickPlayerTwo);

        playerOneSelect = false;
        playerTwoSelect = false;
        
    //TO-DO: clear chatbox
    }
    
    onLoad();

    //Player One select
    $("body").on("click", "#playerOnePick", function(){
    
      firebase.auth().signInAnonymously().catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
                });
        user = firebase.auth().currentUser;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var isAnonymous = user.isAnonymous;
                uid = user.uid;
            }
        })

        database.ref("/playerOne").set({
                user: user.uid,
      })
        
      database.ref().on("value", function(snapshot){
          playerOne = snapshot.val().user;
          
        if (playerOne = uid){
            userIs = ("playerOne");
            console.log(userIs);

        }

      })
      playerOneSelect = true;

    
    });

    //player two select
    $("body").on("click", "#playerTwoPick", function(){
    
        firebase.auth().signInAnonymously().catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
                  });
          user = firebase.auth().currentUser;
          firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                  var isAnonymous = user.isAnonymous;
                  uid = user.uid;
              }
          })
  
          database.ref("/playerTwo").set({
                  user: user.uid,
        })
          
        database.ref().on("value", function(snapshot){
            playerOne = snapshot.val().user;
            
          if (playerTwo = uid){
              userIs = ("playerTwo");
            
          }
  
        })
      
        playerTwoSelect = true;
        console.log(userIs);
      });

    function startGame(){
        if(userIs == "playerOne"){
            $(".playerTwoDiv").hide();
        }else if(userIs == "playerTwo"){
            $(".playerOneDiv").hide();
        }
    }


    if((playerOneSelect) && (playerTwoSelect) == true){
        startGame();
    }

});