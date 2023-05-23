This is a Coffee Roast, Roaster and Cultivar database management tool. Users can View, Add and Delete Coffee Data from the CoffeeDb database. This project is unfinished, and should include editing entries via http `put` requests, as well as accessing brew, brewer and user data.

Instructions:

1. Download NodeJS from [https://nodejs.org/en](https://nodejs.org/en)

2. * Restore DB from DB backup in this folder OR
   * Run the setup script in application/db/scripts/initialize.sql OR
   * Run the db docker container inside application:
     * download docker
     * run `docker compose up` from the application folder

3. Once the database is up and running, in a bash shell, run the `startup.sh` script from the application folder

4. Navigate to [https://localhost:3000](https://localhost:3000)