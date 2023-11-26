<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,700">
    <link rel="stylesheet" href="app.css" type="text/css">
    <title>Online Shopping</title>
</head>
<body>
    <div class="loaderCont" style="visibility: hidden;">
        <div class="loader"></div>
        <h1 class="loderHeadr">Making the orders....</h1>
    </div>
    <div id="toastCard">
        <h4><span class="Toastii"></span> have been Succesifully 
            been Added to Cart. <span class="congrats">Congratulations!</span></h4>
        </div>
    <!-- Navbar here -->
    <header class="mainHeader">
        <nav class="mainNavBar">
            <div class="mainLogo">
                <img src="images/logo4.jpg" alt="company's main logo">
            </div>
            <!-- <div class="searchInput">
                <input type="search" placeholder="Search Products...">
            </div> -->
            <div class="links">
                <div class="accounts">
                    <!-- we shall consider this server staff -->
                    <div class="user">
                        <i class="fa fa-user-circle-o"></i>
                       
                        <?php
                        if (isset($_SESSION["user_id"])) {
                            echo '<p>' . $_SESSION["username"] . '</p>';
                        }
                        ?>
                        
                        <div class="accountDropdown">
                            <a href="help.html"><button class="helpBtn">Help</button></a>
                            <a href="logout.php"><button class="logOutBtn">LogOut</button></a>
                        </div>
                    </div>
                    <!-- <button class="logOutBtn">account</button> -->
                    <div class="cart" onclick={openCart()}>
                        <span class="cartIcon">
                            <!-- <img src="/images/icon1.jpeg"> -->
                            <i class="fa fa-shopping-cart"></i>
                        </span>
                        <span class="badge">0</span>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <!-- cart div -->
    <div id="layer" class="cartOverLay">
        <div class="closeBtn" onclick={openCart()}>
            <h1>X</h1>
        </div>
        <div class="clearCart">
            <button class="clearBtn">Clear Cart</button>
        </div>
        <div class="cartCard">
            <div class="sectionItems">
                <div class="heading">
                    <h1>Your Cart</h1>
                </div>
                <div class="allPickedItems">
                    <!-- <div class="pickedItem"> -->
                        <!-- are rendered dynamically -->
                    <!-- </div> -->
                </div>
            </div>
            <div class="cartSummary">
                <div class="heading">
                    <h1>Summary</h1>
                </div>
                <div class="totalItems">
                    <h2>Total Items: <span class="totalByCount"></span></h2>
                    <h4>Total Cash: <span class="totalByCash"></span></h4>
                </div>
                <div class="customerDetails">
                    <div class="customer">
                        <h3>Customer Details</h3>
                    </div>
                    <ul class="customersLists">
                        <?php
                        
                        if (isset($_SESSION["user_id"])) {
                            // User is logged in, display their details
                            echo '<li><h5><span class="username">Name:</span> ' . $_SESSION["username"] . '</h5></li>';
                            // You can fetch and display other details like email if needed
                            echo '<li ><h5><span class="username">Email:</span> ' . $_SESSION["email"] . '</h5></li>';
                            echo '<li><label>Location:</label>';
                            echo '<input class="locationCustomer" type="text" placeholder="enter your location" required></li>';
                        }
                        ?>
                    </ul>
                </div>
                <div class="orderBtn">
                    <button onclick={submitOrder()}>CheckOut</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Main page content here -->
    <main class="mainPager">
        <!-- carousel here -->
        <section class="carouselSection">
            <div class="caru">
            </div>
        </section>
        <!-- Links pages -->
        <div class="pagesProducts">
            <header class="storeHeader" id="header2">
                <div class="onStore">
                    <button>On store</button>
                </div>
                <nav class="storeList">
                    <!-- rendered dynamically -->
                </nav>
            </header>
        </div>
        <!-- Main products here -->
        <section class="store">
            <!-- rendered dynamically -->
                <div class="myProducts" ></div>
                <div class="myProducts" ></div>
                <div class="myProducts" ></div>
                <div class="myProducts" ></div>
                <div class="myProducts" ></div>
                <div class="myProducts" ></div>
        </section>
    </main>
    <script src='main.js'></script>
</body>
</html>