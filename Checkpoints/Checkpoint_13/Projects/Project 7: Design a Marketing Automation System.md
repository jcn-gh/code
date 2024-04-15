# Project 7: Design a Marketing Automation System

In this project we’re going to build out a marketing automation system. At a high level this system is going to allow an organization to track and communicate with potential leads throughout the sales lifecycle.

## Use Case Diagram Requirements

Usually, we use our Use Case diagrams to outline what roles each actor has, but in this one, I want to stretch it out build a diagram that would serve as a starting point if we wanted to get straight into the coding.

Actors:

    - Marketing Specialist
    - Lead / Customer
    - System

Use cases:

    - Marketing Specialist
        - View Reports
        - Manage Contacts
        - Manage Forms
        - Send Communication (email, SMS, HipChat, Slack)
    - Lead/Customer
        - Submit Form
        - Notify Marketing Specialist (automatic)
    - System
        - Send Reminders
        - Send Special Offers
        - Send Communication (feeds in)

A key component of this system is that only the marketing specialist will be interacting with the system itself. The leads won’t interact with the system at all, they will only receive various forms of communication.

Now, this is one of the more complex parts because we have concepts like “Send Communication”, which can mean many different things. It could be an email, an SMS, or something else, so we’ll define that.

### Use Case Diagram Development

1. Identify Actors: Clearly define the actors involved in the system. You have three main actors: Marketing Specialist, Lead/Customer, and System. Each actor interacts with the system differently, so their roles should be distinctly represented in the diagram.
1. Define Use Cases for Each Actor:
    - For the Marketing Specialist, include use cases like View Reports, Manage Contacts, Manage Forms, and Send Communication. These represent the actions that the marketing specialist can perform within the system.
    - For the Lead/Customer, include use cases like Submit Form and Notify Marketing Specialist (automatic). This indicates that the lead/customer’s interaction is mainly through form submission, and the system automatically notifies the marketing specialist upon such actions.
    - For the System, include use cases like Send Reminders, Send Special Offers, and Send Communication (feeds in). These are automated processes handled by the system to engage with the leads/customers.
1. Illustrate Relationships:
    - Show how the Marketing Specialist directly interacts with the system to manage contacts, forms, and communications. This can be represented by direct lines connecting the Marketing Specialist actor to their respective use cases.
    - Indicate that the Lead/Customer indirectly affects the system through actions like form submission, which then triggers the system to notify the marketing specialist. This can be represented by a line connecting the Lead/Customer to the Submit Form use case, and another line showing the automatic notification as a result of this action.
    - Highlight the system’s autonomous actions like sending reminders and special offers, which do not require direct input from the marketing specialist but are crucial for engaging leads/customers.
1. Complex Use Cases: For complex use cases like Send Communication, consider breaking it down into sub-use cases to specify the different types of communication (email, SMS, HipChat, Slack). This can be represented using include or extend relationships in the diagram to show that Send Communication can include sending an email, SMS, etc.
1. Use Correct Notation: Ensure you use the correct UML notation for actors (stick figures), use cases (ovals), and relationships (lines). Include directional arrows where necessary to indicate the flow or trigger of actions, especially for automated processes like notifications.
1. Review and Refine: After drafting the initial diagram, review it to ensure it accurately captures all interactions and relationships. It might be helpful to get feedback from stakeholders or peers to refine the diagram further.

## Activity Diagram Requirements

In this diagram, we’ll model the entire journey process.

Marketing journey flow (8-12 activities)

    - Start point: User filling out a form
    - End point: User purchasing

Example activities:

    - Welcome Email
    - Delay 1 week
    - Marketer Notification

Example decisions:

    - User purchased product?
    - Was email opened?

Research:

    - Fork nodes
    - Join nodes

We’re going to place decisions throughout this system because it’s very dynamic. It needs to be able to change state and redirect users based on feedback. We wouldn’t want to hardcode the flow.

Imagine there’s a customer that signed up on day one. You don’t want to send them marketing messages a week later asking them to sign up. Another example decision might be checking to see if a user purchased a product, or if an email was opened, which shows if they’re interested or not.

Also, spend some time researching fork and join nodes. We haven’t discussed either of them so far, so figure out how they could be incorporated into this diagram.

### Activity Diagram Development

