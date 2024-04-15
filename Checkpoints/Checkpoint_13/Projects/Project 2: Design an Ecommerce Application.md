# Project Two: Design an Ecommerce Application

Build an online coffee ordering system.

## Class diagram

### Classes

- User
  - Attributes:
    - username: string
    - email: string
    - hashedPassword: string
    - salt: string
    - address: Address
    - paymentMethods: ListPayment
  - Methods:
    - addPaymentMethod(paymentMethod: Payment): void - Adds a new payment method.
    - removePaymentMethod(paymentMethod: Payment): void - Removes a payment method.
    - updateAddress(address: Address): void - Updates the user’s address.
    - placeOrder(order: Order): OrderStatus - Places a new order and returns the status.
    - validateEmail(email: string): boolean - Validates the email address format.
    - validateAddress(address: Address): boolean - Validates the user’s address format.
    - validatePaymentMethod(paymentMethod: Payment): boolean - Validates the payment method before adding it.
- Address
  - Attributes:
    - street: string
    - city: City
    - zipCode: string
    - country: Country
  - Methods: used as a data structure.
- City
  - Attributes:
    - name: string
  - Methods: used for addressing.
- Country
  - Attributes:
    - name: string
  - Methods: used for addressing.
- Cart
  - Attributes:
    - items: ListCartItem
    - discounts: ListDiscount
  - Methods:
    - addItem(item: CartItem): void - Adds an item to the cart.
    - removeItem(itemId: string): void - Removes an item from the cart.
    - updateQuantity(itemId: string, quantity: int): void - Updates the quantity of an item.
    - checkOut(): Order - Initiates the checkout process and creates an order.
    - calculateDiscount(): double - Calculates the total discount.
- CartItem
  - Attributes:
    - inventoryItem: InventoryItem
    - quantity: int
  - Methods: doesn’t have as it represents a relationship.
- Inventory
  - Attributes:
    - items: ListInventoryItem
  - Methods:
    - addItem(item: InventoryItem): void - Adds a new item to the inventory.
    - removeItem(itemId: string): void - Removes an item from the inventory.
    - checkInventory(itemId: string): boolean - Checks the availability of an item in the inventory.
    - getInventoryItem(itemId: string): InventoryItem - Retrieves a specific inventory item.
    - updateItemQuantity(itemId: string, quantity: int): void - Updates the quantity of an item in the inventory.
- InventoryItem
  - Attributes:
    - name: string
    - price: double
    - options: ListInventoryOption
- InventoryOption
  - Attributes:
    - name: string
    - priceModifier: double
  - Methods: None, as it’s used to modify the price of an InventoryItem.
- Taxonomy
  - Attributes:
    - name: string
    - items: ListInventoryItem
  - Methods:
    - addItem(item: InventoryItem): void - Associates an inventory item with this taxonomy.
- Relationship between inventory and taxonomy
  - Attributes:
    - inventory: Inventory
    - taxonomy: Taxonomy
- Payment
  - Attributes:
    - amount: double
    - status: PaymentStatus
  - Methods:
    - processPayment(): PaymentStatus - Processes the payment and returns the status.
    - refundPayment(): PaymentStatus - Handles payment refunds and returns the status.
- CreditCard
  - Attributes:
    - tokenizedCardNumber: string
    - expirationDate: string
  - Methods:
    - validateCardDetails(tokenizedCardNumber: string, expirationDate: string): boolean - Validates the card details before processing payment.
  - Subclass of Payment
- PayPal
  - Attributes:
    - email: string
  - Subclass of Payment
- PaymentStatus
  - Attributes:
    - PENDING
    - COMPLETED
    - FAILED
- Order
  - Attributes:
    - user: User
    - items: ListOrderItem
    - totalAmount: double
    - status: OrderStatus
    - paymentMethod: Payment
  - Methods:
    - addItem(item: OrderItem): void - Adds an item to the order.
    - calculateTotal(): double - Calculates the total amount of the order.
    - updateStatus(status: OrderStatus): void - Updates the order status.
    - calculateTax(amount: double): double - Calculates the tax amount based on the user’s location.
    - addPaymentMethod(paymentMethod: Payment): void - Associates a payment method with the order.
