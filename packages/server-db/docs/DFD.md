# Data Flow Diagram

- this uses mermaid syntax. You can use the [mermaid live editor](https://mermaid.live/) to visualize the diagram.

```mermaid
flowchart TD
    %% subgraph ExternalEntities
        user_entity[User]
        user_entity_clone[User Clone]
    %% end

    %% subgraph Processes
        posting_process((Posting))
        browsing_posts_process((Browsing Posts))
        searching_process((Searching))
        browsing_search_history_process((Browsing Search History))
        liking_process((Liking))
        browsing_likes_process((Browsing Likes))
        commenting_process((Commenting))
        browsing_comments_process((Browsing Comments))
        following_process((Following))
        browsing_follows_process((Browsing Follows))
        question_management_process((Question Management))
        browsing_questions_process((Browsing Questions))
        account_management_process((Account Management))
        browsing_accounts_process((Browsing Accounts))
        topic_management_process((Topic Management))
        browsing_topics_process((Browsing Topics))
        person_management_process((Person Management))
        browsing_persons_process((Browsing Persons))
        group_management_process((Group Management))
        browsing_groups_process((Browsing Groups))
        groups_of_people_management_process((Groups of People Management))
        browsing_groups_of_people_process((Browsing Groups of People))
        post_topics_management_process((Post Topics Management))
        browsing_post_topics_process((Browsing Post Topics))
        question_topics_management_process((Question Topics Management))
        browsing_question_topics_process((Browsing Question Topics))
    %% end

    %% subgraph DataStores
        user_data(User)
        post_data(Post)
        search_history_data(Search_history)
        topic_data(Topic)
        person_data(Person)
        group_data(Group)
        groups_of_people_data(Groups_of_people)
        likes_data(Likes)
        comments_data(Comments)
        post_topics_data(Post_topics)
        follows_data(Follows)
        question_data(Question)
        question_topics_data(Question_topics)
    %% end

    user_entity -->|Post| posting_process
    user_entity -->|Posts| browsing_posts_process
    user_entity -->|Search| searching_process
    user_entity -->|Search History| browsing_search_history_process
    user_entity -->|Like| liking_process
    user_entity -->|Likes| browsing_likes_process
    user_entity -->|Comment| commenting_process
    user_entity -->|Comments| browsing_comments_process
    user_entity -->|Follow| following_process
    user_entity -->|Follows| browsing_follows_process
    user_entity -->|Question| question_management_process
    user_entity -->|Questions| browsing_questions_process
    user_entity -->|Account| account_management_process
    user_entity -->|Accounts| browsing_accounts_process
    user_entity -->|Topic| topic_management_process
    user_entity -->|Topics| browsing_topics_process
    user_entity -->|Person| person_management_process
    user_entity -->|Persons| browsing_persons_process
    user_entity -->|Group| group_management_process
    user_entity -->|Groups| browsing_groups_process
    user_entity -->|Groups of People| groups_of_people_management_process
    user_entity -->|Groups of People| browsing_groups_of_people_process
    user_entity -->|Post Topics| post_topics_management_process
    user_entity -->|Post Topics| browsing_post_topics_process
    user_entity -->|Question Topics| question_topics_management_process
    user_entity -->|Question Topics| browsing_question_topics_process

    posting_process -->|Post| post_data
    post_data -->|Posts| browsing_posts_process
    browsing_posts_process -->|Posts| user_entity_clone
    searching_process -->|Search History| search_history_data
    search_history_data -->|Search History| browsing_search_history_process
    browsing_search_history_process -->|Search History| user_entity_clone
    liking_process -->|Likes| likes_data
    likes_data -->|Likes| browsing_likes_process
    browsing_likes_process -->|Likes| user_entity_clone
    commenting_process -->|Comments| comments_data
    comments_data -->|Comments| browsing_comments_process
    browsing_comments_process -->|Comments| user_entity_clone
    following_process -->|Follows| follows_data
    follows_data -->|Follows| browsing_follows_process
    browsing_follows_process -->|Follows| user_entity_clone
    question_management_process -->|Question|question_data
    question_data -->|Questions| browsing_questions_process
    browsing_questions_process -->|Questions| user_entity_clone
    account_management_process -->|User| user_data
    user_data -->|Accounts| browsing_accounts_process
    browsing_accounts_process -->|Accounts| user_entity_clone
    topic_management_process -->|Topic| topic_data
    topic_data -->|Topics| browsing_topics_process
    browsing_topics_process -->|Topics| user_entity_clone
    person_management_process -->|Person| person_data
    person_data -->|Persons| browsing_persons_process
    browsing_persons_process -->|Persons| user_entity_clone
    group_management_process -->|Group| group_data
    group_data -->|Groups| browsing_groups_process
    browsing_groups_process -->|Groups| user_entity_clone
    groups_of_people_management_process -->|Groups of People| groups_of_people_data
    groups_of_people_data -->|Groups of People| browsing_groups_of_people_process
    browsing_groups_of_people_process -->|Groups of People| user_entity_clone
    post_topics_management_process -->|Post Topics| post_topics_data
    post_topics_data -->|Post Topics| browsing_post_topics_process
    browsing_post_topics_process -->|Post Topics| user_entity_clone
    question_topics_management_process -->|Question Topics| question_topics_data
    question_topics_data -->|Question Topics| browsing_question_topics_process
    browsing_question_topics_process -->|Question Topics| user_entity_clone
```
