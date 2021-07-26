
<?php

// This is the standard database connection used over a number
// of my assessments


$uri  = "mysql:dbname=getthatrecipe;host:localhost";    //Database url
$user = "root"; //Database user for access
$pass = ""; //Database password for access

$conn = new PDO($uri, $user, $pass);    //Creates a PDO instance to act as the database connection
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);     //Adds error reporting and exception throiwing to the $conn instance

try //Attempts the database connection
{
    $conn = new PDO("mysql:host=localhost;dbname=getthatrecipe", $user, $pass);
}
catch(PDOException $e)  //Catches Errors to be displayed
{
    $error_message = $e->getMessage();
    echo $e;
    exit();
}