1. Identify the Start and End Points: Begin with identifying the start point as “User filling out a form” and the end point as “User purchasing”. These will anchor your diagram and provide a clear path of progression.
1. Map Out Key Activities: Include the example activities mentioned, such as “Welcome Email”, “Delay 1 week”, and “Marketer Notification”. These activities represent steps in the marketing journey and should be connected in a logical sequence from the start to the end point.
1. Incorporate Decision Points: Integrate decision nodes like “User purchased product?” and “Was email opened?”. These decisions will branch the flow based on conditions being met or not. For instance, if an email was not opened, you might redirect to another activity like sending a follow-up email.
1. Utilize Fork and Join Nodes: Research and apply fork nodes to represent points where the process might split into parallel paths. For example, after sending a welcome email, you might simultaneously start a delay and prepare the next communication. Join nodes will be used to converge these parallel paths back into a single flow.
1. Dynamic Flow Considerations: Remember, the system is dynamic and should adapt based on user feedback. Incorporate elements that allow for redirection or looping back to previous steps based on the outcomes of decision points. This ensures the marketing journey is responsive to user engagement.
1. Detailing Activities: For each activity, consider what specific actions are taken. For example, “Welcome Email” should detail the process of selecting the email template, personalizing the message, and sending it to the user.
1. Feedback Loops: Include feedback loops for continuous improvement. For instance, if a user doesn’t open any emails after several attempts, the system might flag this for review by a marketer.
1. Use Correct Notation: Ensure you use the correct UML notation for activities (rounded rectangles), decisions (diamonds), start/end points (circles), and parallel processes (bars for fork and join nodes).
1. Review and Refine: After drafting the initial diagram, review it to ensure it accurately captures the marketing journey. Adjust the flow as necessary to ensure it’s logical and meets the project’s goals.

#### Activity Diagram Bifurcations

- Was email opened? This decision point leads to different actions based on whether the email sent to a user was opened or not. If yes, the next step might be to send a follow-up message; if no, another reminder might be sent.
- User purchased product? This decision determines the end of the marketing journey. If the user purchased the product, the journey might end with a purchase confirmation; if not, the journey might continue with further marketing efforts.

## Package Diagram Requirements

Journey system (5-6 packages)

    - Journeys
    - Insights/Reports
    - Channels and App drivers (Slack, HipChat, SMS, etc.)

### Package Diagram Development

1. Identify Core Packages: Start by identifying the core packages mentioned: Journeys, Insights/Reports, and Channels and App drivers. These will form the primary components of your system.
1. Define Package Responsibilities:
    - Journeys: This package should encapsulate all functionalities related to managing the lifecycle of a customer journey, from initiation to completion. It could include classes or sub-packages for journey creation, management, and tracking.
    - Insights/Reports: Focus on functionalities for generating insights and reports about the marketing activities. This could involve analytics, performance metrics, and data visualization components.
    - Channels and App drivers: This package should include sub-packages or classes for each communication channel (e.g., Slack, HipChat, SMS). It’s responsible for managing the integration and communication through these channels.
1. Consider Additional Packages: Depending on the system’s complexity, you might need additional packages such as User Management for handling user profiles and permissions, Data Storage for database interactions, and APIs for external integrations.
1. Define Inter-package Relationships: Determine how these packages will interact with each other. For example, the Journeys package might rely on Channels and App drivers for sending communications and Insights/Reports for analyzing journey effectiveness.
1. Use Standard UML Notation: Ensure you use the correct UML notation for packages (a tabbed folder icon) and include dependencies (dashed arrows) where necessary to illustrate the relationships between packages.
1. Modularity and Scalability: Design your packages to be modular and scalable. Each package should have a clear responsibility, and it should be easy to add new functionalities or channels without major changes to the existing structure.
1. Documentation: For each package, provide a brief description of its responsibilities and contents. This documentation will be invaluable for new developers and for future maintenance.
1. Review and Refinement: After drafting the initial diagram, review it to ensure it accurately captures the system’s architecture and meets the project’s goals. Adjust as necessary for clarity and completeness.

## Deployment Diagram Requirements

For this, we want to focus on how the APIs are going to be connected, because there are a lot of moving pieces in this system.

    - Load balancer
    - Multiple application servers
    - Database cluster
    - Email server
    - SMS Connector
    - SMS Provider
    - External CRM

We’re modeling a system that plugs into tools like Salesforce and then lets you follow a lead as they’re taken through the marketing journey. You’ll have the ability to track what that data flow looks like with this diagram and see where the servers are positioned.

You’ll need nodes to connect the system to various outside services, such as Salesforce or the SMS service. Feel free to get creative with how you organize these because this is a very complex system. You’re going to have servers all over the place, advanced systems like load balancers, and even services you don’t even own, which is a very common practice in modern development projects.