- OrderStatus
  - Attributes:
    - PENDING
    - CONFIRMED
    - SHIPPED
    - DELIVERED
- OrderItem
  - Attributes:
    - inventoryItem: InventoryItem
    - quantity: int

#### Relationships

1. User
   - Has a 1:N relationship with Address (a user can have multiple addresses).
   - Has a 1:N relationship with Payment (a user can have multiple payment methods).
   - Has a 1:1 relationship with Cart (a user can have one active cart at a time).
2. Address
   - Has a 1:1 relationship with City and Country (an address contains one city and one country).
3. City and Country
   - These are standalone classes used within Address. They don’t have direct relationships with other classes but are essential for the addressing system.
4. Cart
   - Has a 1:N relationship with CartItem (a cart can contain multiple items).
   - Has a 1:N relationship with User (a user can have multiple carts).
5. CartItem
   - Has a 1:1 relationship with InventoryItem (each cart item is linked to one inventory item).
6. Inventory
   - Has a 1:N relationship with InventoryItem (inventory contains multiple items).
7. InventoryItem
   - Has a 1:N relationship with InventoryOption (an inventory item can have multiple options).
   - Is part of a 1:N relationship with Taxonomy (an inventory item can belong to multiple taxonomies).
   - Has a 1:N relationship with OrderItem (each inventory item can be included in multiple order items).
   - Has a 1:N relationship with InventoryOption (an inventory item can have multiple options).
8. InventoryOption
   - Is associated with InventoryItem to modify its price. It doesn’t have direct relationships with other classes.
9. Taxonomy
   - Has a 1:N relationship with InventoryItem (a taxonomy can categorize multiple inventory items).
10. Payment
    - Is used within Order to process payments. It has a 1:1 relationship with PaymentStatus.
    - Has a 1:N relationship with Order (a payment can be associated with multiple orders).
11. CreditCard and PayPal
    - These could be considered as specializations of Payment (not explicitly mentioned but implied by their attributes). They provide specific details for processing payments.
12. Order
    - Has a 1:N relationship with OrderItem (an order contains multiple items).
    - Has a 1:1 relationship with User (an order is placed by one user).
    - Has a 1:1 relationship with OrderStatus to track the order’s progress.
    - Has a 1:N relationship with Payment (an order can have multiple payments in case of split payments).
13. OrderItem
    - Has a 1:1 relationship with InventoryItem (an order item is linked to one inventory item).
    - Has a 1:1 relationship with Order (an order item is part of one order).

## Activity diagram

We need to cover a full flow from when the user gets to the application, all the way to when they’ve purchased a product.

Activities

- Search
- View based on categories
- Viewing Products
- Customizing products (update qty, style, etc)
- Add to cart
- User registration
- View cart
- Update cart
- Checkout
- Payment

Make sure to include validation points throughout the process. For example, what happens if their credit card comes up and is declined?

1. Search: This activity involves the user searching for products within the application. It likely includes a search interface and functionality to retrieve relevant products based on the user’s query.
2. View based on categories: This activity involves the user browsing products based on predefined categories. It may include navigation through different categories and subcategories to explore available products.
3. Viewing Products: Once the user has found a product of interest, they can view its details, including images, descriptions, pricing, and other relevant information.
4. Customizing products (update qty, style, etc): This activity allows the user to customize the selected product, such as updating the quantity, selecting different styles or variations, and other customization options.
5. Add to cart: After customizing the product, the user can add it to their shopping cart for future purchase.
6. User registration: If the user is not already registered, they may need to complete the registration process, providing necessary information to create an account.
7. View cart: The user can view the contents of their shopping cart, including all the products they have added for purchase.
8. Update cart: This activity allows the user to update the contents of their cart, such as modifying quantities, removing items, or applying discounts.
9. Checkout: Once the user is ready to proceed with the purchase, they initiate the checkout process to review their order and proceed to payment.
10. Payment: The final activity involves the user making a payment using a chosen payment method, such as credit card, PayPal, or other available options.

