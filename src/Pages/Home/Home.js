import React, { Component } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import './Home.css';
import images from '../../ProjectImages/ProjectImages';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <Header />
                <div class="splash-container">
                    <div class="splash">
                        <h1 class="splash-head">KAnaL Wax Reekk</h1>
                        {/* <p class="splash-subhead">
                            Neexna Waxtan !
                        </p> */}

                        <div id="custom-button-wrapper" >
                            <Link to='/Login'>
                                <a class="my-super-cool-btn">
                                    <div class="dots-container">
                                        <div class="dot"></div>
                                        <div class="dot"></div>
                                        <div class="dot"></div>
                                        <div class="dot"></div>
                                    </div>
                                    <span className="buttoncooltext"> Live WaX </span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>

                <div class="content-wrapper">
                    <div class="content">
                        <h2 class="content-head is-center"> Accessoires de Keur Kamite </h2>

                        <div className="Appfeatures">

                            <div class="1-box pure-u-1 pure-u-md-1-2 pure-u-1g-1-4">
                                <h3 class="content-subhead">
                                    <i class="fa fa-sign-in"></i>
                                    Keur Kamite
                                </h3>
                                <p>  Pour découvir l'application </p>
                            </div>

                            <div class="1-box pure-u-1 pure-u-md-1-2 pure-u-1g-1-4">
                                <h3 class="content-subhead">
                                    <i class="fa fa-refresh"></i>
                                    Projets
                                </h3>
                                <p> En savoir plus sur les projets </p>
                            </div>

                            <div class="1-box pure-u-1 pure-u-md-1-2 pure-u-1g-1-4">
                                <h3 class="content-subhead">
                                    <i class="fa fa-th-large"></i>
                                    Nos événements
                                </h3>
                                <p> Keur kamite events </p>
                            </div>

                            <div class="1-box pure-u-1 pure-u-md-1-2 pure-u-1g-1-4">
                                <h3 class="content-subhead">
                                    <i class="fa fa-rocket"></i>
                                    La  communauté
                                </h3>
                                <p> Les personnalités de la communauté </p>
                            </div>
                        </div>
                    </div>

                    <div class="AppfeaturesFounder">
                        <div class="1-box pure-u-1 pure-u-md-1-2 pure-u-1g--5">
                            <img width="150" alt="file icons" class="pure-img-responsive"
                                src={images.coolah} />
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2 pure-u-1g-3-5">
                            <h2 class="content-head content-head-ribbon">COOLAH GASSA
                                <p style={{ color: 'black' }}> FONDATEUR DE KEUR KAMITE</p>
                            </h2>
                        </div>
                    </div>

                    <div class="content">
                        <h2 class="content-head is-center" >Qui Somme Nous?</h2>

                        <div class="Appfeatures">
                            <div class="1-box-lrg pure-u-1 pure-u-md-2-5">
                                <form class="pure-form pure-form-stacked">
                                    <fieldset>

                                        <label for="pseudo">Votre pseudo</label>
                                        <input id="pseudo" type="text" placeholder="Pseudo" />


                                        <label for="email">Votre email</label>
                                        <input id="email" type="email" placeholder="Adresse mail" />



                                        <label for="password">Votre mot de passe</label>
                                        <input id="password" type="password" placeholder="Mot de passe" />

                                        <button type="submit" className="pure-button" >Valider</button>
                                    </fieldset>
                                </form>
                            </div>

                            <div class="1-box-larg pure-u-1 pure-u-md-3-5">
                                <h4>Contactez nous</h4>
                                <p>
                                    Pour toutes questions ou suggestions, contactez nous sur:
                                    <a href="https://www.facebook.com/dramane.guesso.5">https://www.facebook.com/dramane.guesso.5</a>
                                </p>
                                <p>
                                    Gmail: <a href="mailto:celes.thym@gmail.com">celes.thym@gmail.com</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}