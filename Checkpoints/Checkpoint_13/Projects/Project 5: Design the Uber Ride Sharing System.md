# Project 5: Design the Uber Ride Sharing System

Uber is a massive enterprise with servers all over the world. There are probably more applications than we even know about. With this project we’re going to pick and choose some of the more visible services that Uber provides and model those systems.

## Activity Diagram

### Activity Diagram Requirements

- Car ordering service process (8-12 activities)

Example Activities:

- Setting a destination
- Taking a car
- Sharing trip details
- Promotions and Discounts

Example branching logic:

- Is the trip possible?
- Share payment with others?

Branching logic is a component that allows the system to make decisions. For example, you may check to see if a trip is possible. If it is, then you’re going to send the user in one direction. If not, then you’ll direct them to a different activity.

Uber’s mobile application is the only package that I want you to be concerned about.

### Key Activity diagram

- Activity diagram requirements:
  - Model the car ordering service process with 8-12 activities
  - Example activities: setting a destination, taking a car, sharing trip details…
  - Implement branching logic for decision-making
  - Example branching logic: Is the trip possible? Share payment with others?

### Activity diagram Development

1. User Opens App: The first activity is the user opening the Uber app on their smartphone.
   - If it’s the user’s first time opening the app, direct them to a tutorial or introduction of the app.
   - If the user is already familiar with the app, proceed to the next step.
   - Example: User opens the app for the first time and is directed to a tutorial on how to use the app.
2. User Authentication and Registration: If the user doesn’t have an account yet or needs to authenticate, direct them to the user authentication and registration process. This step combines the user registration and authentication steps into one.
   - Example: User enters their email and password to create an account or log in to an existing account.
3. Setting a Destination: Once authenticated, the user sets a destination by entering an address or selecting a location on the map.
   - Entering an Address: The user enters the destination address.
   - Selecting a Location on the Map: The user selects the destination location on the map.
   - Example: User enters “123 Main Street” as the destination.
4. Selecting Ride Type: The user selects the type of ride they want (e.g., UberX, UberPool, etc.).
   - Example: User selects “UberX” as the ride type.
5. Branching Logic: Is the Trip Possible?
   - If yes, proceed to the next step (Estimate Arrival and Cost).
   - If no, display a message explaining why (e.g., no drivers available, destination out of service area) and offer alternatives or the option to try again later.
   - Example: Trip is possible because there are available drivers in the area.
6. Estimate Arrival and Cost: The system calculates and displays the estimated cost and arrival time of the ride to the user.
   - Example: Estimated cost is $10 and arrival time is 5 minutes.
7. Request Ride: The user confirms the ride request.
8. Finding a Driver: The system searches for an available driver near the user’s location.
9. Driver Accepts: A driver accepts the ride request. The user is notified of the driver’s details and the vehicle’s ETA.
10. Taking a Car: The driver arrives, and the user begins the trip.
11. Sharing Trip Details: The user has the option to share their trip details with friends or family for safety.
12. User Notifications: The system sends notifications to the user during the ride process to provide updates and important information.
13. Arriving at Destination: The trip ends when the user arrives at the destination.
14. Payment Process: The user pays for the ride. This can branch into:
    - Single Payment: The user pays the full amount.
    - Shared Payment: The user opts to share the payment with others. Further branching logic can handle how the payment is split.
    - Failed Payment: If the payment fails, the system can offer the user the option to retry the payment or use alternative payment methods.
    - Payment Confirmation: The system displays a confirmation message to the user indicating that the payment has been successful.
