## Draft Machine

Create and host sports drafts (for recreational leagues or potentially fantasy leagues) in live time.

#### Tech used:

**Server**: Node, Express, Postgres, Sequelize, Socket IO

**Client**: React, Redux, Webpack/Babel, CSS (Styled Components), Socket IO Client, Jest, Enzyme


#### To run locally:

1. Install server dependencies: `npm install`

1. Create `.env` file in the root directory and fill in the following env variables. Note that you will need to have to run your own postgres instance as well as your own credentials for the e-mail notifications service.

    ```
      # ./env

      PORT=3001
      NODE_ENV=production
      JWT_SECRET=YOUR_OWN_SECRET
      SERVER_URL=http://localhost:3001
      DATABASE_URL=postgres://YOUR_POSTGRES_URL

      # to enable e-mail notifications
      MAIL_HOST=smtp.mailtrap.io
      MAIL_PORT=2525
      MAIL_USER=
      MAIL_PASS=
    ```
1. Install client-side dependencies and generate webpack bundle: `cd client && npm install && npm build-prod && cd ..`

1. Run server: `npm start`


#### Key Remaining Todos:

1. Reduce web bundle size:
    - implement bundle chunking (attempt with React.lazy have been unsucessful, likely due to dependency conflict)
    - implement lightweight calendar solution for datepicker (currently using `react-dates` which requires the monstrous `Moment.js` as a codependency)
1. Include `Change Password` option in `UpdateUser`.
1. Change more class components to functional components using hooks API.
1. Mass-create feature (enable user to create multiple players in a single form).
1. Prettier styling.


