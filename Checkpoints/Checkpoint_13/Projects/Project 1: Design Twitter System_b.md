# Project One: Design Twitter System

## Explanation of the Application

The Design Twitter System application is a social networking platform where users can create, view, and interact with tweets. Users can post tweets containing text and images, like and retweet other tweets, customize their profile, search for other users, and engage in direct messaging. The application also supports blocking/unblocking users, reporting inappropriate content, deleting tweets, viewing profile details, editing profile information, following/unfollowing other users, and logging out of the system.

The application is designed to provide a user-friendly and interactive experience for its users. By incorporating different features and functionalities, the application aims to enhance user engagement and foster a community where users can connect, share information, and express themselves.

## Class diagram

- **User** class:
  - *Attributes*:
    - username (String)
    - email (String)
    - passwordHash (String)
    - bio (String)
    - profilePicture (String)
    - following (SetUser)
    - followers (SetUser)
    - preferences (SetPreference)
    - role (Role)
  - *Methods*:
    - postTweet(content: String): void
    - retweetTweet(originalTweet: Tweet): void
    - sendMessage(receiver: User, content: String): void
    - likeTweet(tweet: Tweet): void
    - followUser(user: User): void
    - setPreference(themeColor: String, fontSize: String): void
    - startSession(): void
    - endSession(): void
    - validateInput(input: String): boolean
  - *Relationships*:
    - One user can post many tweets (One-to-Many relationship with Tweet class)
    - One user can retweet many tweets (One-to-Many relationship with Retweet class)
    - One user can have many preferences (One-to-Many relationship with Preference class)
    - One user can send many messages (One-to-Many relationship with Message class)
    - One user can like many tweets (One-to-Many relationship with Like class)
    - One user can follow many other users (Many-to-Many relationship with User class for followers/following)
- **Tweet** class:
  - *Attributes*:
    - content (String)
    - timestamp (Date)
    - media (ListImage)
    - hashtags (SetHashtag)
    - replies (SetReply)
  - *Methods*:
    - addHashtagToTweet(hashtag: Hashtag): void
    - addReplyToTweet(reply: Reply): void
  - *Relationships*:
    - Many tweets can have many hashtags (Many-to-Many relationship with Hashtag class)
    - One tweet can have many replies (One-to-Many relationship with Reply class)
- **Retweet** class:
  - *Attributes*:
    - retweetedTweetId (String)
    - timestamp (Date)
  - *Relationships*:
    - One retweeted tweet (One-to-One relationship with Tweet class)
- **Preference** class:
  - *Attributes*:
    - themeColor (ThemeColor)
    - fontSize (FontSize)
  - *Relationships*:
    - One user can have many preferences (One-to-Many relationship with Preference class)
- **Security** class:
  - *Attributes*:
    - twoFactorEnabled (Boolean)
    - lastLoginTime (Date)
  - *Methods*:
    - enable2FA(): void
    - updateLastLoginTime(): void
    - hashPassword(password: String): String
  - *Relationships*:
    - One user can have one security (One-to-One relationship with User class)
- **Message** class:
  - *Attributes*:
    - sender (User)
    - receiver (User)
    - content (String)
    - timestamp (Date)
  - *Relationships*:
    - One message can have one sender (One-to-One relationship with User class)
    - One message can have one receiver (One-to-One relationship with User class)
- **Hashtag** class:
  - *Attributes*:
    - tagName (String)
  - *Relationships*:
    - Many hashtags can be associated with many tweets (Many-to-Many relationship with Tweet class)
- **Reply** class:
  - *Attributes*:
    - replyToTweet (Tweet)
    - content (String)
    - timestamp (Date)
  - *Relationships*:
    - One reply can have one replyToTweet (One-to-One relationship with Tweet class)
- **Like** class:
  - *Attributes*:
    - tweet (Tweet)
    - user (User)
    - timestamp (Date)
  - *Relationships*:
    - One like can have one tweet (One-to-One relationship with Tweet class)
    - One like can have one user (One-to-One relationship with User class)
- **Location** class:
  - *Attributes*:
    - latitude (Double)
    - longitude (Double)
    - country (String)
    - city (String)
  - *Relationships*:
    - Many tweets can have one location (One-to-One relationship with Tweet class)
- **Image** class:
  - *Attributes*:
    - imageUrl (String)
    - description (String)
  - *Relationships*:
    - Many tweets can have many images (One-to-Many relationship with Image class)

### To improve

1. **Encapsulation**:
Ensure that sensitive data is protected. For example, the password attribute in the User class should be private or protected and accessed or modified through getter and setter methods.
2. **Inheritance**: If there are common attributes or methods among classes, consider using inheritance. For example, Retweet could inherit from Tweet if they share common attributes or behaviors.
3. **Use of Enums**: For attributes with a limited set of possible values, such as themeColor in Preference, consider using enums to enforce type safety and prevent invalid input.
4. **Association vs. Aggregation vs. Composition**: Clearly define the type of relationships between classes. For instance, a User has a composition relationship with Preference (if the User is deleted, so are their preferences), but an association relationship with Tweet (tweets can exist independently of a user).
5. **Many-to-Many Relationship Handling**: For relationships like the one between User and Tweet for likes, consider using a join table or an intermediary class to handle the relationship more efficiently. For example, a User has many likes, which could be handled by a join table or a separate Like class.
6. **Security Considerations**: For the Security class, consider adding methods for password hashing and validation. Storing passwords in plain text is a security risk. To mitigate this risk, passwords should be hashed before being stored in the database. It is also important to add methods for password hashing and validation, as well as implement sufficient access controls to restrict unauthorized access to sensitive data and functionality based on user roles and permissions.
7. **Timestamps**: Consider using a standard format or library for timestamps across all classes to ensure consistency. For example, the postTweet method should only handle the logic related to posting a tweet, not formatting or validating the tweet content.
8. **Method Responsibilities**: Ensure that methods do not exceed their scope of responsibility. For instance, postTweet should only handle the logic related to posting a tweet, not formatting or validating the tweet content.
9. **Validation**: Add input validation in methods to ensure data integrity. For example, in setPreference, validate that themeColor and fontSize are within acceptable ranges or values.
10. **Documentation**: Add comments or documentation to classes and methods to explain their purpose, parameters, and return types for better maintainability.