15. Rate Ride: The user is prompted to rate the ride and optionally leave feedback for the driver.
16. Ride History: The user can view details of their past rides.
17. End of Process: The user exits the app or starts a new ride request.
18. Error Handling: Add a step for error handling to cover scenarios where unexpected errors occur during the process, such as network issues or app crashes.
19. User Feedback: Add a step for user feedback to allow the user to provide feedback or report issues during any stage of the process.
20. Ride Tracking: Add a step for ride tracking to allow the user to track the progress of their ride in real-time.
21. Ride Rescheduling: The user can reschedule the ride by changing the ride time or destination.
22. Ride Cancellation: The user or driver can cancel the ride.
23. Driver Rating: The user can rate the driver after the ride.
24. User Logout: The user can securely end their session.
25. Driver Logout: The driver can securely end their session.
26. User Preferences: The user can set their preferences such as favorite destinations, preferred payment method, etc.
27. Driver Verification: Add a step for ‘Driver Verification’ to ensure that the driver’s identity and credentials are verified before they can accept ride requests.
28. Customer Support: Consider adding a ‘Customer Support’ step to handle functionalities related to customer support and dispute resolution.
29. Lost and Found: Add a ‘Lost and Found’ step to manage lost items during a trip.
30. Promotions and Discounts: Include a step for ‘Promotions and Discounts’ to manage promotional codes and discounts offered to users.
31. Driver Preferences: Add a ‘Driver Preferences’ step to allow drivers to set their preferences such as preferred driving hours, preferred areas, etc.
32. Driver Training: Include a ‘Driver Training’ step to ensure that drivers are properly trained and understand the app’s functionalities before they can accept ride requests.
33. Ride History for Driver: Add a ‘Ride History for Driver’ step to allow drivers to view details of their past rides.
34. Driver Feedback: Include a ‘Driver Feedback’ step to allow drivers to provide feedback or report issues during any stage of the process.
35. Implement rate limiting on the API to prevent abuse and ensure fair usage.

## Package Diagram

### Package Diagram Requirements

Mobile app modules and dependencies

Main modules:

- User
- Trip
- Driver

Submodules:

- Authentication
- Booking
- Payment
- Notifications
- Ride History
- Security
- Promotions and Discounts
- Ratings and Reviews
- Driver Reviews
- Customer Support
- Ride Tracking
- User Feedback
- Ride Fare Calculation
- Driver Verification
- User Preferences
- Driver Performance

Nested modules:

- Single payment
- Shared payment

### Key Package Diagram

- Package diagram requirements:
  - Model the main modules: User, Trip, Driver
  - Model submodules: Authentication, Booking, Payment, Notifications, Ride History, Security, Promotions and Discounts, Ratings and Reviews, Driver Reviews, Customer Support, Ride Tracking, User Feedback, Ride Fare Calculation, Driver Verification, User Preferences, Driver Performance
  - Model nested modules: Single payment, Shared payment
  - Define dependencies between modules

### Package Diagram Development

1. Identify Main Modules: Start by identifying the main modules which are User, Trip, and Driver. These are the core functionalities around which the Uber mobile app is built.
2. Model Submodules:
   - Under the User module, include submodules like Authentication which handles login and registration processes, Ride History to keep track of past rides and transactions, Security to handle user data privacy and security concerns, Promotions and Discounts to manage promotional codes and discounts, Ratings and Reviews to handle driver ratings and reviews functionalities, Customer Support to handle functionalities related to customer support and dispute resolution, Ride Tracking to handle real-time tracking of the ride, User Feedback to handle user feedback about the app, rides, drivers, etc., and User Preferences to handle user preferences like favorite destinations, preferred payment method, etc.
   - For the Trip module, include submodules such as Booking which encompasses the process of setting a destination, selecting ride type, estimating cost, and requesting a ride; Payment which manages how the user pays for the ride; Notifications which handles sending notifications to the user about ride status, payment confirmation, etc., Ride Scheduling to handle functionalities related to scheduling rides in advance, Lost and Found to manage lost items during a trip, Ride Tracking to handle real-time tracking of the ride, and Ride Fare Calculation to handle the calculation of ride fare based on various factors like distance, time, surge pricing, etc.
   - For the Driver module, include submodules like Driver Availability, Driver Earnings, etc., which handle functionalities related to drivers, Driver Reviews to handle functionalities related to driver reviews, Driver Status to handle driver’s online/offline status and availability for accepting rides, Driver Verification to handle the process of verifying the driver’s identity and credentials, and Driver Performance to track and analyze the performance of drivers based on various metrics like ride completion rate, customer ratings, etc.
3. Define Nested Modules within Payment:
   - Inside the Payment submodule, further define nested modules like Single Payment and Shared Payment. Single Payment handles transactions where the user pays the full amount themselves, while Shared Payment involves splitting the payment among multiple users.