### Deployment Diagram Development

1. Identify Components and Nodes: Start by identifying all the components mentioned, such as the load balancer, application servers, database cluster, email server, SMS Connector, SMS Provider, and External CRM. Each of these will be represented as nodes in your diagram.
1. Determine Relationships: Understand how these components interact with each other. For instance, application servers might be behind the load balancer to distribute incoming traffic. The application servers then connect to the database cluster for data storage and retrieval.
1. External Integrations: Highlight connections to external services like Salesforce (External CRM) and SMS services. These connections are crucial for the system’s functionality, allowing it to send communications and manage customer data.
1. Load Balancer Setup: Represent the load balancer at the front of your deployment diagram. It acts as the entry point for all incoming traffic, directing requests to one of the multiple application servers based on load balancing algorithms.
1. Application Servers Cluster: Show multiple application servers as part of a scalable setup. These servers handle the business logic of your system and can be scaled horizontally to manage increased load.
1. Database Cluster: Illustrate the database cluster, which provides high availability and redundancy for your system’s data. This is critical for maintaining performance and data integrity.
1. Email and SMS Services: Detail the email server and SMS Connector/Provider setup. These are essential for the system’s communication capabilities, enabling it to send emails and SMS messages to leads and customers.
1. External CRM Integration: Depict the connection to an external CRM system, such as Salesforce. This integration is vital for managing customer relationships and tracking the marketing journey.
1. Use Correct UML Notation: Ensure you use the correct UML notation for deployment diagrams. This includes nodes represented as cubes and artifacts as rectangles. Use solid lines to show association or communication paths between nodes.
1. Annotations and Descriptions: Add annotations or descriptions to clarify the purpose of each component and the nature of their interactions. This is especially important for complex systems with many moving parts.
1. Review and Refine: After drafting the initial diagram, review it to ensure it accurately captures the system’s deployment architecture. Adjust as necessary to improve clarity and completeness.

## State Machine Diagram

    - Visitor
    - Prospect
    - Lead
    - Opportunity
    - Closed (Won)
    - Disqualified Prospect
    - Unsuccessful Lead
    - Lost Opportunity

We have to keep track of what type of user we’re dealing with because that helps us decide what actions we’re going to perform.

For example, a potential customer will start as a “Visitor”. They can then become a “Prospect”, “Lead”, and “Opportunity”. Ideally, from that state, they will be marked as “Closed (Won)”, which means that they actually became a customer, but there are other possibilities. We also have to take into account whether they are even qualified to be a prospect. If a 12-year-old signed up for devCamp we wouldn’t be able to enroll them as a student, so that would immediately disqualify them. Maybe they tell a marketing specialist that they’re just not interested, which makes them an “Unsuccessful Lead”. Lastly, we have a “Lost Opportunity”, which is a situation where someone went all the way through, but at the very end, they decided they did not want to sign up.

Being able to capture each one of these states is vital because the state is going to determine how we’re treating that customer at any point in time.

### State Machine Diagram Development

1. Define States Clearly: Start by defining each state mentioned: Visitor, Prospect, Lead, Opportunity, Closed (Won), Disqualified Prospect, Unsuccessful Lead, and Lost Opportunity. These states represent the various stages a potential customer can be in during their interaction with the marketing system.
1. Identify State Transitions: Determine what events or actions cause transitions between these states. For example, a Visitor becomes a Prospect when they express interest by signing up for more information. A Lead might become an Opportunity after a successful follow-up call.
1. Incorporate Decision Points: Include decision points that influence the path from one state to another. For instance, the transition from Prospect to Lead might depend on qualifying criteria, such as age or expressed interest level.
1. Handle Exceptions: Account for transitions that represent exceptions or special cases, such as moving directly from Prospect to Disqualified Prospect if the individual does not meet certain criteria.
1. Define Final States: Recognize Closed (Won), Disqualified Prospect, Unsuccessful Lead, and Lost Opportunity as final states where no further transitions occur within the scope of this marketing system.
1. Use Correct Notation: Employ the standard UML notation for state machine diagrams. This includes circles for states, arrows for transitions, and diamonds for decision points.
1. Annotate Transitions: Clearly label the transitions with the action or event that causes the change from one state to another. This provides clarity on what triggers each transition.
1. Consider Feedback Loops: For states like Lead or Opportunity, consider if and how a subject might loop back to a previous state based on new information or actions taken. For example, an Opportunity might revert to a Lead if negotiations stall.
1. External Influences: Note any external influences that might cause a state change, such as a marketing specialist’s assessment or automated system notifications.
1. Review and Refine: After drafting the initial diagram, review it for logical consistency and completeness. Ensure that all possible states and transitions are accounted for and accurately represented.

