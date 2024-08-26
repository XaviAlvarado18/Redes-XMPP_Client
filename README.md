# XMPP Client - Frontend

This is the frontend component of an XMPP (Extensible Messaging and Presence Protocol) client, providing a user-friendly interface for communication with other XMPP users. Built with Angular, it offers functionalities like user authentication, contact management, status updates, and messaging.

## Features

* **User Authentication:** Log in, register, and manage your account.
* **Contact Management:** View and manage your contacts, including retrieving avatars and displaying their current status.
* **Status Updates:** See the availability status of contacts with corresponding color indicators for clarity. (Green: Available, Orange: Absent, Red: Busy/Unavailable, Gray: Offline)
* **Messaging:** Send and receive messages with other XMPP users in real-time.

## Technologies Used

* **Angular:** Primary framework for building the user interface.
* **TypeScript:** Ensures type-safe code for improved maintainability.
* **SCSS:** Provides flexibility for responsive and theme-based design.
* **HTML:** The fundamental markup language for structuring the application.
* **XMPP:** Communication protocol for message exchange.

## Prerequisites

Before you begin, ensure you have the following requirements installed on your machine:

* **Node.js:** Download and install from the official website (https://nodejs.org/).
* **Angular CLI:** Install globally using npm:

```bash
npm install -g @angular/cli
```

## Installation

To set up the frontend of the XMPP client on your local machine, follow these steps:

1. Clone the Repository:
```bash
git clone https://github.com/XaviAlvarado18/Redes-XMPP_Client.git
```

2. Navigate to the Project Directory:
```bash
cd Redes-XMPP_Client
```
3. Install Dependencies:

Run the following command to install the necessary dependencies:

```bash
npm install
```

## Running the Application
To start the development server and run the application locally:

```bash
ng serve
```

After running this command, open your browser and navigate to http://localhost:4200. The application will automatically reload if you make any changes to the source files.

## Usage

Authentication
- Login: Enter your XMPP credentials to log in.
- Register: Create a new XMPP account if you don't have one.

Managing Contacts
- View Contacts: See a list of your XMPP contacts.
- Contact Status: Each contact has a status indicator with different colors based on availability:
- Green: Available
- Orange: Absent
- Red: Unavailable or Busy
- Gray: Offline
- Add/Remove Contacts: Manage your contact list by adding or removing contacts.

Messaging
- Send Messages: Select a contact and start a chat.
- Receive Messages: Incoming messages from contacts are displayed in real-time.
