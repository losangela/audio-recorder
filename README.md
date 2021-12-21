# Audio Recorder

Use this app to record audio with a microphone input!

# Prompt
```
Problem Statement
1. Create a prototype web application which captures audio while a button is pressed and sends the audio over the network to a server. In addition to recording, the app should have a way to play the captured audio back.
2. Create a simple web server that receives the audio. What it does with the audio is up to you, but at minimum it should store it so that it can be played back.
3. Be able to explain the code at the level a junior dev could understand, justify design decisions, choice of dependencies, trade-offs, etc.
We would like you to spend 4-6 hours on this task, and once you have completed it, please share the code with us, either by public repository or by sending us an archive (zip, tgz, etc) of the project.
On the day of your interview, we would like you to demo this app for us and explain your process for designing and implementing it. In addition, we will ask you how it could be optimized or otherwise improved.
```

# Getting Started
run `yarn start` in the terminal and it will open `http://localhost:3000/`
Press the red button on the page to record. Recordings are sent to a server and saved in a bucket.