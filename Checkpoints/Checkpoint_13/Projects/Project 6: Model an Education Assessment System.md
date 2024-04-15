# Project 6: Model an Education Assessment System

An education assessment engine is a system that manages grades for students. It handles quizzes, projects, assignments, and other elements to ensure students are learning the material properly.

## Activity Diagram Requirements

Quiz taking process (6-10 activities)

Roles:

- Teacher
- System
- Student

Example activities:

- Asking a question
- Generating a question set
- Approving results

### Activity Diagram Development

1. Sequential Flow: The diagram should clearly depict the sequence of activities from the start (e.g., “Generating a question set”) to the end (e.g., “Approving results”). Ensure the flow is logical and follows the typical process of quiz taking.
2. Role-Based Actions: Differentiate the actions taken by each role. For instance, the Teacher might be responsible for “Asking a question” and “Approving results,” while the System could handle “Generating a question set,” and the Student’s main activity would be taking the quiz.
3. Decision Points: Include decision nodes where necessary. For example, after a student answers a question, there might be a decision point leading to the next question or ending the quiz if it was the last question.
4. Parallel Activities: If there are any activities that can occur simultaneously (e.g., multiple students taking the quiz at the same time), represent these using parallel bars to indicate concurrent processes.
5. Swimlanes: Utilize swimlanes to organize the activities based on the roles involved. This helps in visually separating the actions of the Teacher, System, and Student, making the diagram easier to understand.
6. Looping: If there’s a repetitive process, such as students answering multiple questions, use a loop marker to indicate this repetition instead of drawing each instance separately.
7. End States: Clearly mark the end state or states (e.g., “Results Approved”) to indicate the completion of the quiz-taking process.
8. Interactions: Highlight interactions between the roles, especially where an activity by one role leads to an action by another. For example, after a Teacher “Asks a question,” the System might “Generate a question set,” which then prompts the Student to start taking the quiz.
9. Timestamps or Timeframes: Include timestamps or timeframes in the activity diagram to indicate the duration of each activity. This will provide a clear understanding of the time taken for each step in the quiz taking process, allowing for better planning and analysis.

## Class Diagram Requirements

- Student
- Klass
- Grade
- Result
- Teacher
- User
- Quiz
- Question
- Essay
- Multiple Choice
- Answer
- Project
- Practice

Be sure to nest your classes properly (e.g. the ‘Teacher’ and ‘Student’ classes are both ‘Users’).

We may have two types of questions, and they both have the ability to have an answer. We don’t want to create two answer classes, so the answer has to have an association to both of those question classes.

There is a specific name for this: polymorphic association*. Research polymorphic association and see how it can be modeled inside of a UML class diagram.

### Class Diagram Development

1. Hierarchical Structure: The Teacher and Student classes should inherit from the User class, indicating a hierarchical relationship where both Teacher and Student are specialized types of User. This structure promotes code reuse and simplifies the management of common attributes and behaviors.
2. Observer Pattern: Implement the Observer pattern to enable real-time updates for the Teacher when a Student completes a Quiz. This pattern allows the Teacher to subscribe to the Quiz completion event and receive notifications whenever a Student completes a Quiz.
3. Polymorphic Association: The Answer class needs to be associated with both the Essay and Multiple Choice question types. This is achieved through polymorphic association, allowing the Answer class to be linked to more than one question type. In UML, this can be represented by creating an association from the Answer class to a generalized Question class, from which Essay and Multiple Choice derive.
4. Class Relationships: The diagram should clearly define the relationships between different classes, such as:
   - Student has a relationship with Klass indicating enrollment.
   - Quiz is composed of multiple Question instances, including Essay and Multiple Choice.
   - Grade and Result are associated with Student and Quiz to represent the outcomes of assessments.
5. Association Multiplicity: Indicate the multiplicity of associations, for example:
   - A Quiz can contain multiple Questions.
   - A Student can be enrolled in multiple Klass instances.
   - A Teacher can create multiple Quizzes.
