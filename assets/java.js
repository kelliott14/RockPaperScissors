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
        $(".readySetGoCard").hide();
        $(".playerOneCard").hide();
        $(".playerTwoCard").hide();

        database.ref("/playerOne").set({
            user: null,
        })

        database.ref("/playerTwo").set({
            user: null,
        })
        
    //TO-DO: clear chatbox
    }
    
    onLoad();
    selectPlayerOne();    

    //Player One select
function selectPlayerOne(){
   $(".playerOneCard").show();
   
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
        
     
    
    $(".readySetGoCard").show();
    $(".readyOneButton").text("Player One, are you ready?");
    $(".readyTwoButton").hide();
    $(".winnerButton").hide();
    
    $(".readyOneButton").on("click", function(){
        $(".readyOneButton").text("Ready!");

        database.ref("/playerOne").update({
            state: "true",
        })
    })
    });
}
    
database.ref("/playerOne").on("child_added", function(){
    selectPlayerTwo();

})


function selectPlayerTwo(){
    $(".playerTwoCard").show();
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
          

        playerTwoSelect = true;
     
        $(".readySetGoCard").show();
        $(".readyTwoButton").text("Player Two, are you ready?");
        $(".winnerButton").hide();
      });

        $(".readyTwoButton").on("click", function(){
        $(".readyTwoButton").text("Ready!");

        database.ref("/playerTwo").update({
            state: "true",
        });

        })


    }

    database.ref("/playerOne").on("value", function(snapshot){
        playerOneSelect = snapshot.val().state;
        playerOne = snapshot.val().user;

        console.log(playerOne)
        if (playerOne = uid){
            userIs = ("playerOne");
            console.log(userIs);
        }
    })
    
    database.ref("/playerTwo").on("value", function(snapshot){
        playerTwoSelect = snapshot.val().state;
        playerTwo = snapshot.val().user;
        
        console.log(playerTwo)
        if (playerTwoSelect = uid){
            userIs = ("playerTwo");
            console.log(userIs);
        }
    })

    
    
    

});