#### State Machine Diagram Bifurcations

- Visitor to Prospect: A visitor becomes a prospect when they sign up for more information. This transition is a bifurcation from a general visitor state to a more engaged prospect state.
- Prospect to Disqualified Prospect: If a prospect does not meet certain criteria (e.g., age requirement), they are moved to the Disqualified Prospect state, representing a bifurcation based on qualification criteria.
- Opportunity to Closed (Won) or Lost Opportunity: An opportunity can bifurcate into either becoming a Closed (Won), indicating a successful sale, or a Lost Opportunity, indicating that the potential sale was not completed.

## Class Diagram Requirements

The focus here is going to be on inheritance.

    - User
         - MarketingRep
    - Report
    - Form
    - Journey
    - Reminder
    - Message
        - Email
        - SMS
        - ExternalChannel
    - Customer

Focus on how we can create a generic class, and how we can leverage subclasses to get more specific.

The Message class in particular can help us understand how to model inheritance because “Message” is something that’s generic. No one’s actually going to use a message. They’re going to use one of the more specialized Message types, such as email, SMS, and external channels.

A simple way to tell if you’re using inheritance right is if you would describe one class as a type of another class. For example, an email is a type of message, or marketing rep is a type of user.

Finally, remember that a customer is not a user. They do not interact with the system, so we need to keep track of them in a different way.

### Class Diagram Development

1. Identify the Base Classes and Their Relationships: Start by identifying the base classes as mentioned (User, Report, Form, Journey, Reminder, Message, and Customer). Note that Message is a base class for Email, SMS, and ExternalChannel, indicating an inheritance relationship. Similarly,    MarketingRep is a subclass of User.
1. Define Attributes for Each Class: Determine what attributes each class should have. For example:
   - User might have attributes like userID, name, emailAddress.
   - Customer could have customerID, name, contactInfo.
   - Message might include messageID, content, timestamp.
1. Define Methods for Each Class: Identify the behaviors or actions associated with each class. For instance:
   - User could have methods like login(), logout().
   - Message might have sendMessage(), scheduleMessage().
   - Journey could include methods like startJourney(), trackProgress().
1. Implement Inheritance Where Applicable: For the inheritance relationships, ensure that subclasses extend the functionality of their base classes without repeating code. For example, Email, SMS, and ExternalChannel should inherit from Message and add or override methods specific to their type of communication.
1. Association and Aggregation: Determine how classes are associated. For instance, a MarketingRep might manage multiple Journeys or Customers. This could be represented by a one-to-many relationship.
1. Visibility and Access Modifiers: Decide on the visibility of each class member (attributes and methods). Use access modifiers like public, private, or protected to encapsulate the class’s internal state.
1. Customer Interaction: Since Customer does not interact with the system directly, consider how information about customers is managed and updated within the system. This might involve interactions between Customer and classes like Journey or Message.
1. Specialized Behaviors: For classes like Email, SMS, and ExternalChannel, define the specialized behaviors that differentiate them from the generic Message class. This could include specific methods for formatting or sending messages through different channels.
1. Diagram Notation: Use UML notation to represent the classes, their relationships (inheritance, association), and members (attributes, methods). Ensure that inheritance is clearly shown with arrows pointing from the subclass to the superclass.
1. Review and Refinement: After the initial draft, review the diagram to ensure it accurately represents the system’s requirements and make adjustments as necessary. Consider feedback from stakeholders or other developers to refine the diagram.
1. Documentation: Include documentation of the class diagram in the code repository. Explain the purpose and key design decisions to help other developers understand and extend the system.

For methods, remember the following:

- Methods that modify sensitive data should be private to the class unless they need to be overridden in a subclass, in which case they can be protected.
- Accessor methods (getters and setters) can be public if external classes need to read the data, but setters should be carefully considered to avoid unauthorized data manipulation.

To improve the relationships between classes, consider the following enhancements:

1. Explicit Association Details:
    - Specify the nature of associations more clearly. For instance, between MarketingRep and Journey, indicate whether it’s a one-to-many or many-to-many relationship. This can be done using multiplicity markers (e.g., 1..* for one-to-many).
