const SlackBot = require('slackbots')
const axios = require('axios')
const server = require('./sever')


const bot = new SlackBot({
    token: 'xoxb-689980001927-686756441314-INt8Jnysz8bOZASem2TxcMy3',
    name: 'Plan My Day'

})

//start
bot.on('start', () => {
    var params = {
        icon_emoji: ':cat:'
    }
    bot.postMessageToChannel('general', "Hello i am PlanMyDayBot type tasks to see your schedule", params)
});

//error 
bot.on('error', (err) => console.log(err))

//message
bot.on('message', (data) => {
    console.log(data)
    if (data.type !== 'message') {
        return;
    }

    handleMessage(data.text);
})



function handleMessage(message) {
    if (message.includes('@UL6N8CZ98')) {
            if (message.includes('tasks')) {
                getTaskList()
            }
            else if (message.includes('hello')) {
                sayHi()
            }
            else if (message.includes('help')) {
                runHelp();
            }
    }

}


function sayHi() {
    const params = {
        icon_emoji: ':smile:'
    }

    bot.postMessageToChannel('general', `Hello`, params)
}

function getTaskList() {
    axios.get('https://plan-my-dayapp.herokuapp.com/tasks/user/3')
        .then(res => {
            let tasks = res.data
            console.log(tasks)

            var params = {
                icon_emoji: ':cat:'
            }
            bot.postMessageToChannel('general', `These are your tasks for today: ${tasks.map((task)=>{
                return(` ${task.name} `)
            })}`, params)
        })
    // .catch(err =>{
    //     res.send(err)
    // })
}

function runHelp() {
    const params = {
        icon_emoji: ':question:'
    }

    bot.postMessageToChannel('general', `Type @planbot to get started`, params)
} 

var port = process.env.PORT || 3000;


server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));