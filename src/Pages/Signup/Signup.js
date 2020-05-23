import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Signup.css';
import {Card} from 'react-bootstrap';
import firebase from '../../Services/firebase';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LoginString from '../Login/LoginStrings';

export default class SignUp extends Component{
    constructor(){
        super();
        this.state = {
            email:"",
            password:"",
            name:"",
            error:null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
           [event.target.name]: event.target.value
        })
    }

    async handleSubmit(event){

        const {name, password,email}= this.state;
        event.preventDefault();
        try{
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async result =>{
                firebase.firestore().collection('users')
                .add({
                    name,
                    id: result.user.uid,
                    email,
                    password,
                    URL:'',
                    description: '',
                    messages: [{notificationId:"", number:0}]
                }).then((docRef)=>{
                    localStorage.setItem(LoginString.ID, result.user.uid);
                    localStorage.setItem(LoginString.Name, name);
                    localStorage.setItem(LoginString.Email, email);
                    localStorage.setItem(LoginString.Password, password);
                    localStorage.setItem(LoginString.PhotoURL, "");
                    localStorage.setItem(LoginString.UPLOAD_CHANGED, 'state_changed');
                    localStorage.setItem(LoginString.Description, "");
                    localStorage.setItem(LoginString.FirebaseDocumentId, docRef.id);
                    
                    this.setState({
                        name:'',
                        password:'',
                        url:'',
                    });
                    this.props.history.push("/chat")
                }).catch((error) =>{
                    console.error("Error adding document", error)
                })
            })
        }
        catch(error){
            document.getElementById('1').innerHTML = "Erreur à l'enregistrement, veuillez réessayer"
        }
    }

    render(){
        const Signinsee = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'White',
            backgroundColor: '#1ebea5',
            width: '100%',
            boxshadow: "0 5px 5px #808888",
            height: "10rem",
            paddingTop: "48px",
            opacity:"0.5",
            borderBottom: '5px solid green',   
        }
        return(
            <div>
                <CssBaseline/>
                <Card style={Signinsee}>
                    <div>
                        <Typography component="h1" variant="h5">
                            CREEZ VOTRE COMPTE
                        </Typography>
                    </div>
                    <div>
                        <Link to="/">
                            <button class="pure-button"><i class="fa fa-home "></i> KEUR KAMITE</button>
                        </Link>
                    </div>
                </Card>
                <Card className="formacontrooutside">
                    <form className="customform" noValidate onSubmit={this.handleSubmit}>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email exemple d'adresse: abc@gmail.com"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={this.handleChange}
                        value={this.state.email}
                        />
                        <div>
                            <p style={{color:'grey', fontSize:'15px', marginLeft:'0'}}>
                                Le mot de passe doit être de 6 caractères minimum
                            </p>
                        </div>

                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Mot de passe"
                        name="password"
                        type="password"
                        autoComplete="current_password"
                        autoFocus
                        onChange={this.handleChange}
                        value={this.state.password}
                        />

                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nom d'utilisateur"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        onChange={this.handleChange}
                        value={this.state.name}
                        />
                        <div>
                            <p style={{color:'grey', fontSize:'15px'}}>
                                Veuillez remplir tous les champs pour s'enregistrer.
                            </p>
                        </div>
                        <div className="CenterAlignItems">
                            <button className="pure-button1" type="submit">
                                <span>S'ENREGISTER</span>    
                            </button> 
                        </div>
                        <div>
                            <p style={{color:'grey'}}>Avez-vous déjà un compte?</p>
                            <Link to="/login">
                                Connectez-vous ici
                            </Link>
                        </div>
                        <div className="Erreur">
                            <p id='1' style={{color:'red'}}></p>
                        </div>
                    </form>
                </Card>
            </div>
        );
    }
}
