var express = require('express');
const bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const users = [{
    "first_name": "John",
    "last_name": "Doe",
    "id_number": '0001121221080',
    "phone": '0821234567',
    "physical_address": "1 Fountain road, Johannesburg"
}];

const validInput = function(inputData) {
    let isValidInput = true;
    if(!inputData) { isValidInput = false};
    if(!inputData.first_name) { isValidInput = false}
    if(!inputData.last_name) { isValidInput = false}
    if(!inputData.id_number) { isValidInput = false}
    if(inputData.id_number.length !== 13) { isValidInput = false}
    if(isNaN(inputData.id_number)) { isValidInput = false}
    users.forEach(user => {
        if(user.id_number === inputData.id_number) {
            isValidInput = false;
        }
        if(user.phone && inputData.phone && user.phone === inputData.phone) {
            isValidInput = false;
        }
    });
    return isValidInput;
}

const canUpdate = function(userData, idNumber) {
    let canUpdate = true;
    users.forEach(user => {
        if(user.phone === userData.phone && user.id_number !== idNumber) {
            canUpdate = false;
        }
    });
    if(!userData.first_name || !userData.last_name) {
        canUpdate = false;
    }
    return canUpdate;
}

class Controller {

    constructor() {
        
    }

    static getAllUsers(req, res) {
        return res.status(200).send({body: users})
    }

    static addUser(req, res) {
        if(validInput(req.body)) {
            users.push(req.body);
            return res.status(201).send({'users': JSON.stringify(users.length)})
        }
        return res.status(400).send({body: `Unable to add information. Please fix input.`})
    }

    static updateUser(req, res) {
        const updateIndex = users.findIndex(user => user.id_number === req.params.id_number);
        const updateRequestData = req.body;
        if(canUpdate(updateRequestData, req.params.id_number) && updateIndex > -1) {
            const newData = {
                "first_name": updateRequestData.first_name,
                "last_name": updateRequestData.last_name,
                "phone": updateRequestData.phone,
                "physical_address": updateRequestData.physical_address,
                "id_number": req.params.id_number
            }
            users[updateIndex] = newData;
            return res.status(204).send();
        }
        res.send("Item not found");
    }

    static deleteUser(req, res) {
        const deleteIndex = users.findIndex(user => user.id_number === req.params.id_number);
        if(deleteIndex > -1) {
            const deleteResponse = users.splice(deleteIndex,1);
            return res.send(`Deleted ${JSON.stringify(deleteResponse)}`);
        }
        res.send("Item not found");
    }

    static search(req, res) {
        const response = [];
        users.forEach(user => {
            if(req.body.first_name && user.first_name === req.body.first_name) {
                response.push(user);
            }
            if(req.body.id_number && user.id_number === req.body.id_number) {
                response.push(user);
            }
            if(req.body.phone && user.phone === req.body.phone) {
                response.push(user);
            }
        })
        res.send([...new Set(response)]);
    }
}

module.exports = Controller;