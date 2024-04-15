# Project One: Design Twitter System

## Class diagram

- **User** class:
  - *Attributes*:
    - username,
    - email,
    - password,
    - bio,
    - profile_picture
    - (following, followers, preferences…)
  - *Methods*:
    - postTweet(content): void
    - retweet(originalTweet): void
    - sendMessage(receiver, content): void
    - likeTweet(tweet): void
    - followUser(user): void
    - setPreference(themeColor, fontSize): void
  - *Relationships*:
    - One user can post many tweets (One-to-Many relationship with Tweet class)
    - One user can retweet many tweets (One-to-Many relationship with Retweet class)
    - One user can have many preferences (One-to-Many relationship with Preference class)
    - One user can send many messages (One-to-Many relationship with Message class)
    - One user can like many tweets (One-to-Many relationship with Like class)
    - One user can follow many other users (Many-to-Many relationship with User class for followers/following)
- **Tweet** class:
  - *Attributes*:
    - content,
    - timestamp,
    - media
  - *Methods*:
    - addHashtag(hashtag): void
    - addReply(reply): void
  - *Relationships*:
    - Many tweets can have many hashtags (Many-to-Many relationship with Hashtag class)
    - One tweet can have many replies (One-to-Many relationship with Reply class)
- **Retweet** class:
  - *Attributes*:
    - retweeted_tweet_id,
    - timestamp
- **Preference** class:
  - *Attributes*:
    - theme_color,
    - font_size
- **Security** class:
  - *Attributes*:
    - two_factor_enabled,
    - last_login
  - *Methods*:
    - enableTwoFactorAuthentication(): void
    - updateLastLogin(): void
    - (hash_password…)
- **Message** class:
  - *Attributes*:
    - sender_id,
    - receiver_id,
    - content,
    - timestamp
- **Hashtag** class:
  - *Attributes*:
    - tag_name
  - *Relationships*:
    - Many hashtags can be associated with many tweets (Many-to-Many relationship with Tweet class)
- **Reply** class:
  - *Attributes*:
    - reply_to_tweet_id,
    - content,
    - timestamp
- **Like** class:
  - *Attributes*:
    - tweet_id,
    - user_id,
    - timestamp
- **Location** class:
  - *Attributes*:
    - latitude,
    - longitude,
    - country,
    - city
- **Image** class:
  - *Attributes*:
    - image_url,
    - description

### To improve

1. **Encapsulation**: Ensure that sensitive data is protected. For example, the password attribute in the User class should be private and accessed or modified through getter and setter methods.
2. **Inheritance**: If there are common attributes or methods among classes, consider using inheritance. For example, Retweet could inherit from Tweet if they share common attributes or behaviors.
3. **Use of Enums**: For attributes with a limited set of possible values, such as themeColor in Preference, consider using enums to enforce type safety.
4. **Association vs. Aggregation vs. Composition**: Clearly define the type of relationships between classes. For instance, a User has a composition relationship with Preference (if the User is deleted, so are their preferences), but an association relationship with Tweet (tweets can exist independently of a user).
5. **Many-to-Many Relationship Handling**: For relationships like the one between User and Tweet for likes, consider using a join table or an intermediary class to handle the relationship more efficiently.
6. **Security Considerations**: For the Security class, consider adding methods for password hashing and validation. Storing passwords in plain text is a security risk.
7. **Timestamps**: Consider using a standard format or library for timestamps across all classes to ensure consistency.
8. **Method Responsibilities**: Ensure that methods do not exceed their scope of responsibility. For instance, postTweet should only handle the logic related to posting a tweet, not formatting or validating the tweet content.
9. **Validation**: Add input validation in methods to ensure data integrity. For example, in setPreference, validate that themeColor and fontSize are within acceptable ranges or values.
10. **Documentation**: Add comments or documentation to classes and methods to explain their purpose, parameters, and return types for better maintainability.

## Use-case diagram

- **Actors**:
  - *User*: A registered individual who can interact with the system by posting tweets, retweeting, liking tweets, and using optional features.
  - *Follower*: A special role of User who follows other users to see their tweets in their feed. Note that in the context of use-case diagrams, Follower is not explicitly represented as a separate actor since their actions fall under the general User actor.
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

### Use-Case Diagram Representation

The use-case diagram would visually represent the system as a box labeled “Design Twitter System”. Outside the box, you would have the “User” actor. Lines (associations) would connect the User to several ellipses inside the system box, each representing a use-case: “Post Tweet”, “Retweet”, “Like Tweet”, “Add Images to Posts”, “Direct Messaging”, and “Customize Profile”.

### Use-Case Diagram Notes

Additional use-cases or notes could be added if needed for clarity, but the given information is sufficient to understand the basic functionality and actors involved in the Twitter.

Simplify the use-case diagram by incorporating the Follower actor as a use-case under the User actor.