
var inputReference = document.getElementById('searchInput');

$(document).keypress(function (enter) {                     //This code block is to check if enter has been pressed to "submit" the input
                                                            //if enter is pressed its default function is disabled
    if (enter.which == 13) {                                //if the active element in the DOM is the input - calls the main function of the project
                                                            //otherwise the user is prompted to enter a valid ingredient
        enter.preventDefault();

        if (inputReference === document.activeElement){

            if(inputReference.value === ""){

                alert("Please enter a valid ingredient");

            } else {
                runApiCall();
            }

        }
    }

});

function runApiCall(){

    var selectRecipeText = document.getElementById("instructionText");                  //All of these variable are references to HTML elements
    var recipeImgHolder = document.getElementById("recipeImgHolder");
    var recipeTitleHolder = document.getElementById("recipeTitleHolder");
    var recipeIngredientsHolder = document.getElementById("recipeIngredientsHolder");
    var recipeWeight = document.getElementById("recipeWeight");
    var recipeInstructions = document.getElementById("recipeInstructions");
    var recipeImg = document.getElementById("recipeImg");

    recipeImgHolder.style.display = "none";                                 //All of these elements are basically reset and turned at the start of the function
    recipeImg.style.display = "none";                                       //because this allows to have a fluid display of data
    recipeTitleHolder.style.display = "none";
    recipeTitleHolder.innerHTML = "";                            
    recipeIngredientsHolder.style.display = "none";
    recipeIngredientsHolder.innerHTML = "";
    recipeWeight.style.display = "none";
    recipeWeight.innerHTML = "";
    recipeInstructions.style.display = "none";

    if(document.getElementById("contentContainer").style.display == "block"){   //If contentContainer was active, a series of animations happen and clears
                                                                                //out the sideTabContainer so that the user can keep making a request
        var delay = 800;

       $("#contentContainer").fadeOut(0, function(){
            $("#loadingAnimation").fadeIn(500);
       });
        
        setTimeout(function(){

            document.getElementById("sideTabContainer").innerHTML = "";

        },delay);

    }

    if(selectRecipeText.style.display = "none"){    //This is used to display the text on the right of the recipe selection tabs 
        selectRecipeText.style.display = "flex"     //when another request is made
    }


    if(inputReference.value === ""){ //If the input is empty, promts the user

        alert("Please enter a valid ingredient");

    } else {    //If the input contains something commence that main functionality of the project

        $("#defaultLandingDisplay").fadeOut(600, function(){ //Set of animations before the main content is shown, including a loading animation
            $("#loadingAnimation").fadeIn(400);
        });

            $.ajax({                            //This ajax calls the results.php page which returns the data from the API
                url: './results.php',
                method: 'GET',
                dataType: 'json',
                data: {
                    inputValue: document.getElementById("searchInput").value    //This value is taken from the PHP file and used to display what the user requested
                },
                statusCode: {

                    200: function(searchData){                                  //This clause only fires when the PHP file from the ajax call returns a 200 ok
                                                                                //Which means a correct request was made
                        $("#loadingAnimation").fadeOut(600, function(){
                            $("#contentContainer").fadeIn(400);
                        });
    
                        var numberOfRecipes = searchData.hits.length;                                   //Gets the number of recipes returned (more info why in the readme.txt)
                        var sideTabContainerReference = document.getElementById("sideTabContainer");    //Creates reference to HTML element
                        
                        for (i = 0; i < numberOfRecipes; i++){                          //This for loop is to create a new div element for each recipe returned
                                                                                        // For example: numberOfRecipes == 10, 10 new divs are created
                        var createSideTabDiv = document.createElement("div");           //
                        createSideTabDiv.className = "sideTabStyle";                    //These lines are assigning new attributres to the newly created divs
                        createSideTabDiv.id = i;
                        createSideTabDiv.innerHTML = searchData.hits[i].recipe.label;
    
                        sideTabContainerReference.appendChild(createSideTabDiv);    //The newly created divs are adding can child elements to sideTabContainer
    
                        }   
    
                        document.getElementById("ingredientName").innerHTML = inputReference.value + " " + "recipes"; //Displays the user input in a title element

                        var sideTabReference = document.getElementsByClassName("sideTabStyle");     //This gets an list of elements with the className sideTabStyle
                        var servingsText = document.getElementById("mainTextServings");             //All of these variable are references to HTML elements
                        var caloriesText = document.getElementById("mainTextCalories");
                        var sourceText = document.getElementById("mainTextSource");
                        

                        $(sideTabReference).click(function (event){     //If any of the side tabs are clicked, execute the following

                            selectRecipeText.style.display = "none";    
                            servingsText.innerHTML = "";
                            caloriesText.innerHTML = "";
                            sourceText.innerHTML = "";
                            recipeInstructions.innerHTML = "";


                            recipeImg.style.display = "flex";               //All of these elements are set to display and with the flex property
                            recipeImgHolder.style.display = "flex";
                            recipeTitleHolder.style.display = "flex";
                            recipeIngredientsHolder.style.display = "flex";
                            recipeWeight.style.display = "flex";
                            recipeInstructions.style.display = "flex";

                            $('#servingsCaloriesSource').addClass("flex");  //Add a class to #servingsCaloriesSource to enchance the element formatting

                            var sideTabIdReference = this.id;                                                     //This gets the ID of the clicked side tab element
                            var ingredientString = searchData.hits[sideTabIdReference].recipe.ingredientLines;    //The following three lines are taking the API output,
                            var newIngredientString = ingredientString.toString();                                //convert that output to a string
                            var formattedingredientString = newIngredientString.split(",").join("<br />");        //and finally breaks up the string at each comma into a new line

                            
                            servingsText.innerHTML = "Servings:" + " " + " " + searchData.hits[sideTabIdReference].recipe.yield;                //These remaining lines are simply taking a selected API output and displaying 
                            caloriesText.innerHTML = "Calories:" + " " + " " + Math.round(searchData.hits[sideTabIdReference].recipe.calories); //them to the correct elements and correctly formats them for readibililty
                            sourceText.innerHTML = "Source:" + " " + " " + searchData.hits[sideTabIdReference].recipe.source;
                            var imgURL = searchData.hits[sideTabIdReference].recipe.image;
                            recipeImg.style.background = 'url(' + imgURL + ')no-repeat center';
                            recipeImg.style.backgroundSize = 'contain';
                            recipeTitleHolder.innerHTML = searchData.hits[sideTabIdReference].recipe.label;
                            recipeIngredientsHolder.innerHTML ="Ingredients:" + " " + formattedingredientString;
                            recipeWeight.innerHTML = "Weight:" + " " + Math.round(searchData.hits[sideTabIdReference].recipe.totalWeight) + " " + "grams";
                            $("#recipeInstructions").append('<a href="' + searchData.hits[sideTabIdReference].recipe.url + '">' + "URL:" + " " + searchData.hits[sideTabIdReference].recipe.url + '</a>');

                        });

                    }
                }
    
            });
        }   

}




