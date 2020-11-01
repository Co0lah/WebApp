import React from 'react';
import {Card} from 'react-bootstrap';
import ReactLoading from 'react-loading';
import 'react-toastify/dist/ReactToastify.css';
import firebase from '../../Services/firebase';
import images from '../../ProjectImages/ProjectImages';
import moment from 'moment';
import './Chatbox.css';
import LoginString from '../Login/LoginStrings';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Chatbox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading :  false,
            isShowSticker : false,
            inputValue: ""
        }
        this.currentUserName = localStorage.getItem(LoginString.Name)
        this.currentUserId = localStorage.getItem(LoginString.ID)
        this.currentUserPhoto = localStorage.getItem(LoginString.PhotoURL)
        this.currentUserDocumentId = localStorage.getItem(LoginString.FirebaseDocumentId)
        this.stateChanged = localStorage.getItem(LoginString.UPLOAD_CHANGED)
        this.currentPeerUser= this.props.currentPeerUser
        this.groupChatId = null;
        this.listMessage= [];
        this.currentPeerUserMessages= [];
        this.removeListener= null;
        this.currentPhotoFile= null;
        

        firebase.firestore().collection('users').doc(this.currentPeerUser.documentKey).get()
        .then((docRef) =>{
            this.currentPeerUserMessages = docRef.data().messages
        })
    }

    UNSAFE_componentWillReceiveProps(newProps){
        if(newProps.currentPeerUser){
            this.currentPeerUser = newProps.currentPeerUser
            this.getListHistory()
        }
    }

    componentDidMount(){
        this.getListHistory()
    }
    
    componentWillMount(){
        if(this.removeListener){
            this.removeListener()
        }
    }

    getListHistory = () =>{
        if(this.removeListener){
            this.removeListener()
        }
        this.listMessage.length = 0
        this.setState({isLoading: true})
        if(
            this.hashString(this.currentUserId) <=
            this.hashString(this.currentPeerUser.id)
        ){
            this.groupChatId = `${this.currentUserId}-${this.currentPeerUser.id}`
        }else{
            this.groupChatId = `${this.currentPeerUser.id}-${this.currentUserId}`
        }
        //get history and listen new data added
         firebase.firestore()
        .collection('Messages')
        .doc(this.groupChatId)
        .collection(this.groupChatId)
        .onSnapshot(Snapshot =>{
            Snapshot.docChanges().forEach(change =>{
                if(change.type === LoginString.DOC){
                    this.listMessage.push(change.doc.data())
                }
            })
            this.setState({isLoading: false})
            },
            err => {
                this.props.showToast(0, err.toString())
            }
        )
    }

    onSendMessage = (content, type) =>{
        let notificationMessages = []
        if(this.state.isShowSticker && type === 2){
            this.setState({isShowSticker: false})
        }
        if (content.trim() === ''){
            return
        }
        const timestamp = moment()
        .valueOf()
        .toString()

        const itemMessage= {
            idFrom: this.currentUserId,
            idTo: this.currentPeerUser.id,
            timestamp: timestamp,
            content: content.trim(),
            type: type
        }
        firebase.firestore()
        .collection('Messages')
        .doc(this.groupChatId)
        .collection(this.groupChatId)
        .doc(timestamp)
        .set(itemMessage)
        .then(()=>{
            this.setState({inputValue: ''})
        })
        this.currentPeerUserMessages.map((item) =>{
            if(item.notificationId !== this.currentUserId){
                notificationMessages.push(
                    {
                    notificationId: item.notificationId,
                    number: item.number
                    }
                )
            }
        })
        firebase.firestore()
        .collection('users')
        .doc(this.currentPeerUser.documentKey)
        .update({
            messages: notificationMessages
        }).then((data) =>{})
        .catch(err =>{
            this.props.showToast(0, err.toString())
        })
    }

    scrollToBottom = () =>{
        if(this.messagesEnd){
            this.messagesEnd.scrollIntoView({})
        }
    }

    onKeyboardPress = event =>{
        if(event.key === 'Enter'){
            this.onSendMessage(this.state.inputValue, 0)
        }
    }
    
    openListSticker = () =>{
        this.setState({isShowSticker: !this.state.isShowSticker})
    }


    render(){
        console.log(this.state);
        
        return(
            <Card className= "viewChatBoard">
                <div className= "headerChatBoard">
                    <img 
                    className= "viewAvatarItem"
                    src= {this.currentPeerUser.URL}
                    alt= ""
                    />
                    <span className= "textHeaderChatBoard">
                        <p style= {{fontSize: '20px'}}> {this.currentPeerUser.name}</p>
                    </span>
                    <div className= "aboutme">
                        <span >
                            <p> {this.currentPeerUser.description} </p>
                        </span>
                    </div>
                </div>
                <div className= "viewListContentChat">
                    {this.renderListMessage()}
                    <div 
                    style= {{float: 'left', clear: 'both'}}
                    ref= {el =>{
                        this.messagesEnd = el
                    }}
                    />
                </div>
                {this.state.isShowSticker ? this.renderStickers():null}
                <div className= "viewBottom">
                    <img
                        className= "icOpenGallery"
                        src= {images.input_file}
                        alt= "icon open gallery"
                        onClick= { ()=>{ this.refInput.click()}}
                    />
                    <input
                        ref= {el => {
                            this.refInput = el
                        }}
                        className= "viewInputGallery"
                        accept= "image/*"
                        type= "file"
                        onChange= {this.onChoosePhoto}
                    />
                    <img 
                        className= "icOpenSticker"
                        src= {images.sticker}
                        alt= "icon open sticker"
                        onClick= {this.openListSticker}
                    /> 
                    
                    <input
                        className= "viewInput"
                        placeholder= "Tapez votre message"
                        value= {this.state.inputValue}
                        onChange= {event =>{
                            this.setState({inputValue: event.target.value})
                        }}
                        onKeyPress= {this.onKeyboardPress}
                    />
                    <img
                    className= "icSend"
                    src= {images.send}
                    alt= "icon send"
                    onClick= {()=> {this.onSendMessage(this.state.inputValue, 0)}}
                    />

                </div>
                        {this.state.isLoading ? (
                            <div className= "viewLoading">
                                <ReactLoading
                                    type= {'spin'}
                                    color= {'#203152'}
                                    height= {'3%'}
                                    width= {'3%'}
                                />
                            </div>
                        ): null}
            </Card>
        )
    }

    onChoosePhoto = event => {
        if(event.target.files && event.target.files[0]) {
            this.setState({isLoading: true})
            this.currentPhotoFile = event.target.files[0]
            //check if file is an image
            //console.log(localstorage.PREFIX_IMAGE)
            const prefixFiletype = event.target.files[0].type.toString()
            if (prefixFiletype.indexOf('image/') === 0) {
                this.uploadPhoto()
            } else {
                this.setState({isLoading: false})
                this.props.showToast(0, "Ceci n'est pas une image")
            }
        } else{
            this.setState({isLoading: false})
        }
    }

    uploadPhoto = () => {
        if (this.currentPhotoFile) {
            const timestamp = moment()
            .valueOf()
            .toString()

            const uploadTask = firebase.storage()
            .ref()
            .child(timestamp)
            .put(this.currentPhotoFile)

            uploadTask.on(
                LoginString.UPLOAD_CHANGED,
                null,
                err => {
                    this.setState({isLoading: false})
                    this.props.showToast(0, err.message)
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        this.setState({isLoading: false})
                        this.onSendMessage(downloadURL, 1)
                    })
                }
            )
        } else {
            this.setState({isLoading: false})
            this.props.showToast(0, 'Fichier incorrect')
        }
    }

    renderListMessage = () =>{
        if(this.listMessage.length > 0){
            let viewListMessage = []
            this.listMessage.forEach((item, index) =>{
                if(item.idFrom === this.currentUserId){
                    if(item.type === 0){
                        viewListMessage.push(
                            <div className= "viewItemRight" key={item.timestamp}>
                                
                                <span className= "textContentItem"> {item.content} </span>    
                            </div>
                        )
                    }else if(item.type === 1){
                        viewListMessage.push(
                            <div className="viewItemRight2" key= {item.timestamp}>
                                <img 
                                    className= "imgItemRight2"
                                    src= {item.content}
                                    alt= ""
                                />
                            </div>
                        )
                    }else{
                        viewListMessage.push(
                            <div className= "viewItemRight3" key= {item.timestamp}>
                                <img
                                    className= "imgItemRight"
                                    src= {this.getGifImage(item.content)}
                                    alt= "content message"
                                />
                            </div>
                        )
                    }
                }else{
                    if(item.type === 0){
                        viewListMessage.push(
                            <div className= "viewWrapItemLeft" key= {item.timestamp}>
                                <div className= "viewWrapItemLeft3">
                                    {this.isLastMessageLeft(index) ? (
                                        <img
                                        src= {this.currentPeerUser.URL}
                                        alt= "avatar"
                                        className= "peerAvatarLeft"
                                        />
                                    ): (
                                        <div className= "viewPaddingLeft"/> 
                                    )}
                                    <div className= "viewItemRight" key={item.timestamp}>
                                        <span className= "textContentItem"> {item.content} </span>
                                    </div>
                                </div>
                                {this.isLastMessageLeft(index)?(
                                    <span className= "textTimeLeft">
                                        <div className= "time">
                                             {moment(Number(item.timestamp)).format('DD MMM HH:mm')}
                                        </div>
                                    </span>
                                ): null}
                            </div>
                        )
                    }else if(item.type === 1){
                        viewListMessage.push(
                            <div className= "viewWrapItemLeft2" key= {item.timestamp}>
                                <div className= "viewWrapItemLeft3">
                                     {this.isLastMessageLeft(index)?(
                                         <img
                                         src= {this.currentPeerUser.URL}
                                         alt= "avatar"
                                         className= "peerAvatarLeft"
                                         />
                                     ): (
                                         <div className= "viewPaddingLeft"/>
                                     )}
                                     <div className= "viewItemLeft2">
                                        <img
                                        src= {item.content}
                                        alt= "content message"
                                        className= "imgItemLeft2"
                                        />
                                     </div>
                                </div>
                                {this.isLastMessageLeft(index)?(
                                    <span className= "textTimeLeft">
                                        <div className= "time">
                                             {moment(Number(item.timestamp)).format('DD MMM HH:mm')}
                                        </div>
                                    </span>
                                ): null}
                            </div>
                        )
                    }else{
                        viewListMessage.push(
                                <div className= "viewWrapItemLeft2" key= {item.timestamp}>
                                    <div className= "viewWrapItemLeft3">
                                         {this.isLastMessageLeft(index)?(
                                             <img
                                             src= {this.currentPeerUser.URL}
                                             alt= "avatar"
                                             className= "peerAvatarLeft"
                                             />
                                         ): (
                                             <div className= "viewPaddingLeft"/>
                                         )}
                                         <div className= "viewItemLeft3" key= {item.timestamp}>
                                            <img
                                            className= "imgItemRight2"
                                            src= {this.getGifImage(item.content)}
                                            alt= "content message"
                                            />
                                         </div>
                                    </div>
                                    {this.isLastMessageLeft(index)?(
                                    <span className= "textTimeLeft">
                                        <div className= "time">
                                             {moment.locale(Number(item.timestamp)).format('DD MMM HH:mm')}
                                        </div>
                                    </span>
                                    ): null}
                                </div>
                        )
                    }
                }
            })
            return viewListMessage
        }else{
            return(
                <div className= "viewWrapSayHi">
                    <span className= "textSayHi"> Hotep sama way</span>
                </div>
            )
        } 
    }

    renderStickers = () =>{
        return(
            <div className= "viewStickers">
                <img 
                    className= "imgSticker"
                    src= {images.spic1}
                    alt= "sticker"
                    onClick= { () =>{this.onSendMessage('spic1', 2)} }
                />
                <img 
                    className= "imgSticker"
                    src= {images.spic2}
                    alt= "sticker"
                    onClick= { () =>{this.onSendMessage('spic2', 2)} }
                />
                <img 
                    className= "imgSticker"
                    src= {images.lol}
                    alt= "sticker"
                    onClick= { () =>{this.onSendMessage('lol', 2)} }
                />
            </div>
        )
    }

    getGifImage =value =>{
        switch(value) {
            case 'spic1':
                return images.spic1
            case 'spic2':
                return images.spic2
            case 'lol':
                return images.lol
            default:
                return null
        }
    }

    hashString = str => {
        let hash = 0
        for (let i = 0; i < str.length; i++) {
            hash += Math.pow(str.charCodeAt(i) * 31, str.length - i)
            hash = hash & hash // convert to  32bit integer
        }
        return hash
    }

    isLastMessageLeft(index){
        if(
            (index + 1 < this.listMessage.length &&
                this.listMessage[index + 1].idFrom === this.currentUserId) ||
                index === this.listMessage.length - 1
        ){
            return true
        } else {
            return false
        }
    }

    isLastMessageRight(index){
        if(
            (index + 1 < this.listMessage.length &&
                this.listMessage[index + 1].idFrom !== this.currentUserId) ||
                index === this.listMessage.length - 1
        ){
            return true
        } else {
            return false
        }
    }
}