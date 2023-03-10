import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminMenu from './pages/AdminMenu';
import Competitions from './pages/Competitions';
import PlayerMenu from './pages/PlayerMenu';
import Matchs from './pages/Matchs';

import PlayerCompetitions from './pages/PlayerCompetitions';
import CompetitionDetails from './pages/CompetitionDetail';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/player">
          <PlayerMenu />
        </Route>
        {/* <Route exact path="/player/competitions">
          <PlayerCompetitions />
        </Route> */}
        <Route exact path="/admin">
          <AdminMenu />
        </Route>
        <Route exact path="/admin/competitions">
          <Competitions />
        </Route>
        {/* <Route exact path="/competitions/:competitionId">
          <CompetitionDetails />
        </Route> */}
        {/* <Route path = "/player/competitions">
          <PlayerMenu />
        </Route> */}

        <Route exact path="/admin/matchs">
          <Matchs />
        </Route>

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
