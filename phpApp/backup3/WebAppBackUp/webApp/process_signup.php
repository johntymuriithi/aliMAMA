<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    echo $hashed_password;
    // Connect to the database
    $servername = "localhost";
    $username = "root"; // Replace with your database username 
    $password_db = "mwangijohn.1"; // Replace with your database password
    $database = "webapp"; // Replace with your database name

    $conn = new mysqli($servername, $username, $password_db, $database);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Insert data into the database with hashed password
    $sql = "INSERT INTO users (username, email, password) VALUES ('$name', '$email', '$hashed_password')";

    

    if ($conn->query($sql) === TRUE) {
        $subject = "Welcome to Your Website";
    $message = "Dear $name,\n\nThank you for registering on Your Website!";
    $headers = "muriithijohn634@gmail.com";  // Change this to your email

    // Use the mail() function to send the email
    mail($email, $subject, $message, $headers);

    echo "Registration successful. An email has been sent to $email.";
        header("Location: app.php"); // Redirect to dashboard or another authenticated page
            exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>


