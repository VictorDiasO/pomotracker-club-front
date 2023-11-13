# Features Docs

There is one thing that is more important than every feature or crazy idea that I have here. It all needs

## Goals Helper
You can set a Goal of focus for each part of your day, like: If you want to have 3 hours of focus from 9AM to 12:30PM (midday), you can set this goal and the timer will automatically adjust the Timers for you using math functions. And you can set more than 1 "Goals Helper" to your day.
And in addition you can enable the website to send Notifications and set the inactivity period that you want the Pomotracker-Club to Warn you of your Goals (The notifications can contain random motivational phrases).

## Tasks to Focus On
It's basically a CRUD, and to create a new task you just need to fill this fields:
- Task Name / Title
- Task Description (If you need)
- Select a Color to this task
- (Only if you know how much time you want to focus on) Set the quantity of pomodoro timers need to finish this task.
- There could be a Drag and Drop system where you can drag and drop the tasks and put the next one above the others and it will starts automatically after ends you actual task Pomo quotas.
(new stuff starting from here - 11/09/2023)
- I can create an "Adcanced fields" to show the following fields and more:
- Due date
- Difficulty (Detailed on "Ideas for me to think about" section)
- "Tag" or "Type" (Detailed on "Ideas for me to think about" section)

Then I want to create a sub-tasks system, sometimes we need to develop some feature but there are a lot of other "sub-features" that we need to focus on, so I want the possibility to create and manage sub-tasks.

### Sub-tasks
You should be able to attach a sub-task to a task, and you should be able to attach links and additional text too.

### Goals Helper + Tasks
It would be nice to have something that calculates the time for the pomodoro and breaks when you change to a task that have "Estimated hours" instead of "Estimated pomodoros", so when you have "Estimated hours" it will calculate automatically to make sure that you doesn't work more than 45/50 minutes to do a break and continue from there. This way you dont need to be setting the timer for your desired amount every time, and maybe it would be nice if you could define a different Pomodoro pattern for every task.


## Reports
The reports will only be available when I create the back-end for this application. But there we will save your data anonymously and you will decide what to do with it. Maybe on the future you can go to settings and click on "Reports with Insights by AI" and we retrieve your data plus some insights by AI on where you need to focus more.
Anyway, the website will store the following data:
[ ] - Pomodoro (Focused time)
[ ] - Short Breaks (You can do as many short breaks as you want, so we will store it too for you)
[ ] - Long Breaks (same reason as Short Breaks)
[ ] - Time spent without using any of these timers (So if you was on the screen but you were not using any of the timers we will collect it too - Here it deserves a say that it will be entirely anonymously stored)
[ ] - How much Tasks and Sub-Tasks you had focused on
[ ] - Time you spent in each Tasks and Sub-Tasks


## Ideas for me to think about with observations:
Pomodoro timer with different patterns: Allow users to define different Pomodoro patterns for different tasks. For example, a user might want to use a 25-5-25 pattern for creative tasks and a 50-10-50 pattern for coding tasks.
- Seems interesting, I can create a field on the task Creation modal to be the "Tag" or "Type" of the task, and the user can define a preset for each kind of Tag/Type of tasks, for example: Creative, Boring, Study, Coding. The user can create as many Tag/Types as he/she wants.


Pomodoro timer with breaks that are tailored to the task: Automatically adjust the length of breaks based on the difficulty of the task. For example, a user might need a longer break after working on a difficult task.
- Seems very interesting too. Maybe I can create a new field for the Task creation modal to be the "Difficulty" field, so the user can create their own sets of difficulties but the default ones will be Easy, Easy-Medium, Medium, Medium-Hard, Hard, and Hard as fk.


Pomodoro timer that takes into account distractions: Allow users to track distractions and automatically adjust the Pomodoro timer accordingly. For example, if a user is interrupted by a notification, the Pomodoro timer can be paused and restarted when the user is ready to focus again.
- This one is cool. But I have no idea of how make it real.


Pomodoro timer that integrates with other productivity tools: Allow users to integrate the Pomodoro timer with other productivity tools, such as task managers and calendar apps. This would allow users to create a seamless workflow between their Pomodoro timer and other productivity tools.
- Would be fun to integrates with Notion, Evernote and those apps, cause I didnt saw any Pomodoro tracker that really integrates with Notion, Evernote and etc., so I could be the first one and use this as my differential.


Pomodoro timer that provides insights into productivity: Use artificial intelligence to provide users with insights into their productivity. For example, the Pomodoro timer could track how long it takes users to complete different tasks and identify areas where they can improve their productivity.
- I do think about that, but the thing is: I want an AI to support the user, tell the user when they are working too much or too many hours, that warn them to go out and do other stuff than studying or working hahaha, I think it would be cool.


The Pomodoro timer could use a machine learning algorithm to predict how difficult a task is based on its title, description, and due date. Once the difficulty of the task is predicted, the Pomodoro timer could automatically adjust the length of the breaks. For example, if the Pomodoro timer predicts that a task is difficult, it might schedule a longer break after 25 minutes of work.


Have an embedded Work (Eletronic maybe) and Lofi Spotify Playlist.



