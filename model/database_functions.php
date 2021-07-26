<?php

//This function is to pull the API keys from the database


function pullKeys(){
    
    global $conn;
    $sql = "SELECT keyValue FROM maintable";
    $statememt = $conn->prepare($sql);
    $statememt->execute();
    $result = $statememt->fetchAll(PDO::FETCH_COLUMN);
    return $result;
}