graph TD;
    Search --> View based on categories;
    View based on categories --> Viewing Products;
    Viewing Products --> Customizing products (update qty, style, etc);
    Customizing products (update qty, style, etc) --> Add to cart;
    Add to cart --> User registration;
    User registration --> View cart;
    View cart --> Update cart;
    Update cart --> Checkout;
    Checkout --> Payment;

In this activity diagram, the activities are represented as rectangles with the name of the activity. The arrows indicate the flow of the activities, with the direction of the arrow indicating the order in which the activities occur. The arrow between “Search” and “View based on categories” indicates that the user must perform the search activity before they can view the products based on categories. The arrow between “View based on categories” and “Viewing Products” indicates that the user must first view the products based on categories before they can customize the products. The arrow between “Viewing Products” and “Customizing products (update qty, style, etc)” indicates that the user must first view the product details before they can update the quantity, style, or other customization options. The arrow between “Customizing products (update qty, style, etc)” and “Add to cart” indicates that the user must first customize the product before they can add it to the cart. The arrow between “Add to cart” and “User registration” indicates that the user must register or sign in before they can add items to their cart. The arrow between “User registration” and “View cart” indicates that the user must first register or sign in before they can view their cart. The arrow between “View cart” and “Update cart” indicates that the user can update the contents of their cart, such as modifying quantities, removing items, or applying discounts. The arrow between “Update cart” and “Checkout” indicates that the user must first update the contents of their cart before they can proceed to checkout. The arrow between “Checkout” and “Payment” indicates that the user must complete the payment process before they can complete their purchase.

The activity diagram describes a series of activities that occur in order for a customer to complete a purchase in an eCommerce application. The sequence starts with the user accessing the application, then they view products based on categories. If they choose to customize their product (e.g., update quantity or style), they can do so and add it to their cart. Before checking out, they must register if they’re a new customer and update their shopping cart. They proceed to checkout and enter their payment information; however, if the charge is declined, validation points are included in the flow to handle this situation.

Here is a summary of each activity and what it entails:

Search: The user searches for products by entering keywords or selecting categories.
View based on categories: The user browses the product catalog based on categories.
Viewing Products: The user views products based on their search query or category selection.
Customizing products (update qty, style, etc): The user can select a product and modify its quantity, style, or other attributes.
Add to cart: The user adds the selected product to their shopping cart.
User registration: If they’re new customers, they must register before adding products to their cart.
View cart: After adding items, users can review their cart and update its contents.
Update cart: Users can modify their cart by updating the quantity of their selections or removing them entirely.
Checkout: Users proceed to the checkout process after selecting products they wish to purchase.
Payment: The user submits payment information during the checkout process, which may fail if their credit card is declined.

To fill the activity diagram based on the provided activities and include validation points, follow these steps:

Search: The user starts by searching for products. This involves entering keywords or phrases into a search bar. The system then retrieves and displays relevant products.
View based on categories: After or instead of searching, the user can browse products by selecting specific categories. This step involves displaying categories and subcategories for the user to choose from, leading them to a filtered list of products.
Viewing Products: Once the user has identified a product of interest through search or category browsing, they can view detailed information about the product. This includes descriptions, images, prices, and available customizations.
Customizing products (update qty, style, etc): In this step, the user can customize the selected product according to their preferences, such as changing the quantity, selecting different styles, sizes, or other available options.
Add to cart: After customizing the product, the user adds it to their shopping cart. This involves updating the cart’s contents to include the new item along with any specified customizations.
User registration: If the user is not already registered or logged in, they are prompted to do so at this point. This involves entering personal information, such as name, email, and password, to create a new account or logging in with existing credentials.
View cart: The user can view the contents of their shopping cart, which includes all added items, quantities, and the total price. They can review their selections before proceeding to checkout.
Update cart: Before proceeding to checkout, the user has the option to update their cart. This can include changing the quantity of items, removing items, or applying discount codes.
Checkout: The checkout process begins once the cart is finalized. This involves entering shipping information, selecting a payment method, and reviewing the order summary.
Payment: The user enters their payment details, such as credit card information or PayPal account details. The system then processes the payment.
Validation Point: If the payment is declined (e.g., due to incorrect card details or insufficient funds), the system notifies the user of the issue. The user is then prompted to enter alternative payment information or to correct any errors.