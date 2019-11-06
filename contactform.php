
<?php
$nameErr = $emailErr = $genderErr = $websiteErr = "";
$name = $email = $gender = $message = $website = "";

 if (isset($_POST['submit'])) {

 	if (empty($_POST["name"])) {
    $nameErr = "Votre nom est requis";
  } else {
    $name = test_input($_POST["name"]);
    // check if name only contains letters and whitespace
    if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
      $nameErr = "Seulement des lettres et des espaces SVP"; 
    }
  }
  
  if (empty($_POST["email"])) {
    $emailErr = "Un courriel est requis";
  } else {
    $email = test_input($_POST["email"]);
    // check if e-mail address is well-formed
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $emailErr = "Courriel invalide"; 
    }
  }
    
  if (empty($_POST["website"])) {
    $website = "";
  } else {
    $website = test_input($_POST["website"]);
    // check if URL address syntax is valid (this regular expression also allows dashes in the URL)
    if (!preg_match("/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i",$website)) {
      $websiteErr = "Lien invalide"; 
    }
  }
  if (empty($_POST["phone"])) {
    $phone = "";
  } else {
    $phone = test_input($_POST["phone"]);
  }

  if (empty($_POST["message"])) {
    $message = "";
  } else {
    $message = test_input($_POST["message"]);
  }





$mailTo ="info@distributiongdl.com";
$headers = "From: ".$email;
$txt = "Vous avez reçu un courriel de: ".$name.".\n\n".$message.".\n\n".$phone.".\n\n".$website;
$message = "Merci, nous vous contacterons très bientôt! - Distribution GDL";

 mail($mailTo, $subject, $txt, $headers);

 echo "<script type='text/javascript'>alert('$message');</script>";


 }

 function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

?>