6. Attributes and Operations: Each class should define relevant attributes and operations. For instance, the Student class might have attributes like studentID and operations like takeQuiz(). The Teacher class might have operations like createQuiz().
7. Aggregation and Composition: Use aggregation and composition to represent the whole-part relationships appropriately. For example, a Quiz is composed of Questions, indicating a strong ownership and lifecycle dependency.
8. Abstract Classes: If there are behaviors or attributes common to all questions but implemented differently by Essay and Multiple Choice, consider making Question an abstract class.
9. Visibility: Indicate the visibility of class members (attributes and methods) using standard UML notation (+ for public, - for private, # for protected).
10. Singleton Pattern: Consider using the Singleton pattern for the `System` class to ensure there is only one instance of the system managing all operations.

***Polymorphic association** is an association that can belong to more than one class. This allows the “Answer” class to belong to both the “MultipleChoice” and “Essay” question classes.

**Polymorphic association** is a database design pattern in which a single column in a table can refer to different types of objects. This is often used in situations where a model can belong to more than one other model on a single association.

For example, in a blog application, you might have a *comments* table that needs to associate with both *posts* and *videos*. Instead of creating separate columns for each association (*post_id*, *video_id*), you can use a polymorphic association where a single column (*commentable_id*) stores the ID of the associated record and another column (*commentable_type*) stores the type of the associated record (*Post*, *Video*, etc.).

This allows for more flexibility in your database design but can also make queries and associations more complex.

## State Machine Diagram Requirements

Question answering state management

- Waiting for answer
- Answer chosen
- Answer confirmed
- Submit status

It defines that a user *must* select an answer and that they aren’t allowed to submit the form until they do so.

### State Machine Diagram Development

1. States Definition: The diagram should clearly define the four states mentioned: “Waiting for answer”, “Answer chosen”, “Answer confirmed”, “Review”, and “Submit status”. Each state represents a distinct phase in the question answering process.
2. Transitions: Identify the events or conditions that trigger transitions between these states. For example, a user selecting an option could transition the state from “Waiting for answer” to “Answer chosen”. Defining these transitions is crucial for understanding how the system reacts to user actions.
3. Initial and Final States: Mark the initial state (“Waiting for answer”) and the final state (“Submit status”) clearly. This helps in understanding the start and end points of the process.
4. Guard Conditions: For transitions that require a specific condition to be met (e.g., an answer must be chosen before it can be confirmed), specify these conditions next to the transition arrows. These are known as guard conditions.
5. Actions: Specify any actions that occur during a transition or within a state. For example, when transitioning to “Submit status”, the system might perform an action to evaluate the answer and record the result.
6. User Interactions: Highlight how user actions impact the state transitions. This includes selecting an answer, confirming an answer, reviewing answers, and submitting the final answer.
7. Error Handling: In the `Error Handling` section, specify the types of errors that can occur and how each type should be handled. Consider how errors or invalid actions (e.g., trying to submit without confirming an answer) are handled within the diagram. This might involve looping back to a previous state or showing an error message. Additionally, include the corresponding error codes or identifiers for easier debugging and tracking. Also, include a mechanism for logging these errors for future analysis and debugging.
8. Feedback Loops: If there are opportunities for the user to revise their answer (e.g., going back from “Answer confirmed” to “Answer chosen”), these should be represented in the diagram.
9. Reset State: Include a new state called “Reset” to allow users to restart the process if needed. This state should be connected to the initial state (“Waiting for answer”) and provide a clear path for users to reset their progress and start over. Consider adding a confirmation step before resetting to prevent accidental resets. Additionally, provide an option for users to undo their last action, allowing them to easily correct any mistakes or changes made during the quiz process. In the `Reset State`, instead of just allowing users to restart the process if needed, also include a mechanism for users to review their progress and make changes if necessary before resetting.
10. Help State: Add a new state called “Help” to provide assistance to users during the quiz process. This state can be triggered when a user requests help or when the system detects that the user is struggling. Specify the transitions and actions associated with the “Help” state to guide users and provide relevant information or resources. Additionally, integrate with an AI-based recommendation system to provide personalized assistance based on the user’s past performance and behavior.
11. Timeout: Add a transition from any state to the “Timeout” state if the user is inactive for a certain period. Define the actions or conditions that occur when the timeout state is reached, such as logging out the user or prompting them to continue their activity.
12. Save Progress: Include a new state called “Save Progress” to allow users to save their progress and continue the quiz at a later time. Specify the transitions and actions associated with the “Save Progress” state to enable users to save their progress, review their answers, and make changes if necessary before resuming the quiz from where they left off.

## Deployment Diagram Requirements

Nodes:

- Continuous Integration (CI) server (e.g., GitHub Actions or Azure DevOps) (with Docker)
- Staging environment
- Pre-production environment
- Production environment
- Kubernetes cluster

For this, you’ll need to research what is called a “Continuous Integration” service*, or CI. I recommend investigating GitHub Actions or Azure DevOps.

When I push code, I don’t push it directly to the server itself. Instead, I push it to the CI server (e.g., GitHub Actions or Azure DevOps), which performs a number of tasks. The CI server runs database migrations, code checks and tests, and various other processes inside Docker containers. If the new code passes the tests, *then* the CI server will push that code along to the other servers.

### Deployment Diagram Development

GitHub Actions and Azure DevOps are cloud-based CI/CD services that provide a wide range of features and plugins for automating the build, test, and deployment processes. They offer easier setup and maintenance compared to self-hosted solutions like Jenkins. Additionally, these cloud-based services often offer better scalability options, allowing you to easily scale your CI/CD infrastructure based on your needs.

In addition to Travis CI and Codeship, also consider using CircleCI or GitLab CI/CD for continuous integration.

Implement a rollback strategy in case the new code fails in the production environment after passing the CI server tests. This can be achieved by keeping a backup of the previous working version of the code and having a mechanism to quickly revert back to it in case of issues or failures. This ensures minimal downtime and allows for efficient recovery in case of unexpected problems.

Implement automated security checks in the CI server to detect potential vulnerabilities in the code. This can be done by integrating security scanning tools into the CI pipeline, such as static code analysis tools, vulnerability scanners, and dynamic analysis tools. These tools can automatically analyze the code for security issues, including runtime vulnerabilities, and provide feedback to the development team. By detecting and addressing vulnerabilities early in the development process, the risk of security breaches can be significantly reduced.

Use container orchestration tools like Kubernetes for managing Docker containers, which can provide better scalability, fault-tolerance, and resource utilization. This allows for efficient management of containers, automatic scaling, load balancing, and improved resource utilization. Kubernetes provides features such as self-healing, rolling updates, and service discovery, which can enhance the availability and reliability of the application.

Consider using Infrastructure as Code (IaC) tools like Terraform or Ansible for provisioning and managing the CI/CD environments, which can improve reproducibility and maintainability.

Implement blue-green deployment or canary releases to reduce the risk and impact of failures in the production environment.

Consider using a cloud-based CI/CD service like GitHub Actions or Azure DevOps, instead of Jenkins, for easier setup, maintenance, and scalability.

In addition to static code analysis tools and vulnerability scanners, consider integrating dynamic analysis tools into the CI pipeline for a more comprehensive security check.

In summary, the deployment diagram development focuses on automation, reliability, and scalability, using modern CI/CD practices and tools. It underscores the importance of a systematic approach to software deployment that involves multiple testing environments and leverages containerization and orchestration technologies. This helps minimize risks while enabling efficient, repeatable deployments.

1. Use of CI Servers: The text mentions GitHub Actions, Azure DevOps, CircleCI, and GitLab CI/CD as examples of CI servers. These platforms automate the process of code integration, testing, and deployment, ensuring that new code changes are automatically built, tested, and ready for deployment. This automation helps in identifying integration issues early and improves the overall quality of the software.

1. Docker Integration: The CI process includes running tasks inside Docker containers. This ensures consistency across different environments by packaging the application and its dependencies into a container that can run anywhere Docker is supported. This approach simplifies dependencies management and makes the deployment process more reliable and predictable.

1. Staged Environments: The deployment process involves multiple environments, including staging, pre-production, and production. This staged approach allows for thorough testing and validation at each step before the code reaches the production environment, minimizing the risk of introducing errors or issues to end-users.

1. Kubernetes Cluster: The mention of a Kubernetes cluster indicates the use of container orchestration to manage the deployment and scaling of applications. Kubernetes provides features like auto-scaling, self-healing, and load balancing, which are crucial for maintaining application availability and performance at scale.

1. Continuous Deployment: The process described suggests a continuous deployment pipeline where code changes that pass all tests and checks in the CI server are automatically deployed to the other environments. This practice enables rapid and reliable delivery of features and fixes to users.

1. Research and Adaptation: The text encourages researching CI services like GitHub Actions, Azure DevOps, CircleCI, and GitLab CI/CD, highlighting the importance of choosing the right tools and practices based on project needs. Continuous learning and adaptation are implied as essential for successful deployment strategy development.

1. Implement a monitoring and logging system for your CI/CD pipeline and deployed applications. Tools like Prometheus and Grafana for monitoring, and ELK Stack or Loki for logging, can provide valuable insights into the performance and health of your applications.

1. Implement a rollback strategy in case the new code fails in the production environment after passing the CI server tests. This can be achieved by keeping a backup of the previous working version of the code and having a mechanism to quickly revert back to it in case of issues or failures.

1. Implement automated security checks in the CI server to detect potential vulnerabilities in the code. This can be done by integrating security scanning tools into the CI pipeline, such as static code analysis tools, vulnerability scanners, and dynamic analysis tools.

1. Use container orchestration tools like Kubernetes for managing Docker containers, which can provide better scalability, fault-tolerance, and resource utilization.

1. Consider using a blue-green deployment strategy to minimize downtime and risk during deployment. This strategy involves having two production environments (blue and green) and switching traffic between them after deploying and testing the new version in the inactive environment.

1. Implement a monitoring and logging system for your CI/CD pipeline and deployed applications. Tools like Prometheus and Grafana for monitoring, and ELK Stack or Loki for logging, can provide valuable insights into the performance and health of your applications.

1. Implement a rollback strategy in case the new code fails in the production environment after passing the CI server tests. This can be achieved by keeping a backup of the previous working version of the code and having a mechanism to quickly revert back to it in case of issues or failures.

1. Implement automated security checks in the CI server to detect potential vulnerabilities in the code. This can be done by integrating security scanning tools into the CI pipeline, such as static code analysis tools, vulnerability scanners, and dynamic analysis tools.

***Continuous Integration (CI)** is a software development practice where members of a team integrate their code frequently, usually multiple times a day. Each integration is verified by an automated build (including tests) to detect integration errors as quickly as possible.

## Posible bifurcations (decision points or branches) in the process flow

1. Student Authentication: The process begins with the Authentication Service validating the student’s identity using two-factor authentication. A bifurcation here would involve the outcome of the authentication process: successful authentication allows the student to proceed to take the quiz, while failed authentication would prevent access.
1. Question Display and Answer Submission: As the System sends one question at a time to the Question Display Service and the student answers questions, there’s an implicit decision point after each question regarding whether more questions are available. If more questions are available, the process loops back to display the next question. If no more questions are available, the process moves to the quiz completion phase.
1. Quiz Completion and Grading: Once the quiz is complete, the Grading Service calculates the grade based on the answers. This could involve decision points related to grading criteria, such as handling correct, partially correct, or incorrect answers differently.
1. Grade Review and Finalization: The Teacher views student results and provides feedback. The GradeReviewService allows the Teacher to review and override the automated grade if necessary. This represents a significant bifurcation point where the teacher’s intervention can alter the initially calculated grade. The process then moves to final grade recording, which is another decision point where the system must ensure that the grade is recorded securely and accurately.

## Assigning a grade

1. Teacher creates quiz
2. Teacher reviews and approves quiz
3. Teacher assigns quiz to students
4. System sends a notification to a real-time data processing system with details of the new quiz
5. Student takes quiz
   - Authentication Service validates student’s identity using session-based authentication
   - System sends one question at a time to Question Display Service
   - Student answers questions
   - System sends answers to a cache or session storage
   - The cache or session storage processes the answers and sends them to Answer Checking Service
   - Answer Checking Service checks the answers and provides feedback (right/wrong)
   - Answer Checking Service securely hashes and records answers temporarily in the cache or session storage
   - System displays next question if available or results if quiz complete
   - If quiz complete:
   - Grading Service calculates grade based on answers and saves the grade to the student profile using an API gateway for better security and scalability
   - Teacher views student results and provides feedback
   - GradeReviewService allows Teacher to review and override the automated grade if necessary
   - FinalGradeRecordingService saves finalized grades to student profile using an API gateway for better security and scalability
