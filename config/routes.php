<?php
// Routes

// $app->group('/', function () use ($app) {
	
// 	$app->get("", 		"Module\Controllers\HomeController:home");


// });

$app->group('/discount', function () use ($app) {
	$app->post("/add", 	"Module\Controllers\DiscountController:addDiscountOnProduct");
	$app->get("/find/{product_id}", 	"Module\Controllers\DiscountController:getDiscountsOnProductById");
	$app->delete("/remove", 	"Module\Controllers\DiscountController:deleteDiscount");
	
});


$app->group('/productType', function () use ($app) {
	$app->post("/add", 	"Module\Controllers\ProductTypeController:addProductType");
	$app->get("/all", 	"Module\Controllers\ProductTypeController:getAllProdutType");
	$app->delete("/remove/{id}", 	"Module\Controllers\ProductTypeController:deleteProductType");
	
});


$app->group('/get', function () use ($app) {
	$app->post("/currencies", 	"Module\Controllers\CurrencyController:scrapeCurrency");
	$app->get("/all/currency", 	"Module\Controllers\CurrencyController:getCurrencyList");
});


$app->group('/user', function () use ($app) {
	
	$app->get("/user_type", 	"Module\Controllers\UserController:user_type");
	$app->get("/encrypt_password/{data}", 	"Module\Controllers\UserController:encrypt_password");
	$app->get("/decrypt_password/{data}", 	"Module\Controllers\UserController:decrypt_password");

	$app->post("/register", 	"Module\Controllers\UserController:registerUser");
	$app->get("/get/{id}", 	"Module\Controllers\UserController:findUserById");

});//->add(new \Module\Middlewares\Auth());

$app->group('/login', function () use ($app) {
	$app->post("", 	"Module\Controllers\LoginController:userLogIn");
});


$app->group('/logout', function () use ($app) {
	$app->get("", 	"Module\Controllers\LoginController:userLogOut");
})->add(new \Module\Middlewares\Auth());

////STUDENTS
$app->group('/student', function () use ($app) {
	$app->post("/add", 	"Module\Controllers\StudentController:addStudent");
	$app->GET("/view",  "Module\Controllers\StudentController:getAllStudent");
	$app->get("/view_by_id/{student_id}",  "Module\Controllers\StudentController:getStudentById");
	$app->post("/view_using_data_table",  "Module\Controllers\StudentController:view_using_data_table");
});


/* CUSTOMERS */
$app->group('/customer', function () use ($app) {
	$app->post("/add", 	         "Module\Controllers\CustomerController:addCustomer");
	$app->post("/view",          "Module\Controllers\CustomerController:viewCustomer");
	$app->delete("/delete/{id}", "Module\Controllers\CustomerController:deleteCustomer");
	$app->get("/view/{id}",      "Module\Controllers\CustomerController:getCustomerById");
	$app->post("/update",        "Module\Controllers\CustomerController:updateCustomer");
});

/* PRODUCT */
$app->group('/product', function () use ($app) {
	$app->post("/add", 	           "Module\Controllers\ProductController:addProduct");
	$app->post("/view",            "Module\Controllers\ProductController:viewProduct");
	$app->delete("/delete/{id}",   "Module\Controllers\ProductController:deleteProduct");
	$app->get("/view/{id}",  	   "Module\Controllers\ProductController:getProductById");
	$app->post("/update",  	       "Module\Controllers\ProductController:updateProduct");
	$app->get("/product_details",  "Module\Controllers\ProductController:productDetails");
	$app->get("/list",             "Module\Controllers\ProductController:productList");
});

/* SUPPLIER */
$app->group('/supplier', function () use ($app) {
	$app->post("/add", 	         "Module\Controllers\SupplierController:addSupplier");
	$app->post("/view",          "Module\Controllers\SupplierController:viewSupplier");
	$app->delete("/delete/{id}", "Module\Controllers\SupplierController:deleteSupplier");
	$app->get("/view/{id}",      "Module\Controllers\SupplierController:getSupplierById");
	$app->post("/update",        "Module\Controllers\SupplierController:updateSupplier");
});

/* SALES */
$app->group('/sales', function () use ($app) {
	$app->post("/create_transaction", "Module\Controllers\SalesController:createTransaction");
});

/* DASHBOARD */
$app->group('/dashboard', function () use ($app) {
	$app->get("/details", "Module\Controllers\DashboardController:dashboardDetails");
});


