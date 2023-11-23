<?php
session_start();

// Assuming the content type is JSON
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_SESSION["user_id"])) {
    $user_id = $_SESSION["user_id"];

    // Read the raw JSON data from the request body
    $json_data = file_get_contents("php://input");

    // Decode the JSON data
    $order_details = json_decode($json_data);

    // Check if decoding was successful
    if ($order_details !== null) {
        $product_name = $order_details->title;
        $amount = $order_details->amount;
        $price = $order_details->price;

        // Connect to your database (use your database credentials)
        $servername = "localhost";
        $username = "root";
        $password = "mwangijohn.1";
        $database = "webapp";

        $conn = new mysqli($servername, $username, $password, $database);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Insert the order into the database
        $sql = "INSERT INTO orders (user_id, product_name, amount, price) VALUES ('$user_id', '$product_name', '$amount', '$price')";

        if ($conn->query($sql) === TRUE) {
            // Send a JSON response for success
            echo json_encode(array("message" => "Order placed successfully"));
        } else {
            // Send a JSON response for error
            echo json_encode(array("error" => "Error: " . $sql . "<br>" . $conn->error));
        }

        $conn->close();
    } else {
        // Send a JSON response for decoding error
        echo json_encode(array("error" => "Error decoding JSON data"));
    }
}
?>
