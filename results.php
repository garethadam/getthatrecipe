<?php


//This page acts as the backend for the API Call itself

    session_start();

	if(isset($_POST['searchInputValue'])){	//If the value of the search input is posted
	
		$inputValue = $_POST['searchInputValue']; //Assigns the search input value to a variable
	}

	require('./model/dbConnect.php');	//Required to connect to the database
	require('./model/database_functions.php'); //Required to call the function for retriving the API keys

	$callResult = pullkeys(); //Gets the result from database function
	$clientID = $callResult[0]; //Assigns first key to varible to be used in the url
	$clientKey = $callResult[1]; //Assigns second key to varible to be used in the url
	$searchInput = $_GET["inputValue"]; //Gets the session variable value and assigns the input value to variable to be used in the url
	
	$searchURL = "https://api.edamam.com/search?q=$searchInput&app_id=$clientID&app_key=$clientKey"; //This variable is constructed from the previous variables
																								     // to ensure continuous use of the web app

	$ch = curl_init(); //initizes curl method for PHP

	curl_setopt($ch, CURLOPT_URL, $searchURL); //Sets the url to be called
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //Return the value of the URL as a string instead of a direct output

	header('Content-Type: application/json'); //This is used so that all browsers know that the type of data that is returned is in json format
											  // Currently, Google Chrome is the only browser can interprete header data by default
	
	$result = curl_exec($ch); //result of the curl url
	
	if (curl_errno($ch)) { //If there is an error it is displayed in json format (easier for reading)
		echo json_encode([
			"Error" => curl_error($ch),
		]);
	}
	curl_close ($ch); //Close the curl operation

	$dataAsObject = json_decode($result, true); //Decodes the result of the curl so the data can be rebuilt in PHP

	$finalData = json_encode([					//This object is the reconstructed result of the curl method
		"count" => $dataAsObject["count"],		//This way it is better practice to return the values you want
		"from" => $dataAsObject["from"],		//rather than remove the values you don't want, to put anti-corruption in place
		"hits" => $dataAsObject["hits"],
		"more" => $dataAsObject["more"],
		"q" => $dataAsObject["q"],
		"to" => $dataAsObject["to"],

	]);

	echo $finalData;	//Show the reconstructed data set

	
	
	

	


	
	
