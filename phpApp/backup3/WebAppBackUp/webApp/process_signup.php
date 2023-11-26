<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Connect to the database
    $servername = "localhost";
    $username = "root"; // Replace with your database username 
    $password_db = ""; // Replace with your database password
    $database = "webapp"; // Replace with your database name

    $conn = new mysqli($servername, $username, $password_db, $database);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Check if email already exists
    $check_email_sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($check_email_sql);

    if ($result->num_rows > 0) {
        // Email already exists, redirect to exists.html
        header("Location: exists.html");
        exit();
    }

    // Email doesn't exist, proceed with the registration
    $insert_sql = "INSERT INTO users (username, email, password) VALUES ('$name', '$email', '$hashed_password')";

    if ($conn->query($insert_sql) === TRUE) {
        $_SESSION["username"] = $name;
        $_SESSION["email"] = $email;
        header("Location: app.php"); // Redirect to dashboard or another authenticated page
        exit();
    } else {
        echo "Error: " . $insert_sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>



