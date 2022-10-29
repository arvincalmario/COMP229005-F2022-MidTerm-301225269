// Name:Arvin Almario
// Student Number: 301225269
// Midterm exam

// create a reference to the model
let TodoModel = require('../models/todo');

// Gets all todo from the Database and renders the page to list them all.
module.exports.todoList = function(req, res, next) {  

    TodoModel.find((err, todoList) => {
        //console.log(todoList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('todo/list', {
                title: 'To-Do List', 
                TodoList: todoList,
                userName: req.user ? req.user.username : '' //aalmario
            })            
        }
    });
}


// Gets a todo by id and renders the details page.
module.exports.details = (req, res, next) => {
    
    let id = req.params.id;

    TodoModel.findById(id, (err, todoToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('todo/details', {
                title: 'To-Do Details', 
                todo: todoToShow
            })
        }
    });
}

// Gets a todo by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => { //aalmario display edit page
    
    // ADD YOUR CODE HERE
    let id = req.params.id;

    TodoModel.findById(id, (err, itemToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('todo/add_edit', {
                title: 'Edit list', 
                todo: itemToEdit,
                userName: req.user ? req.user.username : '' //see sign in name in header
            })
        }
    });

}

// Processes the data submitted from the Edit form to update a todo
module.exports.processEditPage = (req, res, next) => { //aalmario process edited value

    let id = req.params.id
    
    console.log(req.body);

    let updatedTodo = TodoModel({
        _id: req.body.id,
        task: req.body.task,
        description: req.body.description,
        complete: req.body.complete ? true : false
    });

    // ADD YOUR CODE HERE

    TodoModel.updateOne({_id: id}, updatedTodo, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            console.log(req.body);
            // refresh list
            res.redirect('/todo/list');
        }
    });

}

// Deletes a todo based on its id.
module.exports.performDelete = (req, res, next) => { //aalmario deletes row

    // ADD YOUR CODE HERE
    let id = req.params.id;

    TodoModel.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh list
            res.redirect('/todo/list');
        }
    });
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => { //aalmario displays add page
    // ADD YOUR CODE HERE
    let newItem = TodoModel();

    res.render('todo/add_edit', {
        title: 'Add todo',
        todo: newItem,
        userName: req.user ? req.user.username : ''
    })         

}

// Processes the data submitted from the Add form to create a new todo
module.exports.processAddPage = (req, res, next) => { //almario process the added value

    console.log(req.body);

    let newTodo = TodoModel({
        _id: req.body.id,
        task: req.body.task,
        description: req.body.description,
        complete: req.body.complete ? true : false
    });

    // ADD YOUR CODE HERE
    TodoModel.create(newTodo, (err, item) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh list
            console.log(item);
            res.redirect('/todo/list');
        }
    });
    
}