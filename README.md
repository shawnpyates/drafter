## Draft Machine

Create and host sports drafts (for recreational leagues or potentially fantasy leagues) in live time.

Demo version [available here](https://draftmachine.herokuapp.com/) (it may take a minute to load).

#### Tech used:

**Server**: Node, Express, Postgres, Sequelize, Socket IO

**Client**: React, Redux, Webpack/Babel, CSS (Styled Components), Socket IO Client, Jest, Enzyme


#### To run locally:

1. Install server dependencies: `npm install`

1. You will need to [run your own local Postgres database](https://github.com/Kinto/kinto/wiki/How-to-run-a-PostgreSQL-server%3F) and to fill out the database configuration in `server/config.js` accordingly.

1. Create and migrate your database: `npm run migrate`

1. Create `.env` file in the root directory and fill in the following env variables. Note that you will need to have your own credentials for the e-mail notifications service.

    ```
      # .env

      PORT=3001
      NODE_ENV=development
      SESSION_KEY=your_own_session_key
      SESSION_SECRET=your_own_session_secret
      SERVER_URL=http://localhost:3001

      # if using remote database
      DATABASE_URL=postgres://YOUR_POSTGRES_URL

      # to enable e-mail notifications
      MAIL_HOST=smtp.mailtrap.io
      MAIL_PORT=2525
      MAIL_USER=
      MAIL_PASS=
    ```

1. Install client-side dependencies and generate webpack bundle: `npm run create-js-bundle-dev`

1. Run server: `npm start`