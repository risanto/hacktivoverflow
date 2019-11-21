# Hacktiflow API Documentation

## **A. User Routes**
- - -
| Routes         | HTTP | Headers | Body |
|----------------|------|---------|------|
| /users/register | POST | None | name: string, email: string, password: string |
| /users/login    | POST | None | email: string, password: string |


**1. Register**
----
  Returns an access token.

* **URL**

  /users/register

* **Method:**

  `POST`
  
*  **URL Params**

   None

*  **Header Params**

   None

* **Data Params**

  name: string; email: string; password: string

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ "message": "Successfully registered!", "access_token": "bar" }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
    "messages": [
        "Email address has already been used!"
    ]
    }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```js
    {
    "messages": [
        "Please input your name!",
        "Please input your email address!",
        "Please input your password!"
      ]  
    }

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```js
    {
      "messages": [
        "Your password must contains both number and letters!"
      ]
    }

**2. Log in**
----
  Returns an access token.

* **URL**

  /users/login

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  None

* **Data Params**

  email: string; password: string;

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "message": "Successfully logged in!", "access_token": "bar" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
    "messages": [
        "Wrong email/password!"
    ]
}`

- - -

## **B. Question Routes**
- - -
| Routes         | HTTP | Headers | Body |
|----------------|------|---------|------|
| /questions    | GET | None | None |
| /questions/:id | GET | None | None |
| /questions | POST | access_token: string | title: string, description: string, upvotes: number, downvotes: number |
| /questions/:id | PATCH | access_token: string | _id: string, title: string, description: string, upvotes: number, downvotes: number |
| /questions/:id | DELETE | access_token: string | None |

**1. Fetch all questions**
----
  Returns all questions from the database.

* **URL**

  /questions

* **Method:**

  `GET`
  
*  **URL Params**

   None

*  **Header Params**

   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
      "questions": [
        {
            "upvotes": 0,
            "downvotes": 0,
            "answers": [],
            "_id": "5dd26662d1ee2369587f11bb",
            "title": "Boostrap - Align text and icons on sidebar",
            "description": "As we can see in the sidebar the icons is aligned, but the text not,the text are a little to left.\n\nSo the question is: How can i align the icons and the text?",
            "asker": "5dd25de1d97b34578a1db900",
            "createdAt": "2019-11-18T09:37:38.969Z",
            "updatedAt": "2019-11-18T09:37:38.969Z",
            "__v": 0
        }
      ]
    }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to fetch questions. Please refresh the browser!"
    ]
}`

**2. Add a question**
----
  Create a new question.

* **URL**

  /questions

* **Method:**

  `POST`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```js
    {
      "message": "Successfully posted a question!",
      "question": {
        "upvotes": 0,
        "downvotes": 0,
        "answers": [],
        "_id": "5dd26662d1ee2369587f11bb",
        "title": "Boostrap - Align text and icons on sidebar",
        "description": "As we can see in the sidebar the icons is aligned, but the text not,the text are a little to left.\n\nSo the question is: How can i align the icons and the text?",
        "asker": "5dd25de1d97b34578a1db900",
        "createdAt": "2019-11-18T09:37:38.969Z",
        "updatedAt": "2019-11-18T09:37:38.969Z",
        "__v": 0
    }
  }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to submit the question. Please try again!"
    ]
  }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```js
    {
      "messages": [
        "Title is missing.",
        "Description is missing."
      ]
    }

**3. Fetch a question**
----
  Fetch a specific question.

* **URL**

  /questions/:id

* **Method:**

  `GET`
  
*  **URL Params**

   None

*  **Header Params**

   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
      "question": [
          {
            "upvotes": 0,
            "downvotes": 0,
            "answers": [],
            "_id": "5dd26662d1ee2369587f11bb",
            "title": "Boostrap - Align text and icons on sidebar",
            "description": "As we can see in the sidebar the icons is aligned, but the text not,the text are a little to left.\n\nSo the question is: How can i align the icons and the text?",
            "asker": "5dd25de1d97b34578a1db900",
            "createdAt": "2019-11-18T09:37:38.969Z",
            "updatedAt": "2019-11-18T09:37:38.969Z",
            "__v": 0
          }
      ]
    }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to fetch the question. Please try again!"
    ]
}`

**4. Update a question**
----
  Update a specific question.

* **URL**

  /questions/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
      "message": "Successfully updated a question!",
      "question": {
        "upvotes": 0,
        "downvotes": 0,
        "answers": [],
        "_id": "5dd26662d1ee2369587f11bb",
        "title": "A new question title",
        "description": "As we can see in the sidebar the icons is aligned, but the text not,the text are a little to left.\n\nSo the question is: How can i align the icons and the text?",
        "asker": "5dd25de1d97b34578a1db900",
        "createdAt": "2019-11-18T09:37:38.969Z",
        "updatedAt": "2019-11-18T12:29:09.711Z",
        "__v": 0
      }
    }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to update the question. Please try again!"
    ]
  }`

  OR

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:** `{
      "messages": [
          "Unauthorized access!"
      ]
    }`

