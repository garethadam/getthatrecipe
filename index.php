
<!DOCTYPE HTML>
<html lang="en">

<head>
    <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1">
    <title>Get That Recipe</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="shortcut icon" type="image/png" href="img/foodIcon.png"/>
    <script src="js/jquery-3.3.1.min.js"></script>
</head>


<body>

	

	<div id="mainContainer">

		<div id="loadingAnimation"></div>

		<div id="topNavBarContainer">

			<div id="topNavOptionsContainer">

				<div id="iconContainer"></div>
				<div id="titleContainer">Get That Recipe</div>

				<div id="searchInputContainer">
					<form id="searchInputItems">
						<input id="searchInput" type="text" placeholder="Search main ingredient" name="searchInput">
						<button id="searchConfirm" type="button" onclick="runApiCall()"></button>
					</form>
				</div>

				<div id="searchExample">Search format: "Chicken"</div>

			</div>

		</div>


		<div id="defaultLandingDisplay">

			<div id="defaultLandingTextHolder">
				<div id="defaultLandingText">Get That Recipe <br><br> <div>Simply enter the main ingredient you would like to use</div></div>
			</div>

		</div>

		<div id="contentContainer">

			<div id="ingredientHeadingContainer">

				<div id="ingredientHeadingLayout">

					<div id="ingredientHeadingTextAreas">

						<div id="ingredientName"></div>

							<div id="servingsCaloriesSource">

								<div class="mainIconsStyling">
									<div class="mainIconHolder" id="mainIconServings"></div>
									<div class="mainIconSideText" id="mainTextServings">Servings:</div>
								</div>

								<div class="mainIconsStyling">
									<div class="mainIconHolder" id="mainIconCalories"></div>
									<div class="mainIconSideText" id="mainTextCalories">Calories:</div>
								</div>

								<div class="mainIconsStyling">
									<div class="mainIconHolder" id="mainIconSource"></div>
									<div class="mainIconSideText" id="mainTextSource">Source:</div>
								</div>

							</div>

					</div>

				</div>

			</div>

				<div id="recipeContainer">

					<div id="sideTabContainer">
						
					</div>

					<div id="recipeDisplayContainer">

						<div id="recipeLayoutHolder">
							
							<div id="instructionText">Select which recipe you would like</div>

							<div id="recipeImgHolder">
								<div id="recipeImg"></div>
							</div>

							<div id="recipeTitleHolder"></div>

							<div id="recipeIngredientsHolder"></div>

							<div id="recipeWeight"></div>

							<div id="recipeInstructions"></div>

						</div>

					</div>

				</div>

		</div>

	</div>

</body>

<script src="js/script.js"></script>    

</html>
