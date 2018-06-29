import React, { Component } from 'react';
import Input from '../components/Input';
import ButtonIcon from '../components/ButtonIcon';

class Chat extends Component {
  state = {
    message: '',
  };

  onChange = (n, v) => {
    this.setState({
      message: v,
    });
  };

  audioCall = () => {

  };

  videoCall = () => {

  };

  addFile = () => {

  };

  audioMessage = () => {

  };

  render() {
    const { message } = this.state;
    const {
      onChange,
      audioCall,
      videoCall,
      addFile,
      audioMessage,
    } = this;

    return (
      <div className="chat">
        <div className="chat__header">
          <div className="chat__companion">
            <div className="chat__avatar">
              <img className="chat__avatar-img" src="/media/content/support.png" alt="" />
            </div>
            <div className="chat__companion_title">Ваш персональный ассистент – Наталья</div>
          </div>
          <div className="chat__header-control">
            <ButtonIcon onClick={audioCall} icon="phone.svg" />
            <ButtonIcon onClick={videoCall} icon="camera.svg" />
          </div>
        </div>
        <div className="chat__content">
          <div className="chat__messages">
            <div className="chat__date">
              <div className="chat__date-inner">6 мая 2018</div>
            </div>
            <div className="chat__message">
              <div className="chat__avatar">
                <img className="chat__avatar-img" src="/media/content/support.png" alt="" />
              </div>
              <div className="chat__message-content">
                <div className="chat__message-meta">
                  <span>Наталья </span>
                  <span>12:22</span>
                </div>
                <div>Здраствуйте! Чем могу помочь?</div>
              </div>
            </div>
            <div className="chat__message">
              <div className="chat__avatar">
                <img className="chat__avatar-img" src="/media/content/client.png" alt="" />
              </div>
              <div className="chat__message-content">
                <div className="chat__message-meta">
                  <span>12:25</span>
                </div>
                <div>Привет! Почему-то не срабатывает оплата по моей кредитке </div>
              </div>
            </div>
          </div>
        </div>
        <div className="chat__footer">
          <ButtonIcon onClick={addFile} icon="plus.svg" className="button-icon_chat-footer" />
          <Input
            name="message"
            className="input_chat"
            value={message}
            onChange={onChange}
            placeholder="Напишите сообщение..."
            multiLine
            simplePlaceholder
          />
          <ButtonIcon onClick={audioMessage} icon="microphone.svg" className="button-icon_chat-footer" />
        </div>
      </div>
    );
  }
}

export default Chat;
