<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get user input
    $username = $_POST["email"];
    $password = $_POST["password"];

    // Connect to the database
    $servername = "localhost";
    $db_username = "root";
    $db_password = "";
    $database = "webapp";

    $conn = new mysqli($servername, $db_username, $db_password, $database);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Validate user credentials
    $sql = "SELECT * FROM users WHERE email = '$username'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // User found, check the password
        $user = $result->fetch_assoc();
        $hashed_password = $user["password"];

        if (password_verify($password, $hashed_password)) {
            // Password is correct, store user data in session
            $_SESSION["user_id"] = $user["user_id"];
            $_SESSION["username"] = $user["username"];
            $_SESSION["email"] = $user["email"];

            header("Location: app.php"); // Redirect to dashboard or another authenticated page
            exit();
        } else {
            // Invalid password, show an error message
            header("Location: wrong.html");
            echo "Invalid password";
        }
    } else {
        // User not found, show an error message
        echo "User not found";
    }

    $conn->close();
}
?>

