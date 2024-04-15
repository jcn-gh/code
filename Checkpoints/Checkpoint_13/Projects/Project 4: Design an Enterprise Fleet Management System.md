# Project 4: Design an Enterprise Fleet Management System - Part 1

A fleet management system allows a company to manage its fleet of vehicles, as well as many other types of things. In fact, this fleet management system started out with a project that just the fleet manager was using. Once the CEO saw it, he liked it so much he started using it for the entire company to manage their assets and to work with maintenance.

They want a way of being able to maintain and keep track of all of their vehicles. There’s not a lot of detail.

I want you to model in this is the entire process of maintenance. This should include between 8 to 12 activities.

## Activity Diagram Requirements

    - Maintenance activities (8-12 activities)
    - Start point: Maintenance Inquiry
    - Endpoint: Maintenance Complete

Example action items:

    - Technical diagnosis
    - Assign service member
    - Order parts

Make sure that you have decision points, guards, and the other elements that are required inside of an activity diagram so that it can have dynamic behavior. Use your creativity, and think about the different requirements for the situation.

The fleet manager didn’t give me a list of requirements. He said that he wanted to keep track of his vehicles, service records, maintenance logs, parts orders, and so on.

We’ll move to a package diagram next, but avoid defining any classes.

With a package diagram, I can model out all of the main modules that the system’s going to need, and then I can model the different operations associated with each of them.

## Package Diagram Requirements

Fleet management modules, operations + dependencies

Modules:

    - Personnel
    - Vehicles
    - Parts
    - Maintenance
    - Partners

Think about how these modules might operate inside of a system that is designed to manage a fleet of vehicles. Then, think about how these modules might relate to each other. Last, include some operations specific to each module. It’s still too early to be very detailed, so keep your approach high-level.

For the vehicle module, for example, you might include some type of buy/sell operation to be able to manage how you’re acquiring these vehicles. That was important when I built out the original fleet management system. They needed to know when a vehicle was purchased and how much it was purchased for because that dictated how much money they were willing to spend on maintenance.

I want you to research what an enterprise system is comprised of. There are some complex components.

## Deployment Diagram Requirements

    - Load balancer
    - Application servers
    - Database clusters
    - Caching

So, find out what a load balancer does! You don’t have to go build one yet, just figure out what it does at a high level.

## Class Diagram Requirements

    - Vehicle
    - CarModel
    - CarBrand
    - ProductionFacility
    - Dealer
    - Technician
    - Role
    - Maintenance
    - MaintenanceType
    - ServiceCenter
    - Service
    - ServiceList
    - MaintenancePart
    - Part
    - Vendor
    - Assembly

From a technical perspective, a few of these classes could be combined into one. But in more complex enterprise applications it becomes incredibly important for your database to be as efficient as possible. A great way to do that is to make sure that classes do not contain information that they do not need.

You can choose whether to use inheritance for this diagram or to simply specify that there are multiple models; one is more generic and another is more specialized.

As always, make sure that you put in all of the right types of associations, attributes, and operations that you think you would use. Finally, be sure to list which items are public, private, and protected.

## Key

To effectively fill out the four diagrams as outlined in the project description, here are the key elements you should consider for each:

1. Activity Diagram for Maintenance Process
    - Start Point: Maintenance Inquiry  
    - Activities:
        - Receive maintenance request
        - Technical diagnosis
        - Assign service member
        - Check parts availability  
        - Order parts (if necessary)
        - Schedule maintenance
        - Perform maintenance
        - Quality check
        - Update maintenance log
        - Notify completion
    - Decision Points:  
        - Are parts available?  
        - Is maintenance successful?
    - End Point: Maintenance Complete
    - Guards: Conditions for decisions, e.g., “Parts Available:     Yes/No”
2. Package Diagram for Fleet Management System
    - Modules and Operations:
        - Personnel: Add/Remove personnel, Assign roles
        - Vehicles: Register vehicle, Update status, Buy/Sell operations
        - Parts: Order parts, Update inventory
        - Maintenance: Schedule maintenance, Update maintenance log
        - Partners: Manage partner details, Integrate partner services
    - Dependencies:
        - Maintenance depends on Vehicles, Parts, and Personnel modules.
        - Parts ordering might depend on Partners for external suppliers.
3. Deployment Diagram for System Infrastructure
    - Components:
        - Load Balancer*: Distributes incoming application traffic across multiple servers.
        - Application Servers: Hosts the application logic, multiple instances for scalability.
        - Database Clusters: Ensures data is stored in a redundant manner for reliability.
        - Caching: Reduces load on databases by storing frequently accessed data in memory.
    - Connections: Show how traffic flows from the Load Balancer to Application Servers, and how servers interact with Database Clusters and Caching.
4. Class Diagram for System Architecture
    - Classes and Relationships:
        - Vehicle: Base class, related to CarModel, CarBrand.
        - CarModel, CarBrand: Provide specific details for vehicles.
        - ProductionFacility, Dealer: Where vehicles are made and sold.
        - Technician, Role: Define the personnel involved in maintenance.
        - Maintenance, MaintenanceType: Details about maintenance activities.
        - ServiceCenter, Service, ServiceList: Where and how services are provided.
        - MaintenancePart, Part, Vendor: Parts used in maintenance and their suppliers.
        - Assembly: How parts are assembled into vehicles.
    - Attributes and Operations: Define specific properties (e.g., vehicle ID, model name) and behaviors (e.g., schedule service, update inventory) for each class.
    - Visibility: Mark attributes and operations as public, private, or protected based on their accessibility.

For each diagram, ensure clarity by maintaining a logical flow, using appropriate symbols, and labeling elements clearly. This foundational work will greatly assist in the development and understanding of the enterprise fleet management system.

*In the context of a fleet management system, a “load balancer” is a network device or software function that distributes incoming application traffic across multiple application servers. This ensures that no single server becomes overwhelmed with requests, which can improve the overall responsiveness and reliability of the system. For a fleet management system, this could be crucial during peak operational times or when processing large amounts of data, such as vehicle tracking information, maintenance requests, and updates to vehicle status. By efficiently managing the traffic, a load balancer helps in maintaining optimal performance and availability of the system’s services.
