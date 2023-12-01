# Tech Blog

## Description

My motivation for building this project was so that I could finally build and deploy a full-stack application.  I built the project so that I could gain practice with writing all the parts of the stack and MVC paradigm, that is, the database, the front end, and the logic that communicates between the two.  This project is a technical blog where a user can create a username and password, log in with that username and password, and then create blog posts and comment on other users' blog posts.  The user can also edit and delete their own blog posts and comments.  For this project, I learned how to use Handlebars to be able to create  webpage content that is rendered dynamically.  I also learned how to hash database passwords, and I also learned to persevere even when the application takes longer to write than I expected.

## Table of Contents (Optional)

This README isn't that long, so N/A.

## Installation

This application has been deployed to Heroku, so you can access it with the link that is in the Usage section below.

## Usage

To access the application, you can use the following link: [https://glacial-reaches-96718-f00f706badc7.herokuapp.com/](https://glacial-reaches-96718-f00f706badc7.herokuapp.com/)

Here is a screenshot of the tech blog: ![A screenshot of the tech blog](/assets/images/tech-blog-screenshot.JPG)

Upon arrival at the website, you will see the home page.  To log in, click the **Login** option in the navigation bar.  The  **Login** option only appears when the user isn't logged in.  From the Log In page, you can enter a username and password, and click **Log In!**.  If you don't have a username and password, click the text "Sign Up Instead" below the **Log In!** button.  You can then enter a username and password and click **Sign Up!** to save your user profile to the database.  Keep in mind that your username must be unique as opposed to all the other usernames in the database.  If you choose a username that has been taken, you will receive an error message.  Once you click the **Sign Up!** button, you will be logged in automatically.  

After you are logged in, you will be taken to the dashboard.  Here, you can view a list of the blog posts you have created.  If you wish to create a new post, click on the **+ New Post"** button.  From there, enter in a title for the post and the contents of the post, and click the **Create New Blog Post** button.  You will be taken back to the dashboard, and the post that you have created will appear there.  To edit the post, click on the post, edit the title and contents as desired, and then click the **Update Blog Post** button.  If you wish to delete the blog post, click on it in the dashboard and then click the **Delete Blog Post** button.  

To add comments, navigate to the home page by clicking the **Home** link in the navigation bar.  Then, click on a blog post.  The application will render the blog post and all the comments associated with it.  To add a new comment, click the **Make a Comment** button, enter in the text of the comment, and then click the button **Create New Comment**.  The application will go back to the blog post with its comments, and the comment you added will appear.  To edit a comment you have created, click the **Edit or Delete** button next to it, type in the new comment contents, and click the **Update Comment** button.  To delete a comment you have created, click the **Edit or Delete** button next to it, and then click the **Delete Comment** button.  Keep in mind that you can only edit and delete blog posts and comments that you have created.  

To log out of the application, click the **Logout** option in the navigation bar.  This option only appears when the user is logged in.  If you are idle on the website for 30 minutes or more, you will be prompted to log in again before creating, updating, or deleting blog posts or comments.

## Credits

I took most of the code to seed the database (/seeds/index.js) from activity 7 of module 14.  I wrote my own seeds, and borrowed the script to run the seeds.

I also used the Xpert Learning Assistant to help out with writing the code.

## License

This project is under an MIT license.  Please see the license in the GitHub repository for more information.

## Badges

I don't have any noteworthy badges to display.

## Features

This project is a blog website that allows users to create a username and password, log in, and then create, update, and delete blog posts and comments they have created.  They can also view posts and comments that other users have created.  They can then log out when they are done.  If they are idle on the website for 30 minutes or more, they will be prompted to log in again before creating, updating, or deleting any more blog posts or comments.

## How to Contribute

This was an assignment I personally completed, so N/A.

## Tests

N/A