1. Aggregation vs. Composition:
    - Determine if relationships should be aggregations (a weaker relationship where the lifecycle of the contained objects does not depend on the container) or compositions (a stronger relationship where the lifecycle of the contained objects depends on the container). For example, a MarketingRep might have a composition relationship with Journey if the journeys are exclusively managed by a single rep.
1. Interface Implementation:
    - If there are common methods across different classes that imply a shared behavior, consider defining an interface. For example, if both ReportService and FormService have methods that process data, they could implement a common interface like IDataProcessor.
1. Dependency Indications:
    - Clearly indicate dependencies between classes. For instance, ReportViewer might depend on ReportService to fetch reports. This can be depicted with a dashed arrow.
1. Inheritance Hierarchy:
    - Review the inheritance structure for potential generalization opportunities. For example, if there are other types of users besides MarketingRep, you might introduce an intermediate class like Employee that sits between User and MarketingRep.
1. Role Interfaces:
    - Use role interfaces to define the roles that classes can play. This is particularly useful in systems with complex behaviors and interactions. For instance, any class that can send messages might implement a MessageSender interface.
1. Refactor for Reusability:
    - Look for opportunities to refactor common functionality into base classes or utility classes. This reduces duplication and enhances maintainability. For example, if multiple classes use a similar method to validate input data, consider pulling that method into a utility class.
1. Use of Association Classes:
    - If an association itself has attributes or operations, use an association class. For example, the relationship between MarketingRep and Customer might involve attributes like assignedDate or methods like assignRep(), which can be encapsulated in an association class.

### Key Classes and Relationships

1. Class: User
    - Attributes:
        - userID: Private.
        - name: Protected or private
        - emailAddress: Protected or private

2. Class: AuthenticationService
    - Methods:
        - authenticate(user: User, credentials: Credentials)

3. Class: MarketingRep (Subclass of User)
    - Inherits attributes from User
    - Relationships:
        - Can manage multiple Journeys
        - Can manage multiple Customers

4. Class: ReportService
    - Methods:
        - generateReport(reportData) -> Report

5. Class: Report
    - Attributes:
        - reportID
        - title
        - generatedDate

6. Class: ReportViewer
    - Methods:
        - viewReport(reportData)

7. Class: Form
    - Attributes:
        - formID
        - fields
        - creationDate
        - formStatus

8. Class: FormService
    - Methods:
        - submitForm(form) -> bool
        - validateForm(form) -> bool

9. Class: Journey
    - Attributes:
        - journeyID
        - startDate
        - endDate
    - Methods:
        - startJourney()
        - trackProgress()

10. Class: Reminder
    - Attributes:
        - reminderID
        - message
        - dueDate
    - Methods:
        - setReminder()
        - dismissReminder()

11. Class: Message
    - Attributes:
        - messageID: Private
        - content: Protected
        - timestamp: Private
    - Relationships:
        - Parent class to Email, SMS, ExternalChannel
    - Methods:
        - sendMessage(recipient)
        - scheduleMessage(recipient)

12. Class: Email (Subclass of Message)
    - Inherits attributes and methods from Message
    - Specialized Behaviors:
        - formatEmail()

13. Class: SMS (Subclass of Message)
    - Inherits attributes and methods from Message
    - Specialized Behaviors:
        - formatSMS()

14. Class: ExternalChannel (Subclass of Message)
    - Inherits attributes and methods from Message
    - Specialized Behaviors:
        - configureChannel()

15. Class: Customer
    - Attributes:
        - customerID: Private
        - name: Protected
        - contactInfo: Protected
        - purchaseHistory: Private

16. Class: PurchaseService
    - Methods:
        - purchase(customer, product)
            - Updates the customer’s purchase history for the specified product

17. MarketingRep and User: MarketingRep is a subclass of User, indicating an inheritance relationship. This means MarketingRep inherits all attributes and methods from User but can also have additional attributes and methods specific to its role.

18. MarketingRep, Journeys, and Customers: MarketingRep has relationships with Journeys and Customers. These are examples of association relationships, where a MarketingRep can manage multiple Journeys and multiple Customers. This is likely a one-to-many relationship, as one marketing representative can be responsible for multiple journeys and customers.

19. Message, Email, SMS, and ExternalChannel: Message serves as a base class for Email, SMS, and ExternalChannel, which are subclasses of Message. This is an inheritance relationship, where each subclass inherits properties and methods from Message but also defines additional behaviors specific to the communication method (e.g., formatting an email or configuring an external channel).