4. Establish Dependencies:
   - The Authentication module is a prerequisite for the Booking and Payment modules since a user needs to be authenticated to book a ride or make a payment.
   - The Booking submodule depends on the User module for user details and preferences, and it interacts with the Trip module to manage trip details.
   - The Payment submodule is dependent on the completion of a trip within the Trip module, as payment is the final step after a ride is completed.
   - Single Payment and Shared Payment are dependent on the Payment module but are independent of each other, catering to different payment scenarios.
5. Visual Representation:
   - Draw the main modules (User, Trip, and Driver) as large containers.
   - Inside each main module, draw the submodules (Authentication, Ride History, Security, Promotions and Discounts, Ratings and Reviews, Customer Support, Ride Tracking, User Feedback, User Preferences for User; Booking, Payment, Notifications, Ride Scheduling, Lost and Found, Ride Tracking, Ride Fare Calculation for Trip; Driver Availability, Driver Earnings, Driver Reviews, Driver Status, Driver Verification, Driver Performance, etc. for Driver).
   - Within the Payment submodule, further draw the nested modules (Single Payment and Shared Payment), showcasing their relationship to the parent module.
   - Use arrows to indicate dependencies between modules. For example, an arrow from Authentication to Booking and Payment to show that these processes require authentication.

## Use Case Diagram

### Use Case Diagram Requirements

Mobile app modules and dependencies

Actors:

- Passenger
- Driver
- Admin
- Customer Support
- System

Use cases:

- Search for Trip Details: Allows the passenger to search for details about a specific trip, such as the pickup location, destination, and estimated arrival time.
- Request Ride: Enables the passenger to request a ride from the available drivers.
- Cancel Ride: Allows the passenger to cancel a ride request before it is accepted by a driver.
- Book Ride: Facilitates the process of booking a ride, including selecting the ride type, specifying the pickup and drop-off locations, and confirming the booking.
- Share Trip Details: Provides the option for the passenger to share trip details, such as the driver’s information and estimated arrival time, with friends or family.
- Rate Ride: Allows the passenger to rate the completed ride and provide feedback on the driver’s performance.
- Update Payment information: Enables the passenger to update their payment information, such as adding a new credit card or changing the default payment method.
- Leave Tip: Provides the option for the passenger to leave a tip for the driver as an appreciation for their service.
- View Ride History: Allows the passenger to view their past ride history, including details such as pickup and drop-off locations, fare, and driver information.
- View Driver Profile: Enables the passenger to view the profile of a specific driver, including their ratings, reviews, and other relevant information.
- View Passenger Profile: Allows the passenger to view their own profile, including personal information, payment methods, and ride history.
- Driver Availability: Allows drivers to set their availability for accepting ride requests.
- Promotions and Discounts: Allows passengers to apply promotional codes or discounts to their rides.
- Lost and Found: Allows passengers and drivers to report and track lost items.
- Ride Scheduling: Allows passengers to schedule rides in advance.
- Admin Dashboard: Allows admins to monitor and manage the overall system.
- Driver Earnings: Allows drivers to view their earnings and ride statistics.
- Driver Reviews: Allows passengers to read reviews about a driver before booking a ride.
- Report Issue: Allows passengers and drivers to report any issues or problems they encounter during the ride.
- Driver Rejects Ride: Handles scenarios where a driver might not be able to accept a ride request.
- Driver Cancels Ride: Handles scenarios where a driver might need to cancel an accepted ride.
- Passenger Cancels Ride Mid-Trip: Handles scenarios where a passenger might need to cancel the ride after it has already started.
- Admin Suspends Driver or Passenger: Handles scenarios where an admin might need to suspend a user due to violation of terms.
- Customer Support Resolves Disputes: Handles scenarios where customer support might need to intervene in disputes between drivers and passengers.

### Key Case Diagram

