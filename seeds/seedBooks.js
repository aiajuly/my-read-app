const { default: mongoose } = require('mongoose');
const Book = require('../models/books');

mongoose.connect('mongodb://localhost:27017/myReadDB');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


const deleteAllAndAddNewBooksThenDisconnect = async function(){

    Book.deleteMany();

    for(let counter = 1; counter <= 10; counter++){
        
        const book = new Book({
            bookName: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
            author: 'James Clear',
            imageUrl: 'https://m.media-amazon.com/images/I/812eE1lO0dL._AC_UF1000,1000_QL80_.jpg',
            description: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you. The problem is your system. Bad habits repeat themselves again and again not because you don't want to change, but because you have the wrong system for change. You do not rise to the level of your goals. You fall to the level of your systems. Here, you'll get a proven system that can take you to new heights. Clear is known for his ability to distill complex topics into simple behaviors that can be easily applied to daily life and work. Here, he draws on the most proven ideas from biology, psychology, and neuroscience to create an easy-to-understand guide for making good habits inevitable and bad habits impossible. Along the way, readers will be inspired and entertained with true stories from Olympic gold medalists, award-winning artists, business leaders, life-saving physicians, and star comedians who have used the science of small habits to master their craft and vault to the top of their field. Learn how to: make time for new habits (even when life gets crazy); overcome a lack of motivation and willpower design your environment to make success easier; get back on track when you fall off course; ...and much more. Atomic Habits will reshape the way you think about progress and success, and give you the tools and strategies you need to transform your habits--whether you are a team looking to win a championship, an organization hoping to redefine an industry, or simply an individual who wishes to quit smoking, lose weight, reduce stress, or achieve any other goal."
        });
        await book.save();
    };
    mongoose.disconnect();
};

deleteAllAndAddNewBooksThenDisconnect();