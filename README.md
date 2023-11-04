# Queens-College-Auto-Enroll

Queens-College-Auto-Enroll is a Discord bot integrated with a Python gRPC backend, designed to monitor the enrollment status of courses at Queens College. It automatically checks if a class is open for enrollment and notifies users on Discord.

## Features

- **Course Monitoring:** Continuously checks the status of classes and notifies users about the availability of spots.
- **Discord Commands:** Use Discord slash commands to add or remove courses from the monitoring list.
- **Real-time Notifications:** Sends real-time updates on Discord about class enrollment statuses.
- **gRPC Backend:** Utilizes a Python gRPC backend for fetching course status from the college's enrollment system.

## Installation

To set up the project, you will need Node.js and Python installed on your system.

1. **Clone the repository:**

   ```sh
   git clone https://github.com/acohen31/Queens-College-Auto-Enroll.git
   cd Queens-College-Auto-Enroll
   ```

2. **Install dependencies:**

   - For Node.js dependencies, run:

     ```sh
     npm install
     ```

   - For Python dependencies, make sure to have `pip` installed and run:

     ```sh
     pip install grpcio grpcio-tools bs4 requests
     ```

3. **Environment Variables:**
   - Create a `.env` file in the root of the project and define the following variables:

     ```
     TOKEN=your_discord_bot_token
     CHANNEL_ID=your_discord_channel_id
     GUILD_ID=your_discord_guild_id
     CLIENT_ID=your_discord_client_id
     ```

4. **Register Discord Commands:**
   - Run the `register_commands.js` script to register the Discord commands:

     ```sh
     node register_commands.js
     ```

5. **Start the gRPC Server:**
   - Execute the `grpc_server.py` to start the gRPC backend server:

     ```sh
     python grpc_server.py
     ```

6. **Run the Bot:**
   - Start the bot by running the `bot.js` script:

     ```sh
     node bot.js
     ```

## Usage

Once the bot is running and the commands are registered, you can use the following slash commands in Discord:

- `/add_class`: Adds a new class to the monitoring list.
- `/class_list`: Lists all classes currently being monitored.
- `/remove`: Removes a class from the monitoring list.

## Project Structure

- `bot.js`: The main entry point for the Discord bot.
- `grpcClient.js`: The JavaScript gRPC client for communicating with the Python server.
- `grpc_server.py`: The Python gRPC server that checks the course enrollment status.
- `register_commands.js`: Script to register Discord slash commands.
- `status.py`: Python script to check the enrollment status of a course.
- `course_info.proto`: Protocol buffer file defining the gRPC service and messages.

## Contributing

If you would like to contribute to the development of Queens-College-Auto-Enroll, please follow the standard fork and pull request workflow.