- Use case diagram requirements:
  - Identify actors: Passenger, Driver, Admin, Customer Support, System
  - Define use cases: Search for Trip Details, Request Ride, Cancel Ride, Book Ride, Share Trip Details, Rate Ride, Update Payment information, Leave Tip, View Ride History, View Driver Profile, View Passenger Profile, Driver Availability, Promotions and Discounts, Lost and Found, Ride Scheduling, Admin Dashboard, Driver Earnings, Driver Reviews, Report Issue, Driver Rejects Ride, Driver Cancels Ride, Passenger Cancels Ride Mid-Trip, Admin Suspends Driver or Passenger, Customer Support Resolves Disputes
  - Establish relationships between actors and use cases

### Use Case Diagram Development

1. Identify Actors:
   - Passenger
   - Driver
   - Admin
   - Customer Support
   - System
2. Define Use Cases: List all the use cases that each actor can perform or interact with. The use cases provided are:
   - Search for Trip Details: Allows the passenger to search for details about a specific trip, such as the pickup location, destination, and estimated arrival time.
   - Request Ride: Enables the passenger to request a ride from the available drivers.
   - Cancel Ride: Allows the passenger to cancel a ride request before it is accepted by a driver.
   - Book Ride: Facilitates the process of booking a ride, including selecting the ride type, specifying the pickup and drop-off locations, and confirming the booking.
   - Share Trip Details: Provides the option for the passenger to share trip details, such as the driver’s information and estimated arrival time, with friends or family.
   - Rate Ride: Allows the passenger to rate the completed ride and provide feedback on the driver’s performance.
   - Update Payment information: Enables the passenger to update their payment information, such as adding a new credit card or changing the default payment method.
   - Leave Tip: Provides the option for the passenger to leave a tip for the driver as an appreciation for their service.
   - View Ride History: Allows the passenger to view their past ride history, including details such as pickup and drop-off locations, fare, and driver information.
   - View Driver Profile: Enables the passenger to view the profile of a specific driver, including their ratings, reviews, and other relevant information.
   - View Passenger Profile: Allows the passenger to view their own profile, including personal information, payment methods, and ride history.
   - Driver Availability: Allows drivers to set their availability for accepting ride requests.
   - Promotions and Discounts: Allows passengers to apply promotional codes or discounts to their rides.
   - Lost and Found: Allows passengers and drivers to report and track lost items.
   - Ride Scheduling: Allows passengers to schedule rides in advance.
   - Admin Dashboard: Allows admins to monitor and manage the overall system.
   - Driver Earnings: Allows drivers to view their earnings and ride statistics.
   - Driver Reviews: Allows passengers to read reviews about a driver before booking a ride.
   - Report Issue: Allows passengers and drivers to report any issues or problems they encounter during the ride.
   - Driver Rejects Ride: Handles scenarios where a driver might not be able to accept a ride request.
   - Driver Cancels Ride: Handles scenarios where a driver might need to cancel an accepted ride.
   - Passenger Cancels Ride Mid-Trip: Handles scenarios where a passenger might need to cancel the ride after it has already started.
   - Admin Suspends Driver or Passenger: Handles scenarios where an admin might need to suspend a user due to violation of terms.
   - Customer Support Resolves Disputes: Handles scenarios where customer support might need to intervene in disputes between drivers and passengers.
3. Establish Relationships: Determine how each actor interacts with the use cases. This involves connecting actors to their respective use cases with lines. For example:
   - Passenger interacts with Search for Trip Details, Request Ride, Cancel Ride, Book Ride, Share Trip Details, Rate Ride, Update Payment Information, Leave Tip, View Ride History, View Driver Profile, View Passenger Profile, Promotions and Discounts, Lost and Found, Ride Scheduling, Driver Reviews, Report Issue, Passenger Cancels Ride Mid-Trip.
   - Driver might interact with Accept Ride Request, Complete Ride, Rate Passenger, Driver Rejects Ride, Driver Cancels Ride.
   - Admin might interact with Manage Drivers, Manage Passengers, Manage Payments, Admin Dashboard, Admin Suspends Driver or Passenger.
   - Customer Support might interact with Handle Support Requests, Resolve Issues, Customer Support Resolves Disputes.
   - System acts as an intermediary for most interactions, such as processing Request Ride, managing Cancel Ride, handling Book Ride, facilitating Share Trip Details, computing Rate Ride, updating Payment Information, processing Leave Tip, Driver Rejects Ride, Driver Cancels Ride, Passenger Cancels Ride Mid-Trip, Admin Suspends Driver or Passenger, Customer Support Resolves Disputes.
