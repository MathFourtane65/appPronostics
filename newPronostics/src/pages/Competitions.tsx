import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenu, IonMenuButton, IonModal, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { createBrowserHistory } from 'history';
import { personCircle, trophy, football, analytics, home, add, trash } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useCompetitions, Competition } from '../hooks/competitions';

import './Competitions.css';

const Competitions: React.FC = () => {
  useEffect(() => {
    getAllCompetitions();
  }, []);

  const [present] = useIonToast();

  const presentToast = (position: 'top' | 'middle' | 'bottom', message: string) => {
    present({
      message: message,
      duration: 1500,
      position: position
    });
  };




  const modal = useRef<HTMLIonModalElement>(null);
  const inputNameCompetition = useRef<HTMLIonInputElement>(null);
  const inputDescriptionCompetition = useRef<HTMLIonInputElement>(null);

  const inputStartDateCompetition = useRef<HTMLIonInputElement>(null);
  const inputEndDateCompetition = useRef<HTMLIonInputElement>(null);
  const inputNumberMatchesCompetition = useRef<HTMLIonInputElement>(null);

  //const history = useHistory();
  const history = createBrowserHistory({ forceRefresh: true });
  const { competitions, getAllCompetitions, createOneCompetition, deleteOneCompetition } = useCompetitions();

  function backToAdminMenu() {
    console.log('CLICK HOME');
    history.push('/admin');
  }

  function confirmCreateCompetition() {
    const newCompetition: Competition = {
      name: inputNameCompetition.current?.value?.toString(),
      description: inputDescriptionCompetition.current?.value?.toString(),
      startDate: inputStartDateCompetition.current?.value?.toString(),
      endDate: inputEndDateCompetition.current?.value?.toString(),
      numberMatches: inputNumberMatchesCompetition.current?.value?.toString(),
    }
    console.log(newCompetition);
    createOneCompetition(newCompetition).then(() => {
      presentToast('middle', "Comp??tition cr????e avec succ??s !");
      //getAllCompetitions();
    }).catch((err) => {
      console.log(err);
    });

    modal.current?.dismiss();    
  }

  function confirmDeleteCompetition(id: string) {
    deleteOneCompetition(id).then(() => {
        presentToast('top', "Comp??tition supprim??e avec succ??s !");
    }).catch((err) => {
        console.log(err);
    });
}



  return (
    <>
      <IonPage id="main-content">
        <IonHeader>

          <IonToolbar className='toolbar-admin'>
            <IonRow>
              <IonButton onClick={() => backToAdminMenu()}>
                <IonIcon icon={home} style={{ fontSize: "30px" }} />
              </IonButton>
              <IonTitle>COMPETITIONS</IonTitle>
            </IonRow>
          </IonToolbar>

        </IonHeader>
        <IonContent className="ion-padding">
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton id="modal-create-competition">
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFab>

          {competitions.map((comp, index) => (
          <IonCard key={index}>
          <IonCardHeader>
            <IonCardTitle>{comp.name} </IonCardTitle>
            <IonCardSubtitle>Du {comp.startDate} au {comp.endDate}</IonCardSubtitle>
          </IonCardHeader>
    
          <IonCardContent>
            {comp.description}
            <p>Nombre de matchs : {comp.numberMatches}</p>
          </IonCardContent>
          <div className='icon-delete'><IonIcon icon={trash} onClick={() => confirmDeleteCompetition(comp?._id)}></IonIcon></div>
        </IonCard>                 
        ))}

        


          


          {/* TO DO : liste des comp??titions dans des cards : 
                    nom, nb matchs, image?, date d??but , date de fin
                    QUnad on clique sur la card du match, page detail de la comp??tition
                    avec nom, dates d??but et fin, nb matchs, liste des matchs et la description */}

        </IonContent>

        {/* MODAL CREATION COMPETITION */}
        <IonModal ref={modal} trigger="modal-create-competition">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Annuler</IonButton>
              </IonButtons>
              <IonTitle>Nouvelle Competition</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirmCreateCompetition()}>
                  Creer
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="stacked">Nom</IonLabel>
              <IonInput ref={inputNameCompetition} type="text" placeholder="Entrer le nom de la comp??tition" />

              <IonLabel position="stacked">Decsription</IonLabel>
              <IonInput ref={inputDescriptionCompetition} type="text" placeholder="Entrer une description pour la comp??tition" />

              <IonLabel position="stacked">Date de d??but</IonLabel>
              <IonInput ref={inputStartDateCompetition} type="date" />

              <IonLabel position="stacked">Date de fin</IonLabel>
              <IonInput ref={inputEndDateCompetition} type="date" />

              <IonLabel position="stacked">Nombre de matchs</IonLabel>
              <IonInput ref={inputNumberMatchesCompetition} type="number" placeholder="Entrer le nombre de matchs" />


            </IonItem>
          </IonContent>
        </IonModal>


      </IonPage>
    </>
  );
};

export default Competitions;
