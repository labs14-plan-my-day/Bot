require('dotenv').config();
const SlackBot = require('slackbots');
const axios = require('axios');
const server = require('./sever');

const bot = new SlackBot({
  token: process.env.ACCESS_TOKEN,
  name: 'Plan My Day'
});

//start
bot.on('start', () => {
  var params = {
    icon_emoji: ':cat:'
  };
  bot.postMessageToChannel(
    'general',
    'Hello i am PlanMyDayBot type tasks to see your schedule',
    params
  );
});

//error
bot.on('error', err => console.log(err));

//message
bot.on('message', data => {
  console.log(data.user);
  let user = data.user;
  if (data.type !== 'message') {
    return;
  }

  handleMessage(data);
});

function handleMessage(data) {
  console.log(`this is data`, data);
  console.log(`this is message`, data.text);
  if (data.text.includes('@UL6N8CZ98')) {
    if (data.text.includes('tasks')) {
      console.log('this is user', data.user);
      getTaskList(data.user);
    } else if (data.text.includes('hello')) {
      sayHi();
    } else if (data.text.includes('help')) {
      runHelp();
    }
  }
}

function sayHi() {
  const params = {
    icon_emoji: ':smile:'
  };

  bot.postMessageToChannel('general', `Hello`, params);
}

function getTaskList(user) {
  console.log('this is user in the function', user);
  axios.get(`http://localhost:8080/tasks/slack/${user}`).then(res => {
    let tasks = res.data;

    var params = {
      icon_emoji: ':cat:'
    };
    bot.postMessageToChannel(
      'general',
      `These are your tasks for today: ${tasks.map(task => {
        return ` ${task.name} `;
      })}`,
      params
    );
  });
  // .catch(err =>{
  //     res.send(err)
  // })
}

function runHelp() {
  const params = {
    icon_emoji: ':question:'
  };

  bot.postMessageToChannel('general', `Type @planbot to get started`, params);
}

var port = process.env.PORT || 3000;

server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));