4. Include Extend and Include Relationships: Identify any use cases that are optional (extend) or essential (include) parts of other use cases. For example, Update Payment Information might be an extension of Book Ride if the passenger wants to change the payment method at the time of booking.
5. Generalization: If there are actors with similar roles but distinct characteristics, use generalization. For instance, if there are different types of passengers (e.g., VIP Passenger and Regular Passenger), they can be generalized under the Passenger actor.
6. Draw the Diagram: Using a diagramming tool or software, draw the use-case diagram. Place actors on the outside of the diagram and use cases within a system boundary. Connect actors to their respective use cases with lines. Use arrows for directional flows, especially for extend and include relationships.
7. Review and Refine: Review the diagram to ensure all necessary use cases and actors are included and accurately represented. Check for missing relationships or unnecessary complexity and refine as needed.

## Deployment Diagram

### Deployment Diagram Requirements

Android deployment process with dependencies (3-4 nodes)

- API
- Smartphone device
- Android app

The more important thing is what kind of components are needed inside of those nodes. Just as important is to define how the dependencies will work: which components and which nodes truly cannot live by themselves, and which ones need to be able to communicate in order to work properly.

### Key Deployment Diagram

- Deployment Diagram Requirements:
  - Model the Android deployment process with 3-4 nodes
  - Nodes: API, Smartphone device, Android app
  - Define components within nodes
  - Define dependencies and communication between components and nodes

### Deployment Diagram Development

1. Identify Nodes: Start by identifying the primary nodes involved in the deployment of the Uber mobile application. Based on the requirements, the main nodes are:
   - API: Represents the backend services that the mobile app communicates with.
   - Smartphone Device: The physical device on which the Uber app is installed and run.
   - Android App: The Uber application itself, which is deployed on the smartphone device.
2. Define Components Within Nodes:
   - API Node: This should include components such as the Authentication Server, Trip Management System, Payment Service, Database Server, and Load Balancer for a more comprehensive representation.
   - Smartphone Device Node: Components here include the Operating System (e.g., Android OS), GPS for location services, Network Services for internet connectivity, Notification Service, and Location Service for a more detailed representation.
   - Android App Node: Components include the User Interface, Local Database (for caching or storing user preferences), and various modules like Authentication, Booking, Payment, Notification Service, and Location Service as outlined in the package diagram for a more detailed representation.
3. Define Dependencies and Communication:
   - Between Android App and API: The Android App depends on the API for user authentication, trip booking, payment processing, and other services. This dependency is crucial for the app’s functionality.
   - Between Smartphone Device and Android App: The app depends on the device’s hardware and software (e.g., GPS, Network Services) to function correctly. For instance, the app uses the device’s GPS to get the user’s location and network services to communicate with the backend API.
   - Internal Dependencies within the Android App: Highlight how the different modules within the app (e.g., Authentication, Booking, Payment) interact with each other. For example, the Booking module may depend on the Authentication module to ensure the user is logged in before booking a ride.
   - Dependencies between API Node and Database Server: Include dependencies to show data storage and retrieval processes.
4. Visual Representation:
   - Draw the nodes (API, Smartphone Device, Android App) as separate entities.
   - Inside each node, draw the components you’ve identified. For example, within the API node, draw the Authentication Server, Trip Management System, Database Server, Load Balancer, etc.
   - Use color-coding or different shapes to represent different types of components. For example, use a different color for services, databases, and user interfaces.
   - Use arrows to indicate dependencies and communication paths. For example, draw an arrow from the Android App node to the API node to show that the app communicates with the backend services.
5. Review and Refine:
   - Ensure that all necessary components and dependencies are accurately represented.
   - Check for clarity and simplicity. The diagram should be easy to understand at a glance.
   - Validate that the diagram meets the deployment requirements and accurately reflects the deployment architecture of the Uber mobile application.
   - Validate the diagram with stakeholders or subject matter experts to ensure accuracy and completeness.