**5.Delete a question**
----
  DElete a specific question.

* **URL**

  /questions/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
      "message": "Successfully deleted a question!",
      "question": {
        "upvotes": 0,
        "downvotes": 0,
        "answers": [],
        "_id": "5dd26662d1ee2369587f11bb",
        "title": "A new question title",
        "description": "As we can see in the sidebar the icons is aligned, but the text not,the text are a little to left.\n\nSo the question is: How can i align the icons and the text?",
        "asker": "5dd25de1d97b34578a1db900",
        "createdAt": "2019-11-18T09:37:38.969Z",
        "updatedAt": "2019-11-18T12:29:09.711Z",
        "__v": 0
      }
    }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to delete the question. Please try again!"
    ]
  }`

  OR

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:** `{
      "messages": [
          "Unauthorized access!"
      ]
    }`

**6. Upvote a question**
----
  Upvote a specific question.

* **URL**

  /questions/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
    "message": "Successfully upvoted a question!",
    "question": {
        "upvotes": 1,
        "downvotes": 0,
        "answers": [],
        "_id": "5dd296529bdac623e988f74c",
        "title": "azure custom vision model precision",
        "description": "I want to know the best way to optimize my custom vision.\n\nIn using Image classification, will...",
        "asker": "5dd25de1d97b34578a1db900",
        "createdAt": "2019-11-18T13:02:10.952Z",
        "updatedAt": "2019-11-18T13:16:54.625Z",
        "__v": 0
    }
}
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to upvote the question. Please try again!"
    ]
  }`

  OR

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:** `{
      "messages": [
          "Unauthorized access!"
      ]
    }`

**7. Downvote a question**
----
  Downvote a specific question.

* **URL**

  /questions/:id/downvote

* **Method:**

  `PATCH`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
    "message": "Successfully downvoted a question!",
    "question": {
        "upvotes": 1,
        "downvotes": 1,
        "answers": [],
        "_id": "5dd296529bdac623e988f74c",
        "title": "azure custom vision model precision",
        "description": "I want to know the best way to optimize my custom vision.\n\nIn using Image classification, will...",
        "asker": "5dd25de1d97b34578a1db900",
        "createdAt": "2019-11-18T13:02:10.952Z",
        "updatedAt": "2019-11-18T13:16:54.625Z",
        "__v": 0
    }
}
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to downvote the question. Please try again!"
    ]
  }`

  OR

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:** `{
      "messages": [
          "Unauthorized access!"
      ]
    }`
- - -
## **C. Answer Routes**
- - -
| Routes         | HTTP | Headers | Body |
|----------------|------|---------|------|
| /answers    | GET | access_token: string | None |
| /answers | POST | access_token: string | description: string, upvotes: number, downvotes: number |
| /answers/:id | GET | access_token: string | None |
| /answers/:id | PATCH | access_token: string | _id: string, description: string, upvotes: number, downvotes: number |
| /answers/:id | DELETE | access_token: string | None |

**1. Fetch all articles**
----
  Returns all articles from the database.

* **URL**

  /articles

* **Method:**

  `GET`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "articles": [{"foo": "bar"}] }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to fetch articles. Please refresh the browser!"
    ]
}`

**2. Add an article**
----
  Create a new article.

* **URL**

  /articles

* **Method:**

  `POST`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "message": "Successfully published an article!" }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to submit the article. Please try again!"
    ]
}`

**3. Fetch an article**
----
  Fetch a specific article.

* **URL**

  /articles/:id

* **Method:**

  `GET`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "article": {"foo": "bar"} }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to fetch the article. Please try again!"
    ]
}`

**4. Update an article**
----
  Update a specific article.

* **URL**

  /articles/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "article": {"foo": "bar"} }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to update the article. Please try again!"
    ]
}`

**5.Delete an article**
----
  DElete a specific article.

* **URL**

  /articles/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "message": "Successfully deleted an article!"} }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{
    "messages": [
        "Failed to delete the article. Please try again!"
    ]
}`