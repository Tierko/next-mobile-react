import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InlineSvg from 'svg-inline-react';
import cs from 'classnames';
import Input from '../../../common/js/components/Input';
import ButtonIcon from '../components/ButtonIcon';

class Chat extends Component {
  state = {
    audio: false,
    message: '',
    messages: [{
      user: 'Наталья',
      avatar: '/media/content/support.png',
      date: {
        year: 2018,
        month: 4,
        day: 4,
        time: '12:22',
      },
      text: 'Здравствуйте! Чем могу помочь?',
      docs: [],
    }, {
      user: null,
      avatar: '/media/content/client.png',
      date: {
        year: 2018,
        month: 4,
        day: 4,
        time: '12:25',
      },
      text: 'Привет! Почему-то не срабатывает оплата по моей кредитке ',
      docs: [],
    }, {
      user: 'Наталья',
      avatar: '/media/content/support.png',
      date: {
        year: 2018,
        month: 4,
        day: 4,
        time: '12:23',
      },
      text: 'Вы пробовали провести оплату по карте Сбербанка или Альфа-Банка?',
      docs: [],
    }],
  };

  onChange = (n, v) => {
    this.setState({
      message: v,
    });
  };

  onKeyDown = (e) => {
    const { keyCode } = e;
    const { message, messages } = this.state;


    if (message.replace(/\s/ig, '') && (keyCode === 10 || keyCode === 13)) {
      e.preventDefault();
      const newMessages = messages.slice();
      const date = new Date();
      newMessages.push({
        user: null,
        avatar: '/media/content/client.png',

        date: {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
          time: `${date.getHours()}:${date.getMinutes()}`,
        },
        text: message,
        docs: [],
      });

      this.setState({
        message: '',
        messages: newMessages,
      });
    }
  };

  audioCall = () => {};

  videoCall = () => {

  };

  addFile = (e) => {
    const { messages } = this.state;
    const files = e.target.files || [];
    const redFiles = [];
    const newMessages = messages.slice();
    const date = new Date();

    Array.prototype.slice.call(files).forEach((f) => {
      const fr = new FileReader();
      fr.readAsDataURL(f);

      fr.onload = () => {
        redFiles.push(fr.result);

        if (redFiles.length === files.length) {
          newMessages.push({
            user: null,
            avatar: '/media/content/client.png',

            date: {
              year: date.getFullYear(),
              month: date.getMonth(),
              day: date.getDate(),
              time: `${date.getHours()}:${date.getMinutes()}`,
            },
            text: '',
            docs: redFiles,
          });

          this.setState({
            messages: newMessages,
          });
        }
      };
    });
  };

  audioMessageStart = () => {
    this.setState({
      audio: true,
    });
  };

  audioMessageFinish = () => {
    this.setState({
      audio: false,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevLength = prevState.messages.length;
    const { length } = this.state.messages;
    const { messages } = this;

    if (length !== prevLength && messages) {
      messages.scrollTo(0, messages.clientHeight + messages.scrollHeight);
    }
  }

  render() {
    const { message, messages, audio } = this.state;
    const { className } = this.props;
    const {
      onChange,
      onKeyDown,
      audioCall,
      videoCall,
      addFile,
      audioMessageStart,
      audioMessageFinish,
    } = this;

    return (
      <div className={`chat ${className}`}>
        <div className="chat__header">
          <div className="chat__companion">
            <div className="chat__avatar">
              <img className="chat__avatar-img" src="/media/content/support.png" alt="" />
            </div>
            <div className="chat__companion_title">Ваш персональный ассистент &mdash; Наталья</div>
          </div>
          <div className="chat__header-control">
            <ButtonIcon onClick={audioCall} icon="phone.svg" />
            <ButtonIcon onClick={videoCall} icon="camera.svg" />
          </div>
        </div>
        <div className="chat__content">
          <div className="chat__messages" ref={(e) => { this.messages = e; }}>
            <div className="chat__date">
              <div className="chat__date-inner">6 мая 2018 г.</div>
            </div>
            {
              messages.map(m => (
                <div key={`${m.date.year}${m.date.month}${m.date.day}${m.date.time}`} className="chat__message">
                  <div className="chat__avatar">
                    <img className="chat__avatar-img" src={m.avatar} alt="" />
                  </div>
                  <div className="chat__message-content">
                    <div className="chat__message-meta">
                      {
                        m.user && <span>{m.user} </span>
                      }
                      <span>{m.date.time}</span>
                    </div>
                    {
                      m.text &&
                      <div>{m.text}</div>
                    }
                    {
                      !!m.docs.length &&
                      <div className="chat__message-images">
                        {
                          m.docs.map((d) => (
                            <div
                              className="chat__message-image"
                              style={{ backgroundImage: `url(${d})` }}
                            />
                          ))
                        }
                      </div>
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="chat__footer">
          <div className="chat__file">
            <input type="file" onChange={addFile} multiple />
            <ButtonIcon onClick={addFile} icon="plus.svg" className="button-icon_chat-footer" />
          </div>
          <Input
            name="message"
            className="input_chat"
            value={message}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder="Напишите сообщение..."
            multiLine
            simplePlaceholder
          />
          <button
            onMouseDown={audioMessageStart}
            onMouseUp={audioMessageFinish}
            onMouseLeave={audioMessageFinish}
            className={cs('button-icon button-icon_chat-footer button-icon_chat-audio', { 'button-icon_chat-audio-active': audio })}
          >
            <InlineSvg src={require('../../../../media/icons/microphone.svg')} raw />
          </button>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  className: PropTypes.string,
};

Chat.defaultProps = {
  className: '',
};

export default Chat;
