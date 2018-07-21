$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

$(function () {
    $('[data-toggle="dropdown"]').dropdown('toggle');
});

// ES6 Shoutout Messages
class Shoutout {
    constructor(name, message, tour_session) {
        this.name = name;
        this.message = message;
        this.tour_session = tour_session;
    }
}

class UI {
    addMessageToList(Shoutmessage) {
        const list = document.getElementById('messageList');
        // create li element
        const li = document.createElement('li');
        //Insert li into ul
        li.innerHTML = `
            <li><strong>Customer Name: </strong> <p class='lead'>${Shoutmessage.name}</p></li>
            <li><strong>Message: </strong> <p class='lead'> ${Shoutmessage.message}</p></li>
            <li><strong>Tour Session: </strong> <p class='lead'> ${Shoutmessage.tour_session} </p></li>
            <li><a href="#" class="delete bttn-minimal bttn-sm" tour_session=${Shoutmessage.tour_session}>Remove Shoutout<a></li>
        `;
        list.appendChild(li);
    }

    showAlert(message, className) {
        // create div
        const div = document.createElement('div');

        // Add classes
        div.className = `alert ${className}`;

        // Add text
        div.appendChild(document.createTextNode(message));

        // Get Parent Class
        const container = document.querySelector('.shoutout-form-container');

        // Get form Id
        const form = document.querySelector('#shoutout-form');

        // Insert alert
        container.insertBefore(div, form);

        // Timeout after 3 seconds
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteShout(target) {
        if (target.className.split(' ').indexOf('delete') > -1) {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('name').value = '';
        document.getElementById('message').value = '';
        document.getElementById('tour_session').value = '';
    }
}
// Local Storage Class Object
class Store {
    static getShoutouts() {
        let messages;
        if (localStorage.getItem('messages') === null) {
            messages = [];
        } else {
            messages = JSON.parse(localStorage.getItem('messages'));
        }

        return messages;
    }

    static displayShoutouts() {
        const messages = Store.getShoutouts();
        messages.reverse().forEach(function (message) {
            const ui = new UI;

            ui.addMessageToList(message);
        });
    }

    static addMessage(message) {
        const messages = Store.getShoutouts();
        messages.push(message);

        localStorage.setItem('messages', JSON.stringify(messages));
    }

    static removeMessage(tour_session) {
        const messages = Store.getShoutouts();
        messages.forEach(function (message, index) {
            if (message.tour_session === tour_session) {
                messages.splice(index, 1);
            }
        });
        localStorage.setItem('messages', JSON.stringify(messages));
    }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayShoutouts);

// Event Listener for add message
document.getElementById('shoutout-form').addEventListener('submit', function (e) {

    //Grab form values
    const name = document.getElementById('name').value,
        message = document.getElementById('message').value,
        tour_session = document.getElementById('tour_session').value

    // Instantiate message
    const msg = new Shoutout(name, message, tour_session);

    // Instantiate UI
    const ui = new UI();

    console.log(ui);

    // Validate
    if (!name || !message || !tour_session) {
        //Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add message to list
        ui.addMessageToList(msg);

        // Add to Local Storage
        Store.addMessage(msg);

        // Show success
        ui.showAlert('Shoutout Message Added!', 'success');

        // Clear fields
        ui.clearFields();
    }

    e.preventDefault();
});


// Event Listener for delete

document.getElementById('messageList').addEventListener('click', function (e) {
    // Instantiate UI
    const ui = new UI();

    // Delete message
    ui.deleteShout(e.target);

    // Remove from Local Storage
    Store.removeMessage(e.target.getAttribute('tour_session'));

    // Show message
    ui.showAlert('Message Removed!', 'success');
    e.preventDefault();
});


/* Bootstrap Active Link Enabler*/
$(document).ready(function () {
    var liItems = $('.navbar ul li');

    $.each(liItems, function(key, liItem){
        var aEl = $(this).children(liItem)[0];

        if(aEl == document.URL){
            $(liItem).addClass('active');
        }
    })
})