### Potential security risks associated with the current design of the User class

- Storing passwords in plain text: Storing passwords in plain text is a major security risk as it allows anyone with access to the database to read and potentially compromise the passwords. To mitigate this risk, the password attribute in the User class should be encrypted or hashed before being stored in the database.
- Insufficient access controls: The current design of the User class does not provide sufficient access controls, which can lead to unauthorized access to sensitive data. For example, the postTweet method allows any user to post a tweet, which could be abused by malicious users to spread spam or phishing links. To mitigate this risk, access controls should be implemented to restrict access to sensitive data and functionality based on user roles and permissions.
- Lack of session management: The current design of the User class does not include session management, which can lead to session hijacking and other security vulnerabilities. To mitigate this risk, session management should be implemented to ensure that each user session is unique and cannot be impersonated.
- Insufficient input validation: The current design of the User class does not include sufficient input validation, which can lead to SQL injection and other security vulnerabilities. To mitigate this risk, input validation should be implemented to ensure that data entered into the system is valid and cannot be manipulated by attackers.

## Use-case diagram

- **Actors**:
  - *User*: A registered individual who can interact with the system by posting tweets, retweeting, liking tweets, and using optional features.
  - *Follower*: A special role of User who follows other users to see their tweets in their feed. Note that in the context of use-case diagrams, Follower is not explicitly represented as a separate actor since their actions fall under the general User actor.
  - *Guest*: An unregistered user who can view public tweets and profiles but cannot interact with the system.
  - *System Administrator*: An actor responsible for managing the system, handling reports, and performing other administrative tasks.
- **Use-Cases**:
  - Posting Tweets:
    - Actor: User
    - Description: Users can create and post tweets to their profile. Tweets can contain text, images, and hashtags.
  - Retweets and Likes:
    - Actor: User
    - Description: Users can retweet others’ tweets to their own profile and like any tweet. These actions are visible to their followers and contribute to the tweet’s overall engagement metrics.
  - Optional Features:
    - Adding Images to Posts:
      - Actor: User
      - Description: Users have the option to add images to their tweets, enhancing the visual appeal and information content of their posts.
    - Direct Messaging:
      - Actor: User
      - Description: Users can send private messages to other users, facilitating direct communication outside of public tweets.
    - Customizing Profile:
      - Actor: User
      - Description: Users can customize their profile by changing their bio, profile picture, and other personalization settings to express their identity.
    - Search:
      - Actor: User
      - Description: Users can search for other users, hashtags, or specific tweets to discover relevant content and connect with users of interest.
    - Block/Unblock User:
      - Actor: User
      - Description: Users can block or unblock other users to control their online experience. Blocked users will be prevented from seeing the user’s tweets, retweets, and likes, as well as sending direct messages. This feature enhances user privacy and safety.
    - Report:
      - Actor: User
      - Description: Users can report inappropriate content or behavior on the platform. This feature helps maintain a safe and respectful environment for all users and allows the platform to take appropriate actions against violators.
    - Delete Tweet:
      - Actor: User
      - Description: Users can delete their own tweets from their profile. This allows users to remove any content they no longer want to be associated with.
    - View Profile:
      - Actor: User
      - Description: Users can view another user’s profile to see their tweets, retweets, and other profile information. This allows users to explore and connect with other users on the platform.
    - Edit Profile:
      - Actor: User
      - Description: Users can edit their profile information, including their bio, profile picture, and other personalization settings.
    - Follow/Unfollow User:
      - Actor: User
      - Description: Users can follow or unfollow other users to control their feed and see tweets from the users they follow. This action allows users to connect with each other and discover relevant content.
    - View Tweet:
      - Actor: User
      Description: Users can view the details of a tweet, including its content, media, hashtags, replies, and engagement metrics (likes, retweets). This allows users to engage with the content more deeply by reading through the replies and possibly participating in the conversation.
    - View Notifications:
      - Actor: User
      - Description: Users can view notifications related to their activity on the platform. Notifications may include alerts for new followers, likes, retweets, mentions, and direct messages. This feature keeps users informed about interactions with their content and updates related to their network.
    - Logout:
      - Actor: User
      - Description: Users can log out of the system to end their session and protect their account from unauthorized access.

### Use-Case Diagram Representation

The use-case diagram would visually represent the system as a box labeled “Design Twitter System”. Outside the box, you would have the “User” actor. Lines (associations) would connect the User to several ellipses inside the system box, each representing a use-case: “Post Tweet”, “Retweet”, “Like Tweet”, “Add Images to Posts”, “Direct Messaging”, “Customize Profile”, “Search”, “Block/Unblock User”, “Report”, “Delete Tweet”, “View Profile”, “Edit Profile”, “Follow/Unfollow User”,  “View Tweet”, “View Notifications”, and “Logout”.

### Use-Case Diagram Notes

Additional use-cases or notes could be added if needed for clarity, but the given information is sufficient to understand the basic functionality and actors involved in the Twitter.

Simplify the use-case diagram by incorporating the Follower actor as a use-case under the User actor.
Follower actions like viewing tweets fall under the general User functionality.

Additionally, add the Guest actor and connect it to view-only use-cases like View Profile and View Tweet.
